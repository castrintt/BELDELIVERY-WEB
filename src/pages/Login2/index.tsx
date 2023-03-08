import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import css from "./styled.module.css";
import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { db, auth } from "../../services/api/firebaseConfig.js";
import { emailValidate, passwordLoginValidate } from "../../utilites/helpers/helpers";
import { ToastContainer, toast } from 'react-toastify';

interface FormData {
    email: string;
    password: string;
};
interface FormError {
    email: boolean;
    password: boolean;
};

const Login2 = () => {
    const [loginType, setLoginType] = useState("Client");
    const [loading, setLoading] = useState(false);
    const [customError, setCustomError] = useState({
        email: false,
        password: false,
    });
    const [errorStatus, setErrorStatus] = useState(true);
    const [formData, setFormData] = useState<FormData>();

    const navigate = useNavigate();

    const DataVerify = () => {
        let emailValidated = emailValidate(formData.email);
        let passwordValidated = passwordLoginValidate(formData.password);

        setCustomError({
            email: emailValidated.status,
            password: passwordValidated.status
        });

        if(emailValidated.status === false && passwordValidated.status === false){
            setErrorStatus(false);
            newAuthUser();
        } else {
            if(emailValidated.status === true){
                toast.error(emailValidated.messenge);
            }
            if(passwordValidated.status === true){
                toast.error(passwordValidated.messenge);
            }
        };
    };

    const getDataClient = async () => {
        setLoading(true);
        await db.collection("client")
        .where("email", "==" , formData.email)
        .get()
        .then((res) => {
            if(res.size > 0){
                const caminhoValue = res.docs[0]._delegate._document.data.value.mapValue.fields;
                
                localStorage.setItem("id", res.docs[0].id);
                localStorage.setItem("name", caminhoValue.name.stringValue);
                localStorage.setItem("userType", "client");
                toast.warning("Logado com sucesso");
                navigate("/home");
            } else {
                setErrorStatus(true);
                toast.warning("Usuário não encontrado");
            };
            setLoading(false);
        })
        .catch((error) => {
            setErrorStatus(true);
            console.log(error);
            setLoading(false);
        })
    };

    const getDataStore = async () => {
        setLoading(true);
        await db.collection("store")
        .where("email", "==" , formData.email)
        .get()
        .then((res) => {
            if(res.size > 0){
                const caminhoValue = res.docs[0]._delegate._document.data.value.mapValue.fields;

                localStorage.setItem("id", res.docs[0].id);
                localStorage.setItem("name", caminhoValue.name.stringValue);
                localStorage.setItem("userType", "store");
                toast.success("Logado com sucesso");
                navigate("/gerenciar");
            } else {
                setErrorStatus(true);
                toast.warning("Loja não encontrado");
            };
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setErrorStatus(true);
            setLoading(false);
        })
    };
    
    const newAuthUser = async () => {
        await auth.signInWithEmailAndPassword(formData.email, formData.password)
        .then(res => {
            if(loginType === "Client"){
                getDataClient();
            } else if (loginType === "Store"){
                getDataStore();
            };
        })
        .catch(error => {
            toast.error("Usuário não encontrado");
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

                </div>
                <div className={css.card_login}>
                    <h1>
                        {loginType === "Client"
                        ? "Faça Login e mate sua fome!"
                        : "Faça login e venda conosco!"}
                    </h1>
                    <div>
                        <input
                            type="text"
                            id={customError.email && css.error_input}
                            placeholder="E-mail"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                        <input
                            type="text"
                            id={customError.password && css.error_input}
                            placeholder="Senha"
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                        />
                        <span className={css.link}>
                            Esqueceu sua senha?
                        </span>
                    </div>

                    <div>
                        <Button variant="primary" onClick={() => DataVerify()}>LOGIN</Button>
                        <div className={css.link} onClick={() => navigate("/cadastro")}>Ainda não tem conta? Cadastre-se</div>
                    </div>
                    
                    {loginType === "Client" ? (
                        <div onClick={() => setLoginType("Store")}>
                            <span>Logue como Loja</span>
                        </div>
                    ) : (
                        <div onClick={() => setLoginType("Client")}>
                            <span>Logue como Cliente</span>
                        </div>
                    )}
                </div>
           </section>
        </React.Fragment>
    );
};

export default Login2;