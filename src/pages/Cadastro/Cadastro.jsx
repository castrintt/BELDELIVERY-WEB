import css from "./Cadastro.module.css";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
    const navigate = useNavigate();

    return(
        <main className={css.container_cadastro}>
            <section className={css.card_login}>
                <h1>Faça seu cadastro</h1>
                <p>Escolha o tipo da sua conta:</p>
                <div>
                    <button onClick={() => navigate("/cadastro/cliente")}>CLIENTE</button>
                    <button onClick={() => navigate("/cadastro/loja")}>LOJA</button>
                </div>
            </section>
        </main>
    )
}

export default Cadastro;