import css from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../utils/img/delivery-logo.png";

const Cadastro = () => {
    const navigate = useNavigate();

    return(
        <section className={css.bg_login}>
            <div>
                <img src={Logo} alt="logo-delivery" />
            </div>
            <div>
                <div className={css.container_form}>
                    <h2>Faça seu cadastro</h2>
                    <div className={css.card_form}>
                        <h2>Escolha o tipo da sua conta:</h2>
                        <div>
                            <button onClick={() => navigate("/cadastro/cliente")}>CLIENTE</button>
                            <button onClick={() => navigate("/cadastro/loja")}>LOJA</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
{/* <div className={css.card_login}>
                <h2>Faça seu cadastro</h2>
                <p>Escolha o tipo da sua conta:</p>
                <div>
                    <button onClick={() => navigate("/cadastro/cliente")}>CLIENTE</button>
                    <button onClick={() => navigate("/cadastro/loja")}>LOJA</button>
                </div>
            </div> */}
export default Cadastro;