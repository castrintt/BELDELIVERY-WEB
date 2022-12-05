import css from "./ChangePassword.module.css";
import NavBarTop from "../../../components/NavBarTop";

const ChangePassword = () => {

    return(
        <>
            <NavBarTop />
            <main className={css.container}>
                <div className={css.tittle}>
                    <h2>Alterar senha</h2>
                    <button >
                        EDITAR
                    </button>
                </div>
                <article className={css.container_form}>
                    <div>
                        <div className={css.input_group}>
                            <label htmlFor="old_password">Senha atual:</label>
                            <input type="text" id="old_password"/>
                        </div>
                        <div className={css.input_group}>
                            <label htmlFor="new_password">Nova senha:</label>
                            <input type="text" id="new_password"/>
                        </div>
                    </div>
                </article>
            </main>
        </>
    );
};

export default ChangePassword;