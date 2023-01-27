import { useState } from "react";
import css from "./FormAddressEdit.module.css";
import moment from "moment/moment";
import Loading from "../../../../components/Loading";
import {db} from "../../../../services/api/firebaseConfig";
import firebase from "firebase/app";
import "firebase/storage";
import {
    nameValidate,
    emailValidate,
    getCurrentUser
} from "../../../../utilites/helpers/helpers";
import { useEffect } from "react";

const FormAddressEdit = ({
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
    const currentUser = getCurrentUser();

    const updateAddress = () => {
        setLoading(true);
        db.collection("Address")
        .doc(userData.id)
        .update({
            id: userDataUpadate.id,
            rua: userDataUpadate.rua,
            bairro: userDataUpadate.bairro,
            cidade: userDataUpadate.cidade,
            estado: userDataUpadate.estado,
            numero: userDataUpadate.numero,
            referencia: userDataUpadate.referencia
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

    const createAddress = () => {
        setLoading(true);
        db.collection("Address")
        .add({
            rua: userDataUpadate.rua,
            bairro: userDataUpadate.bairro,
            cidade: userDataUpadate.cidade,
            estado: userDataUpadate.estado,
            numero: userDataUpadate.numero,
            referencia: userDataUpadate.referencia,
            idUser: currentUser.id
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
            updateAddress();
        }
    };

    const selectMethodRequest = () => {
        if(userData.id) updateAddress();
        else createAddress();
    };

    return(
        <>
            {loading && <Loading />}
            <div className={css.tittle}>
                <h2>Endereço</h2>
                <div className={css.buttons_container}>
                    <button onClick={() => setEditForm(false)}>
                        CANCELAR
                    </button>
                    <button onClick={() => selectMethodRequest()}>
                        SALVAR
                    </button>
                </div>
            </div>
            <article className={css.container_form}>
                <div>
                </div>
                <div>
                    <div className={css.input_group}>
                        <p>Rua:</p>
                        <input
                            type="text"
                            value={userDataUpadate.rua}
                            onChange={(e) => setUserDataUpadate({...userDataUpadate, rua: e.target.value})}
                        />
                        {customError.name.status && 
                            <p className={css.error}>{customError.name.messenge}</p>
                        }
                    </div>
                    <div className={css.input_group}>
                        <p>Bairro:</p>
                        <input
                            type="text"
                            value={userDataUpadate.bairro}
                            onChange={(e) => setUserDataUpadate({...userDataUpadate, bairro: e.target.value})}
                        />
                        {customError.email.status && 
                            <p className={css.error}>{customError.email.messenge}</p>
                        }
                    </div>
                    <div className={css.input_group}>
                        <p>Cidade:</p>
                        <input
                            type="text"
                            value={userDataUpadate.cidade}
                            onChange={(e) => setUserDataUpadate({...userDataUpadate, cidade: e.target.value})}
                        />
                    </div>
                    <div className={css.input_group}>
                        <p>Estado:</p>
                        <input
                            type="text"
                            value={userDataUpadate.estado}
                            onChange={(e) => setUserDataUpadate({...userDataUpadate, estado: e.target.value})}
                        />
                    </div>
                    <div className={css.input_group}>
                        <p>Número:</p>
                        <input
                            type="text"
                            value={userDataUpadate.numero}
                            onChange={(e) => setUserDataUpadate({...userDataUpadate, numero: e.target.value})}
                        />
                    </div>
                    <div className={css.input_group}>
                        <p>Referência:</p>
                        <input
                            type="text"
                            value={userDataUpadate.referencia}
                            onChange={(e) => setUserDataUpadate({...userDataUpadate, referencia: e.target.value})}
                        />
                    </div>
                </div>
            </article>
        </>
    );
}

export default FormAddressEdit;