import { useEffect, useState } from "react";
import css from "./FormPerfilNotEdit.module.css";

const FormPerfilNotEdit = ({userData, setEditForm}) => {

    return(
        <>
            <div className={css.tittle}>
                <h2>Meu Perfil</h2>
                <button onClick={() => setEditForm(true)}>
                    EDITAR
                </button>
            </div>
            <article className={css.container_form}>
                
            </article>
        </>
    );
};

export default FormPerfilNotEdit;