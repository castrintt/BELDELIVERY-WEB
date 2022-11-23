import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import css from "./styled.module.css";
import { useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import { db } from "../../services/api/firebaseConfig";

const Login = () => {
    const [ loginType, setLoginType] = useState("");
    const [ loading, setLoading] = useState(false);

    const [ formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const postFormClient = () => {
        setLoading(true);
        db.collection("client").add(formData)
        .then((res) => {
           console.log(res);
        })
    };

    const postFormStore = () => {
        setLoading(true);
        setTimeout(() => {
            axios.get(`https://localhost:7221/api/Store/login?email=${formData.email}&password=${formData.password}`)
            .then((res) => {
                localStorage.setItem('Name', res.data.name);
                localStorage.setItem('Id', res.data.id);
                localStorage.setItem('TypeAccountAcess', res.data.typeAccountAcess);
            })
            .catch(() => alert("acesso negado"))
            setLoading(false);
        }, 1000)
    };

    return(
        <>
            {loading && <Loading />}
            <section className={css.container_login}>
                <div className={css.card_login}>
                    <h1>{loginType === "Client" ? "Faça Login e mate sua fome!" : "Faça login e venda conosco!"}</h1>
                    <div>
                        <label htmlFor="email">E-mail:</label>
                        <input type="text" id="email" onChange={e => setFormData({...formData, email: e.target.value})}/>

                        <label htmlFor="password">Senha:</label>
                        <input type="text" id="password" onChange={e => setFormData({...formData, password: e.target.value})}/>
                        <span className={css.link} onClick={() => navigate("/esqueci-minha-senha")}>Esqueceu sua senha?</span>
                    </div>

                    <div>
                        <Button variant="primary" onClick={() => loginType === "Client" ? postFormClient() : postFormStore()}>LOGIN</Button>
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