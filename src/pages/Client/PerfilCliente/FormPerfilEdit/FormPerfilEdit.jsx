import { useState } from "react";
import css from "./FormPerfilEdit.module.css";
import moment from "moment/moment";
import Loading from "../../../../components/Loading";
import {db} from "../../../../services/api/firebaseConfig";
import firebase from "firebase/app";
import "firebase/storage";
import {
    nameValidate,
    emailValidate,
    documentValidate,
    cellValidate
} from "../../../../utilites/helpers/helpers";
import { getCurrentUser } from "../../../../utilites/helpers/helpers";

const FormPerfilEdit = ({
    userData,
    setUserData,
    setEditForm,
    perfilImg,
    setPerfilimg,
}) => {
    const [loading, setLoading] = useState(null);
    const [imgInput, setImgInput] = useState(null);
    const [customError, setCustomError] = useState({
        email: "",
        name: "",
        cpf: "",
        cell: ""
    });
    const [userDataUpadate, setUserDataUpadate] = useState(userData);

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
            cellPhone: userDataUpadate.cellPhone,
        })
        .then(() => {
            setLoading(false);
            setUserData(userDataUpadate);
            setEditForm(false);
            handleImg();
        })
        .catch((error) => {
            setLoading(false);
            console.log(error)
        });
    };

    const checkDataForm = () => {
        let email = emailValidate(userDataUpadate.email);
        let name = nameValidate(userDataUpadate.name);
        let cpf = documentValidate(userDataUpadate.cpf);
        let cell = cellValidate(userDataUpadate.cellPhone);

        setCustomError({
            email: email,
            name: name,
            cpf: cpf,
            cell: cell
        });

        if (!email.status && !name.status &&
            !cpf.status && !cell.status)
        {
            updateDataUser();
        }
    };

    const handleImg = () => {
        if(!imgInput) return;

        const uploadTask =  storageRef.child("user/" + currentUser.id).put(imgInput, imgInput.type);

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
                setPerfilimg(imgInput);
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
                    <img src={perfilImg} />
                    <input
                        type="file"
                        name="" 
                        id=""
                        onChange={(e) => setImgInput(e.target.files[0])}
                    />
                </div>
                <div>
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
                        {customError.cpf.status && 
                            <p className={css.error}>{customError.cpf.messenge}</p>
                        }
                    </div>
                    <div className={css.input_group}>
                        <p>Celular:</p>
                        <input
                            type="text"
                            value={userDataUpadate.cellPhone}
                            onChange={(e) => setUserDataUpadate({...userDataUpadate, cellPhone: e.target.value})}
                        />
                        {customError.cell.status &&
                            <p className={css.error}>{customError.cell.messenge}</p>
                        }
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