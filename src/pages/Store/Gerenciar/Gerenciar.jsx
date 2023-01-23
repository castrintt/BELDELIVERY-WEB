import { useState, useEffect } from "react";
import css from "./Gerenciar.module.css";
import NavBarTop from "../../../components/NavBarLoja/NavBarTop";
import NavBarLeft from "../../../components/NavBarLoja/NavBarLeft/NavBarLeft";
import Loading from "../../../components/Loading";
import FormNotEdit from "./FormNotEdit/FormNotEdit";
import FormEdit from "./FormEdit/FormEdit";
import { db } from "../../../services/api/firebaseConfig";
import firebase from "firebase/app";
import "firebase/storage";
import { getCurrentUser } from "../../../utilites/helpers/helpers";
import AnonimoImg from "../../../utilites/img/anonimo.png";

const Gerenciar = () => {
    const [loading, setLoading] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [perfilImg, setPerfilImg] = useState(AnonimoImg);
    const [userData, setUserData] = useState({});

    const currentUser = getCurrentUser();

    const getUserData = () => {
        setLoading(true);
        
        db.collection("store")
        .doc(currentUser.id)
        .get()
        .then((res) => {
            let dataWay = res._delegate._document.data.value.mapValue.fields;
            setUserData({
                id: res.id,
                name: dataWay.name.stringValue,
                cpf: dataWay.document.stringValue,
                email: dataWay.email.stringValue,
                createdDate: dataWay.createdDate.timestampValue,
                orders: dataWay.orders.integerValue,
                cellPhone: dataWay.cellPhone?.stringValue,
                category: dataWay.category?.stringValue,
            });
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
            setLoading(false);
        });
    };

    const getImagePerfil = () => {
        const storageRef = firebase.storage().ref();

        storageRef.child("user/").listAll()
        .then((res) => {
            res.items.map(item => {
                if(item.name === currentUser.id){
                    item.getDownloadURL()
                    .then((img) => {
                        setPerfilImg(img);
                    })
                }
            })
        })
    };

    useEffect(() => {
        getUserData();
        getImagePerfil();
    }, []);

    return(
        <>
        <NavBarTop />
        <NavBarLeft />
        {loading && <Loading />}
        <main className={css.container}>
            {editForm ?
                <FormEdit
                    userData={userData}
                    setUserData={setUserData}
                    perfilImg={perfilImg}
                    setPerfilImg={setPerfilImg}
                    editForm={editForm}
                    setEditForm={setEditForm}
                    getImagePerfil={getImagePerfil}
                /> :
                <FormNotEdit
                    userData={userData}
                    perfilImg={perfilImg}
                    setEditForm={setEditForm}
                />
            }
        </main>
    </>
    );
};

export default Gerenciar;