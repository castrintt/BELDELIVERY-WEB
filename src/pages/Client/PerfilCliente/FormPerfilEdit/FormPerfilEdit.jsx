import { useState } from "react";
import css from "./FormPerfilEdit.module.css";
import moment from "moment/moment";
import Loading from "../../../../components/Loading";
import {db} from "../../../../services/api/firebaseConfig";
import {
    nameValidate,
    emailValidate,
    documentValidate,
    cellValidate
} from "../../../../utilites/helpers/helpers";
import {ToastContainer, toast} from 'react-toastify';

const FormPerfilEdit = ({userData, setUserData, setEditForm}) => {
    const [loading, setLoading] = useState(false);
    const [customError, setCustomError] = useState({
        email: "",
        name: "",
        cpf: "",
        cell: ""
    });
    const [userDataUpadate, setUserDataUpadate] = useState(userData);

    const idUser = localStorage.getItem("id");

    const updateDataUser = () => {
        setLoading(true);
        db.collection("client")
        .doc(idUser)
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
            toast.error("Cadastrado com sucesso, vocês será redirecionado para o Login");
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

    return(
        <>
            {loading && <Loading />}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                draggable
                theme="dark"
            />
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
                    <img src="" />
                    <input
                        type="file"
                        name="" 
                        id=""
                    />
                </div>
                <div>
                    <div className={css.input_group}>
                        <p>Nome completo:</p>
                        <input
                            type="text"
                            value={userDataUpadate.name}
                            onChange={(e) => setUserDataUpadate({...userData, name: e.target.value})}
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