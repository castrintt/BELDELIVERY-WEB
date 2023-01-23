import css from "./styled.module.css";
import NavBarLeft from "../../../components/NavBarCliente/NavBarLeft/NavBarLeftClient";
import NavBarTop from "../../../components/NavBarCliente/NavBarTop/index";
import Loading from "../../../components/Loading";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../../services/api/firebaseConfig";
import { getCurrentUser } from "../../../utilites/helpers/helpers";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/storage";

const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [storeList, setStoreList] = useState([]);
    const [imgList, setImgList] = useState([]);

    // const currentUser = getCurrentUser();
    const navigate = useNavigate();

    const getStores = () => {
        setLoading(true);
        const storeListArray = [];

        db.collection("store")
        .get()
        .then((res) => {
            if(res.size > 0){
                res.docs.map(doc => {
                    let currentImg;
                    let way = doc._delegate._document.data.value.mapValue.fields;

                    storeListArray.push({
                        id: doc.id,
                        name: way.name.stringValue,
                        category: way.category.stringValue,
                        url: way.urlName.stringValue,
                        img: imgList.find(img => img.name ===  doc.id)
                    });

                    console.log({
                        id: doc.id,
                        name: way.name.stringValue,
                        category: way.category.stringValue,
                        url: way.urlName.stringValue,
                        img: imgList.find(img => img.name ===  doc.id)?.content
                    })
                });
            };
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
            setLoading(false);
        })
        .finally(() => {
            setStoreList(storeListArray);
        })
    };

    const getImagePerfil = () => {
        const storageRef = firebase.storage().ref();
        const imgs = [];

        storageRef.child("user/").listAll()
        .then((res) => {
            res.items.map(item => {
                item.getDownloadURL()
                .then((img) => {
                    imgs.push({
                        name: item.name,
                        content: img
                    });
                })
            })
        })
        .finally(() => {
            setImgList(imgs);
            getStores();
        });
    };

    useEffect(() => {
        getImagePerfil();
    }, []);

    return(
        <>
            {loading && <Loading />}
            <NavBarTop />
            <NavBarLeft />
            <section className={css.banner}></section>
            <main className={css.container}>
                {/* <CategoriasCards /> */}
                {storeList.length > 0 &&
                    storeList.map(store => (
                        <div key={store.id} onClick={() => navigate(`/lojas/${store.url}`)}>
                            <div>
                                
                                <img src={store.img && store.img.content} alt="" />
                            </div>
                            <div>
                                <span>{store.name}</span>
                                <p>{store.category}</p>
                            </div>
                        </div>
                    ))
                }
            </main>
        </>
    )
}

export default HomePage;