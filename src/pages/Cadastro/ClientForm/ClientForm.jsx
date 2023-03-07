import css from "./ClientForm.module.css";
import { useState, useEffect } from "react";
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
    
    const DataVerify = () => {
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
        <section className={css.container_cadastro}>
            <div className={css.card_login}>
                <h1>Faça seu cadastro</h1>
                <div className={css.container_form}>
                    <div className={css.input_group}>
                        <input
                            id={customError.name == true && css.error_input}
                            type="text"
                            placeholder="Nome"
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            value={formData.name}
                        />
                    </div>
                    <div className={css.input_group}>
                        <input 
                            type="email"
                            id={customError.email == true && css.error_input}
                            placeholder="E-mail"
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            value={formData.email}
                        />
                    </div>
                    <div className={css.input_group}>
                        <input
                            type="password"
                            id={customError.password == true && css.error_input}
                            placeholder="Crie uma senha"
                            onChange={e => setFormData({...formData, password: e.target.value})}
                            value={formData.password}
                        />
                    </div>
                    <div className={css.input_group}>
                        <input 
                            type="password"
                            id={customError.confirmatedPassword == true && css.error_input}
                            placeholder="Confirme a senha"
                            onChange={e => setFormData({...formData, confirmatedPassword: e.target.value})}
                            value={formData.confirmatedPassword}
                        />
                    </div>
                </div>
                <Button
                    variant="primary"
                    className={css.button}
                    onClick={() => DataVerify()}
                >
                    Cadastrar
                </Button>
            </div>
        </section>
        </>
    )
}

export default ClientForm;