import css from "./styles.module.css";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Loading from "../../../components/Loading";
import { ToastContainer, toast } from 'react-toastify';
import { db, auth } from "../../../services/api/firebaseConfig";
import { useNavigate } from "react-router-dom";
import {
    emailValidate,
    nameValidate,
    passwordRegisterValidate,
    passwordRegisterConfirmate,
    documentValidate
} from "../../../utilites/helpers/helpers";
import Logo from "../../../utilites/img/delivery-logo.png";

const StoreForm = () => {
    const [loading, setLoading] = useState(false);
    const [customError, setCustomError] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        document: "",
        category: "",
        url_name: "",
    });

    const imgUrl = "https://firebasestorage.googleapis.com/v0/b/beldelivery-f4426.appspot.com/o/user%2Fanonimo.png?alt=media&token=3cd2a9df-8b5a-4a4c-aaa9-aa7a92e90376";
    const navigate = useNavigate();

    const DataVerify = (e) => {
        e.preventDefault();

        let name = nameValidate(formData.name);
        let email = emailValidate(formData.email);
        let password = passwordRegisterValidate(formData.password);
        let confirm_password = passwordRegisterConfirmate(formData.password, formData.confirm_password);
        let document = documentValidate(formData.document);
        let category = categoryValidate(formData.category);

        setCustomError({
            name: name.status,
            email: email.status,
            password: password.status,
            confirm_password: confirm_password.status,
            document: document.status,
            category: category.status
        });

        let error_number = 0;

        if (name.status){
            toast.error(name.messenge);
            error_number++;
        };
        if (email.status){
            toast.error(email.messenge);
            error_number++;
        };
        if (password.status){
            toast.error(password.messenge);
            error_number++;
        };
        if (confirm_password.status){
            toast.error(confirm_password.messenge);
            error_number++;
        };
        if (document.status){
            toast.error(document.messenge);
            error_number++;
        };
        if (document.status){
            toast.error(document.messenge);
            error_number++;
        };
        if (category.status){
            toast.error(category.messenge);
            error_number++;
        };

        urlStoreName(formData.name);
        if(error_number === 0) {
            newAuthUser();
            postNewStore();
        };
    };

    const postNewStore = async () => {
        setLoading(true);

        await db.collection("store").add({
            name: formData.name,
            email: formData.email,
            document: formData.document,
            cellPhone: "",
            urlName: formData.url_name,
            category: formData.category,
            createdDate: new Date(),
            type: 2,
            orders: 0,
            img: imgUrl
        })
        .then(() => {
            setLoading(false);
            toast.success("Loja cadastrada com sucesso!");
            toast.success("Você será redirecionado para o Login");
            setTimeout(() => {
                navigate("/login")
            }, 4000)
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
    };

    const urlStoreName = (name) => {
        let url = name.replace(/ /g, "-");
        setFormData({...formData, url_name: url.toLowerCase()});
    };

    const categoryValidate = (category) => {
        let response = {
            status: null,
            messenge: "Escolha uma categoria"
        };
        
        if(category.length > 0) response.status = false
        else response.status = true;

        return response;
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
                                placeholder="Nome da loja"
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                value={formData.name}
                            />
                            <input
                                type="text"
                                id={customError.email && css.error_input}
                                placeholder="E-mail"
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                value={formData.email}
                            />
                            <input
                                type="password"
                                id={customError.password && css.error_input}
                                placeholder="Senha"
                                onChange={e => setFormData({...formData, password: e.target.value})}
                                value={formData.password}
                            />
                            <input
                                type="password"
                                id={customError.confirm_password && css.error_input}
                                placeholder="Confirme a senha"
                                onChange={e => setFormData({...formData, confirm_password: e.target.value})}
                                value={formData.confirm_password}
                            />
                            <input
                                type="text"
                                id={customError.document && css.error_input}
                                placeholder="CPF/CNPJ"
                                onChange={e => setFormData({...formData, document: e.target.value})}
                                value={formData.document}
                            />
                            <select
                                value={formData.category}
                                onChange={e => setFormData({...formData, category: e.target.value})}
                                id={!!customError.category && css.error_input}
                            >
                                <option value="" disabled selected>Selecione uma categoria</option>
                                <option value="Lanchonete">Lanchonete</option>
                                <option value="Hamburgueria">Hamburgueria</option>
                                <option value="Bar">Bar</option>
                                <option value="Sorveteria">Sorveteria</option>
                            </select>
                            <button type="submit">Enviar</button>
                        </form>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default StoreForm;