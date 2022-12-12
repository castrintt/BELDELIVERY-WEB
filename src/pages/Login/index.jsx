import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import css from "./styled.module.css";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { db } from "../../services/api/firebaseConfig.js";
import { emailValidate, passwordLoginValidate } from "../../utilites/helpers/helpers";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const [loginType, setLoginType] = useState("Client");
    const [loading, setLoading] = useState(false);
    const [customError, setCustomError] = useState({
        email: false,
        password: false,
    });
    const [errorStatus, setErrorStatus] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

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
        } else {
            if(emailValidated.status === true){
                toast.error(emailValidated.messenge);
            }
            if(passwordValidated.status === true){
                toast.error(passwordValidated.messenge);
            }
        };
    };

    const loginClient = () => {
        setLoading(true);
        db.collection("client")
        .where("email", "==" , formData.email)
        .where("password", "==", formData.password)
        .get()
        .then((res) => {
            if(res.size > 0){
                const caminhoValue = res.docs[0]._delegate._document.data.value.mapValue.fields;
                
                localStorage.setItem("id", res.docs[0].id);
                localStorage.setItem("name", caminhoValue.name.stringValue);
                localStorage.setItem("userType", "client");
                toast.success("Logado com sucesso");
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

    const loginStore = () => {
        setLoading(true);
        db.collection("store")
        .where("email", "==" , formData.email)
        .where("password", "==", formData.password)
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

    useEffect(() => {
        if(loginType === "Client" & !errorStatus){
            loginClient();
        } else if (loginType === "Store" & !errorStatus){
            loginStore();
        }
    }, [errorStatus]);

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
            <section className={css.container_login}>
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
        </>
    );
};

export default Login;