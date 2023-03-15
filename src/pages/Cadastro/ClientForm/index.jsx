import css from "./styles.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Loading from "../../../components/Loading";
import { db, auth } from "../../../services/api/firebaseConfig";
import {
    passwordRegisterValidate,
    passwordRegisterConfirmate,
    emailValidate,
    nameValidate
} from "../../../utilites/helpers/helpers";
import { ToastContainer, toast } from 'react-toastify';
import Logo from "../../../utilites/img/delivery-logo.png";

const ClientForm = () => {
    const [ loading, setLoading ] = useState(false);
    const [customError, setCustomError] = useState({
        name: false,
        email: false,
        password: false,
        confirmatedPassword: false
    });
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmatedPassword: ""
    });

    const imgUrl = "https://firebasestorage.googleapis.com/v0/b/beldelivery-f4426.appspot.com/o/user%2Fanonimo.png?alt=media&token=3cd2a9df-8b5a-4a4c-aaa9-aa7a92e90376";
    const navigate = useNavigate();
    
    const DataVerify = (e) => {
        e.preventDefault();

        let nameValidated = nameValidate(formData.name);
        let emailValidated = emailValidate(formData.email);
        let passwordValidated = passwordRegisterValidate(formData.password);
        let passwordConfirmateValidated = passwordRegisterConfirmate(formData.password, formData.confirmatedPassword);

        setCustomError({
            name: nameValidated.status,
            email: emailValidated.status,
            password: passwordValidated.status,
            confirmatedPassword: passwordConfirmateValidated.status
        });

        if (emailValidated.status === false
            && passwordValidated.status === false
            && passwordConfirmateValidated.status === false
            && nameValidated.status === false
        ){
            newAuthUser()
            postNewClient();
        } else {
            if(nameValidated.status === true){
                toast.error(nameValidated.messenge);
            };
            if(emailValidated.status === true){
                toast.error(emailValidated.messenge);
            };
            if(passwordValidated.status === true){
                toast.error(passwordValidated.messenge);
            };
            if(passwordConfirmateValidated.status === true){
                toast.error(passwordConfirmateValidated.messenge);
            };
        };
    };

    const postNewClient = async () => {
        setLoading(true);

        await db.collection("client").add({
            name: formData.name,
            email: formData.email,
            cpf: "",
            cellPhone: "",
            createdDate: new Date(),
            type: 3,
            orders: 0,
            img: imgUrl
        })
        .then((res) => {
            console.log(res)
            setLoading(false);
            toast.success("Cadastrado com sucesso!");
            toast.success("Você será redirecionado para o Login");
            setTimeout(() => {
                navigate("/login")
            }, 5000)
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
    };

    const newAuthUser = async () => {
        await auth.createUserWithEmailAndPassword(formData.email, formData.password)
        .then(res => {
            
        })
        .catch(error => {
            
        })
    };

    return(
        <React.Fragment>
            {loading && <Loading />}
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                draggable
                theme="dark"
            />
            <section className={css.bg_login}>
                <div>
                    <img src={Logo} alt="logo-delivery" />
                </div>
                <div>
                    <div className={css.container_form}>
                        <form
                            action="POST"
                            className={css.card_form}
                            onSubmit={e => DataVerify(e)}
                        >
                            <h2>Faça seu cadastro</h2>
                            <input
                                type="text"
                                id={customError.name && css.error_input}
                                placeholder="Nome"
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                value={formData.name}
                            />
                            <input
                                type="text"
                                id={customError.email && css.error_input}
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                placeholder="Email"
                            />
                            <input
                                type="text"
                                id={customError.password && css.error_input}
                                placeholder="Senha"
                                onChange={e => setFormData({...formData, password: e.target.value})}
                                value={formData.password}
                            />
                            <input
                                type="text"
                                id={customError.confirmatedPassword && css.error_input}
                                placeholder="Confirme a senha"
                                onChange={e => setFormData({...formData, confirmatedPassword: e.target.value})}
                                value={formData.confirmatedPassword}
                            />
                            <button type="submit">Cadastrar</button>
                        </form>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default ClientForm;