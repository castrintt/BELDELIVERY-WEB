import { useEffect, useState } from "react";
import css from "./FormPerfilNotEdit.module.css";
import moment from "moment/moment";

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
                <div>
                    <img src="" />
                    <input type="file" name="" id="" />
                </div>
                <div>
                    <div className={css.input_group}>
                        <p>Nome completo:</p>
                        <p>{userData.name}</p>
                    </div>
                    <div className={css.input_group}>
                        <p>E-mail:</p>
                        <p>{userData.email}</p>
                    </div>
                    <div className={css.input_group}>
                        <p>CPF:</p>
                        {userData.cpf?.length ?
                            <p>{userData.cpf}</p> : 
                            <p>Nenhum CPF cadastrado</p>    
                        }
                    </div>
                    <div className={css.input_group}>
                        <p>Celular:</p>
                        {userData.cellPhone?.length ?
                            <p>{userData.cellPhone}</p> : 
                            <p>Nenhum celular cadastrado</p>    
                        }
                    </div>
                    <div className={css.input_group}>
                        <p>Número de pedidos:</p>
                        <p>{userData.orders}</p>
                    </div>
                    <div className={css.input_group}>
                        <p>Conta criada em:</p>
                        <p>{moment(userData.createdDate).format("DD/MM/YYYY")}</p>
                    </div>
                </div>
            </article>
        </>
    );
};

export default FormPerfilNotEdit;