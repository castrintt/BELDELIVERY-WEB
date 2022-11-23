import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import css from "./styled.module.css";
import { useState } from "react";
import Loading from "../../components/Loading";
import { db } from "../../services/api/firebaseConfig.js";
import { emailValidate, passwordLoginValidate } from "../../services/validations/validation";
import { useEffect } from "react";

const Login = () => {
    const [loginType, setLoginType] = useState("Client");
    const [loading, setLoading] = useState(false);
    const [errorStatus, setErrorStatus] = useState(true);
    const [errorMessenge, setErrorMessenge] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const DataVerify = () => {
        const emailValidateResponse = emailValidate(formData.email);
        const passwordValidateResponse = passwordLoginValidate(formData.password);

        if (emailValidateResponse){
            if (passwordValidateResponse){
                setErrorStatus(false);
            } else {
                setErrorStatus(true);
                setErrorMessenge(passwordValidateResponse)
            };
        } else {
            setErrorStatus(true);
            setErrorMessenge(emailValidateResponse);
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
                console.log(caminhoValue)
                localStorage.setItem("clientId", res.docs[0].id);
                localStorage.setItem("clientName", caminhoValue.name.stringValue);
                localStorage.setItem("userType", caminhoValue.type.integerValue);
                navigate("/home");
            }
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        })
    };
    
    useEffect(() => {
        if(loginType === "Client" & !errorStatus){
            loginClient();
        } else {
            console.log("nao");
        }
    }, [errorStatus])

    return(
        <>
            {loading && <Loading />}
            <section className={css.container_login}>
                <div className={css.card_login}>
                    <h1>{loginType === "Client" ? "Faça Login e mate sua fome!" : "Faça login e venda conosco!"}</h1>
                    <div>
                        <input
                            type="text"
                            id="email"
                            placeholder="E-mail"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                        />

                        <input
                            type="text"
                            id="password"
                            placeholder="Senha"
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                        />
                        <span className={css.link} onClick={() => navigate("/esqueci-minha-senha")}>
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
    )
}

export default Login;