import css from "./StoreForm.module.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Loading from "../../../components/Loading";
import { ToastContainer, toast } from 'react-toastify';
import { db } from "../../../services/api/firebaseConfig";
import { useNavigate } from "react-router-dom";
import {
    emailValidate,
    nameValidate,
    passwordRegisterValidate,
    passwordRegisterConfirmate,
    documentValidate
} from "../../../utilites/helpers/helpers";

const StoreForm = () => {
    const [ loading, setLoading ] = useState(false);
    const [ customError, setCustomError ] = useState({});
    const [ formData, setFormData ] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        document: "",
        category: "",
        url_name: "",
    });

    const navigate = useNavigate();

    const DataVerify = () => {
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
        if(error_number === 0) postNewStore();
    };

    const postNewStore = () => {
        setLoading(true);

        db.collection("store").add({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            document: formData.document,
            cellPhone: "",
            urlName: formData.url_name,
            category: formData.category,
            createdDate: new Date(),
            type: 2,
            orders: 0
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

    return(
        <>
            {loading && <Loading />}
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                draggable
                theme="dark"
            />
            <main className={css.container_cadastro}>
                <div className={css.card_login}>
                    <h1>Faça seu cadastro</h1>
                    <div className={css.container_form}>
                        <div>
                            <input
                                type="text"
                                id={customError.name && css.error_input}
                                placeholder="Nome da loja"
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                value={formData.name}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                id={customError.email && css.error_input}
                                placeholder="E-mail"
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                value={formData.email}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                id={customError.password && css.error_input}
                                placeholder="Senha"
                                onChange={e => setFormData({...formData, password: e.target.value})}
                                value={formData.password}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                id={customError.confirm_password && css.error_input}
                                placeholder="Confirme a senha"
                                onChange={e => setFormData({...formData, confirm_password: e.target.value})}
                                value={formData.confirm_password}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                id={customError.document && css.error_input}
                                placeholder="CPF/CNPJ"
                                onChange={e => setFormData({...formData, document: e.target.value})}
                                value={formData.document}
                            />
                        </div>
                        <Form.Select
                            size="sm"
                            value={formData.category}
                            onChange={e => setFormData({...formData, category: e.target.value})}
                            id={customError.category && css.error_input}
                        >
                            <option value="" disabled selected>Selecione uma categoria</option>
                            <option value="Lanchonete">Lanchonete</option>
                            <option value="Hamburgueria">Hamburgueria</option>
                            <option value="Bar">Bar</option>
                            <option value="Sorveteria">Sorveteria</option>
                        </Form.Select>
                        </div>
                    <Button
                        variant="primary"
                        className={css.button_container}
                        onClick={() => DataVerify()}
                    >
                        Cadastrar
                    </Button>
                </div>
            </main>
        </>
    );
};

export default StoreForm;