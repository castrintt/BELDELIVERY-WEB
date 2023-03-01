import css from "./FormAddressNotEdit.module.css";
import moment from "moment/moment";

const FormAddressNotEdit = ({userData, setEditForm}) => {
    
    return(
        <>
            <div className={css.tittle}>
                <h2>Endereço</h2>
                <button onClick={() => setEditForm(true)}>
                    EDITAR
                </button>
            </div>
            <article className={css.container_form}>
                <div>
                    {/* <img src={perfilImg}/> */}
                </div>
                {userData ? 
                <div className={css.form_grid}>
                    <div className={css.input_group}>
                        <p>Rua:</p>
                        <p>{userData?.rua}</p>
                    </div>
                    <div className={css.input_group}>
                        <p>Bairro:</p>
                        <p>{userData?.bairro}</p>
                    </div>
                    <div className={css.input_group}>
                        <p>Cidade:</p>
                        <p>{userData?.cidade}</p>
                    </div>
                    <div className={css.input_group}>
                        <p>Estado:</p>
                        <p>{userData?.estado}</p>
                    </div>
                    <div className={css.input_group}>
                        <p>Número:</p>
                        <p>{userData?.numero}</p>
                    </div>
                    <div className={css.input_group}>
                        <p>Referência:</p>
                        <p>{userData?.referencia}</p>
                    </div>
                </div> :
                <div>
                    <p>asfsafasfasfasffas</p>
                </div>
                }
            </article>
        </>
    );
};

export default FormAddressNotEdit;