import css from "./styled.module.css";
import NavBarLeft from "../../../components/NavBarCliente/NavBarLeft/NavBarLeftClient";
import NavBarTop from "../../../components/NavBarCliente/NavBarTop/index";
import Loading from "../../../components/Loading";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../../services/api/firebaseConfig";
import { getCurrentUser } from "../../../utilites/helpers/helpers";
import { useNavigate } from "react-router-dom";
import AnonimoImg from "../../../utilites/img/anonimo.png";

const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [storeList, setStoreList] = useState([]);

    // const currentUser = getCurrentUser();
    const navigate = useNavigate();

    const getStores = () => {
        setLoading(true);

        db.collection("/store")
        .get()
        .then((res) => {
            if(res.size > 0){
                setStoreList([]);
                res.docs.map(doc => {
                    let way = doc._delegate._document.data.value.mapValue.fields;
                    console.log(way)
                    let store = {
                        id: doc.id,
                        name: way.name.stringValue,
                        category: way.category.stringValue,
                        url: way.urlName.stringValue,
                        img: way.img?.stringValue,
                    };

                    setStoreList(prevStore => [...prevStore, store]);
                });
            };
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
        })
    };

    useEffect(() => {
        getStores();
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
                                <img src={store.img !== undefined ? store.img : AnonimoImg} alt="" /> 
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