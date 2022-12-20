import css from "./FormNotEdit.module.css";
import moment from "moment/moment";

const FormNotEdit = ({userData, setEditForm, perfilImg}) => {
    
    return(
        <>
            <div className={css.tittle}>
                <h2>Minha Loja</h2>
                <button onClick={() => setEditForm(true)}>
                    EDITAR
                </button>
            </div>
            <article className={css.container_form}>
                <div>
                    <img src={perfilImg}/>
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
                        <p>Documento:</p>
                        {userData.cpf?.length ?
                            <p>{userData.cpf}</p> : 
                            <p>Sem documento</p>    
                        }
                    </div>
                    <div className={css.input_group}>
                        <p>Celular:</p>
                        {userData.cellPhone?.length ?
                            <p>{userData.cellPhone}</p> : 
                            <p>Sem celular</p>    
                        }
                    </div>
                    <div className={css.input_group}>
                        <p>Categoria:</p>
                        <p>{userData.category}</p>
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

export default FormNotEdit;