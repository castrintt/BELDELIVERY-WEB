import { useEffect, useState } from "react";
import NavBarTop from "../../../components/NavBarCliente/NavBarTop";
import NavBarLeft from "../../../components/NavBarCliente/NavBarLeft/NavBarLeftClient";
import css from "./styled.module.css";
import FormPerfilNotEdit from "./components/FormPerfilNotEdit/FormPerfilNotEdit";
import FormPerfilEdit from "./components/FormPerfilEdit/FormPerfilEdit";
import FormAddressNotEdit from "./components/FormAddressNotEdit/FormAddressNotEdit";
import FormAddressEdit from "./components/FormAddressEdit/FormAddressEdit";
import Loading from "../../../components/Loading";
import { db } from "../../../services/api/firebaseConfig";
import firebase from "firebase/app";
import "firebase/storage";
import { getCurrentUser } from "../../../utilites/helpers/helpers";
import AnonimoImg from "../../../utilites/img/anonimo.png";

const PerfilCliente = () => {
    const [loading, setLoading] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [editFormAdress, setEditFormAdress] = useState(false);
    const [perfilImg, setPerfilImg] = useState();
    const [userData, setUserData] = useState({});
    const [addressData, setAddressData] = useState({
        id: null,
        rua: "",
        bairro: "",
        cidade: "",
        estado: "",
        numero: "",
        referencia: "",
        idUser: "",
    });

    const currentUser = getCurrentUser();
    
    const getUserData = () => {
        setLoading(true);
        
        db.collection("client")
        .doc(currentUser.id)
        .get()
        .then((res) => {
            let dataWay = res._delegate._document.data.value.mapValue.fields;
            setUserData({
                id: res.id,
                name: dataWay.name.stringValue,
                cpf: dataWay.cpf.stringValue,
                email: dataWay.email.stringValue,
                createdDate: dataWay.createdDate.stringValue,
                orders: dataWay.orders.integerValue,
                cellPhone: dataWay.cellPhone?.stringValue
            });
            getImagePerfil();
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
            setLoading(false);
        });
    };

    const getAddressData = () => {
        
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
            }
        })
        .catch(error => {
            console.log(error);
        });
    };

    const getImagePerfil = () => {
        const storageRef = firebase.storage().ref();
        setPerfilImg(AnonimoImg);

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
        getAddressData();
        getUserData();
    }, []);

    return(
        <>
            {loading && <Loading />}
            <NavBarTop />
            <NavBarLeft />
            <main className={css.container}>
                {editForm ?
                    <FormPerfilEdit
                        userData={userData}
                        setUserData={setUserData}
                        perfilImg={perfilImg}
                        setPerfilImg={setPerfilImg}
                        editForm={editForm}
                        setEditForm={setEditForm}
                        getImagePerfil={getImagePerfil}
                    /> :
                    <FormPerfilNotEdit
                        userData={userData}
                        perfilImg={perfilImg}
                        setEditForm={setEditForm}
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
}

export default PerfilCliente;