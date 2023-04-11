import css from "./ChangePassword.module.css";
import NavBarTop from "../../../components/NavBarCliente/NavBarTop";
import NavBarLeft from "../../../components/NavBarCliente/NavBarLeft/NavBarLeftClient";
import { db } from "../../../config/api/firebaseConfig";
import {passwordRegisterValidate, getCurrentUser } from "../../../utilites/helpers/helpers";
import { useState } from "react";
import Loading from "../../../components/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [dataForm, setDataForm] = useState({
        oldPassword: "",
        newPassword: ""
    });
    const [customError, setCustomError] = useState({
        oldPassword: "",
        newPassword: null
    });

    const currentUser = getCurrentUser();

    const updateUserPassword = () => {
        setLoading(true);

        db.collection("client")
        .doc(currentUser.id)
        .update({
            password: dataForm.newPassword,
        })
        .then(() => {
            setLoading(false);
            toast.success("Senha alterada com sucesso!");
        })
        .catch((error) => {
            setLoading(false);
            console.log(error)
        });
    };

    const checkOldPassword = () => {
        setLoading(true);

        db.collection("client")
        .where("password", "==", dataForm.oldPassword)
        .where("name", "==", currentUser.name)
        .get()
        .then((res) => {
            if(res.size > 0) {
                updateUserPassword();
            } else {
                setCustomError({
                    oldPassword: "Senha incorreta",
                    newPassword: null
                })
                cleanDataForm();
            };
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
            console.log(error)
        });
    };

    const checkDataForm = () => {
        const password = passwordRegisterValidate(dataForm.newPassword);

        setCustomError({
            oldPassword: "",
            newPassword: password
        });

        if (!password.status)
        {
            checkOldPassword();
        }
    };

    const cleanDataForm = () => {
        setDataForm({
            oldPassword: "",
            newPassword: ""
        });
    };

    return(
        <>
            <NavBarTop />
            <NavBarLeft />
            {loading && <Loading />}
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                draggable
            />
            <main className={css.container}>
                <div className={css.tittle}>
                    <h2>Alterar senha</h2>
                    <button onClick={() => checkDataForm()}>
                        EDITAR
                    </button>
                </div>
                <article className={css.container_form}>
                    <div>
                        <div className={css.input_group}>
                            <label htmlFor="old_password">Senha atual:</label>
                            <input
                                type="text"
                                id="old_password"
                                value={dataForm.oldPassword}
                                onChange={(e) => setDataForm({...dataForm, oldPassword: e.target.value})}
                            />
                            {customError.oldPassword?.length > 0 &&
                                <p>{customError.oldPassword}</p>
                            }
                        </div>
                        <div className={css.input_group}>
                            <label htmlFor="new_password">Nova senha:</label>
                            <input
                                type="text"
                                id="new_password"
                                value={dataForm.newPassword}
                                onChange={(e) => setDataForm({...dataForm, newPassword: e.target.value})}
                            />
                            {customError.newPassword?.status &&
                                <p>{customError.newPassword.messenge}</p>
                            }
                        </div>
                    </div>
                </article>
            </main>
        </>
    );
};

export default ChangePassword;