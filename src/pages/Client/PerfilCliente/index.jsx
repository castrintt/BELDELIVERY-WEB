import { useEffect, useState } from "react";
import NavBarTop from "../../../components/NavBarTop";
import css from "./styled.module.css";
import FormPerfilNotEdit from "./FormPerfilNotEdit/FormPerfilNotEdit";
import FormPerfilEdit from "./FormPerfilEdit/FormPerfilEdit";
import Loading from "../../../components/Loading";
import { db } from "../../../services/api/firebaseConfig";
import firebase from "firebase/app";
import "firebase/storage";
import { getCurrentUser } from "../../../utilites/helpers/helpers";

const PerfilCliente = () => {
    const [loading, setLoading] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [perfilImg, setPerfilImg] = useState();
    const [userData, setUserData] = useState({});

    const currentUser = getCurrentUser();
    
    const getUserData = () => {
        setLoading(true);
        
        db.collection("client")
        .doc(currentUser.id)
        .get()
        .then((res) => {
            let dataWay = res._delegate._document.data.value.mapValue.fields;
            console.log(dataWay)
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
    }, [perfilImg]);

    return(
        <>
            {loading && <Loading />}
            <NavBarTop />
            <main className={css.container}>
                {editForm ?
                    <FormPerfilEdit
                        userData={userData}
                        setUserData={setUserData}
                        perfilImg={perfilImg}
                        setPerfilImg={setPerfilImg}
                        editForm={editForm}
                        setEditForm={setEditForm}
                    /> :
                    <FormPerfilNotEdit
                        userData={userData}
                        perfilImg={perfilImg}
                        setEditForm={setEditForm}
                    />
                }
            </main>
        </>
    );
}

export default PerfilCliente;