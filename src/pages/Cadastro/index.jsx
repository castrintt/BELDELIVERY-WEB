import css from "./styled.module.css";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
    const navigate = useNavigate();

    return(
        <main className={css.container_cadastro}>
            <section className={css.container_login}>
                <div className={css.container_select_type}>
                    <h1>Faça seu cadastro</h1>
                    <p>Escolha o tipo da sua conta:</p>
                    <div>
                        <button onClick={() => navigate("/cadastro/cliente")}>Cliente</button>
                        <button onClick={() => navigate("/cadastro/loja")}>Loja</button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Cadastro;