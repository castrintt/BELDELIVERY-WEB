import { useState, useEffect } from "react";
import css from "./Gerenciar.module.css";
import NavBarTop from "../../../components/NavBarLoja/NavBarTop";
import NavBarLeft from "../../../components/NavBarLoja/NavBarLeft/NavBarLeft";
import Loading from "../../../components/Loading";
import FormNotEdit from "./FormNotEdit/FormNotEdit";
import FormEdit from "./FormEdit/FormEdit";
import FormAddressNotEdit from "./FormAddressNotEdit/FormAddressNotEdit";
import FormAddressEdit from "./FormAddressEdit/FormAddressEdit";
import { db } from "../../../config/api/firebaseConfig";
import firebase from "firebase/app";
import "firebase/storage";
import { getCurrentUser } from "../../../utilites/helpers/helpers";
import AnonimoImg from "../../../utilites/img/anonimo.png";

const Gerenciar = () => {
    const [loading, setLoading] = useState(false);
    const [editFormPerfil, setEditFormPerfil] = useState(false);
    const [editFormAdress, setEditFormAdress] = useState(false);
    const [perfilImg, setPerfilImg] = useState(AnonimoImg);
    const [userData, setUserData] = useState({});
    const [addressData, setAddressData] = useState(null);

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

    const getAddressData = () => {
        // setLoading(true);
        
        db.collection("Address")
        .where("idUser", "==" , currentUser.id)
        .get()
        .then((res) => {
            console.log(res)
            if(res.size > 0){
                let dataWay = res.docs[0]._delegate._document.data.value.mapValue.fields;
                setAddressData({
                    id: res.docs[0].id,
                    rua: dataWay.rua.stringValue,
                    bairro: dataWay.bairro.stringValue,
                    cidade: dataWay.cidade.stringValue,
                    estado: dataWay.estado.stringValue,
                    numero: dataWay.numero.stringValue,
                    referencia: dataWay.referencia.stringValue,
                    idUser: dataWay.idUser.stringValue,
                });
            } else {
                setAddressData(null)
            };
            // setLoading(false);
        })
        .catch(error => {
            console.log(error);
            // setLoading(false);
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
        getAddressData();
        getImagePerfil();
    }, []);

    return(
        <>
        <NavBarTop />
        <NavBarLeft />
        {loading && <Loading />}
        <main className={css.container}>
            {editFormPerfil ?
                <FormEdit
                    userData={userData}
                    setUserData={setUserData}
                    perfilImg={perfilImg}
                    setPerfilImg={setPerfilImg}
                    editForm={editFormPerfil}
                    setEditForm={setEditFormPerfil}
                    getImagePerfil={getImagePerfil}
                /> :
                <FormNotEdit
                    userData={userData}
                    perfilImg={perfilImg}
                    setEditForm={setEditFormPerfil}
                />
            }
            {editFormAdress ?
                <FormAddressEdit
                    userData={addressData}
                    setUserData={setAddressData}
                    editForm={editFormAdress}
                    setEditForm={setEditFormAdress}
                /> :
                <FormAddressNotEdit
                    userData={addressData}
                    setEditForm={setEditFormAdress}
                />
            }
        </main>
    </>
    );
};

export default Gerenciar;