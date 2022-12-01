import { useEffect, useState } from "react";
import css from "./FormPerfilEdit.module.css";

const FormPerfilEdit = ({userData, setEditForm}) => {

    const updateUserData = () => {

    };

    return(
        <>
            <div className={css.tittle}>
                <h2>Meu Perfil</h2>
                <div className={css.buttons_container}>
                    <button onClick={() => setEditForm(false)}>
                        CANCELAR
                    </button>
                    <button onClick={() => setEditForm(true)}>
                        SALVAR
                    </button>
                </div>
            </div>
            <article className={css.container_form}>
                
            </article>
        </>
    );
}

export default FormPerfilEdit;