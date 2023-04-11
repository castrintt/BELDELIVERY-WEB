import { useState } from "react";
import css from "./FormPerfilEdit.module.css";
import moment from "moment/moment";
import Loading from "../../../../../components/Loading";
import { db } from "../../../../../config/api/firebaseConfig";
import firebase from "firebase/app";
import "firebase/storage";
import {
    nameValidate,
    emailValidate,
    getCurrentUser
} from "../../../../../utilites/helpers/helpers";

const FormPerfilEdit = ({
    userData,
    setUserData,
    setEditForm
}) => {
    const [loading, setLoading] = useState(null);
    const [customError, setCustomError] = useState({
        email: "",
        name: "",
        cpf: "",
        cell: ""
    });
    const [userDataUpadate, setUserDataUpadate] = useState(userData);

    const uploadIcon = "https://img.icons8.com/fluency/48/null/send-letter.png";
    const currentUser = getCurrentUser();
    const storageRef = firebase.storage().ref();

    const updateDataUser = () => {
        setLoading(true);
        db.collection("client")
        .doc(currentUser.id)
        .update({
            name: userDataUpadate.name,
            email: userDataUpadate.email,
            cpf: userDataUpadate.cpf,
            cellPhone: userDataUpadate.cellPhone
        })
        .then(() => {
            setLoading(false);
            setUserData(userDataUpadate);
            setEditForm(false);
        })
        .catch((error) => {
            setLoading(false);
            console.log(error)
        });
    };

    const checkDataForm = () => {
        let email = emailValidate(userDataUpadate.email);
        let name = nameValidate(userDataUpadate.name);

        setCustomError({
            email: email,
            name: name
        });

        if (!email.status && !name.status)
        {
            updateDataUser();
        }
    };

    const handleImg = (e) => {
        const inputImg = e.target.files[0];

        if(!inputImg) return;

        const uploadTask =  storageRef.child("user/" + currentUser.id).put(inputImg, inputImg.type);

        uploadTask.on('state_changed',
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                updateDataUser();
            }
        );
    };

    return(
        <>
            {loading && <Loading />}
            <div className={css.tittle}>
                <h2>Meu Perfil</h2>
                <div className={css.buttons_container}>
                    <button onClick={() => setEditForm(false)}>
                        CANCELAR
                    </button>
                    <button onClick={() => checkDataForm()}>
                        SALVAR
                    </button>
                </div>
            </div>
            <article className={css.container_form}>
                <div>
                    <img src={userDataUpadate.img} />
                    <input
                        type="file"
                        name="file"
                        id="file"
                        onChange={(e) => handleImg(e)}
                    />
                </div>
                <label className={css.label_file} htmlFor="file">
                    <img src={uploadIcon} alt="" />
                </label>
                <div className={css.form_grid}>
                    <div className={css.input_group}>
                        <p>Nome completo:</p>
                        <input
                            type="text"
                            value={userDataUpadate.name}
                            onChange={(e) => setUserDataUpadate({...userDataUpadate, name: e.target.value})}
                        />
                        {customError.name.status && 
                            <p className={css.error}>{customError.name.messenge}</p>
                        }
                    </div>
                    <div className={css.input_group}>
                        <p>E-mail:</p>
                        <input
                            type="text"
                            value={userDataUpadate.email}
                            onChange={(e) => setUserDataUpadate({...userDataUpadate, email: e.target.value})}
                        />
                        {customError.email.status && 
                            <p className={css.error}>{customError.email.messenge}</p>
                        }
                    </div>
                    <div className={css.input_group}>
                        <p>CPF:</p>
                        <input
                            type="text"
                            value={userDataUpadate.cpf}
                            onChange={(e) => setUserDataUpadate({...userDataUpadate, cpf: e.target.value})}
                        />
                    </div>
                    <div className={css.input_group}>
                        <p>Celular:</p>
                        <input
                            type="text"
                            value={userDataUpadate.cellPhone}
                            onChange={(e) => setUserDataUpadate({...userDataUpadate, cellPhone: e.target.value})}
                        />
                    </div>
                    <div className={css.input_group}>
                        <p>Número de pedidos:</p>
                        <p>{userDataUpadate.orders}</p>
                    </div>
                    <div className={css.input_group}>
                        <p>Conta criada em:</p>
                        <p>{moment(userDataUpadate.createdDate).format("DD/MM/YYYY")}</p>
                    </div>
                </div>
            </article>
        </>
    );
}

export default FormPerfilEdit;