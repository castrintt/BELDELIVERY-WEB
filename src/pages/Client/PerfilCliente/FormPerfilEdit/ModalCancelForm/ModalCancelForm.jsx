import css from "./ModalCancelForm.module.css";

const ModalCancelForm = ({setOpenModal, setEditForm}) => {
    return(
        <div className={css.bg_modal}>
            <div className={css.container_modal}>
                <button onClick={() => setOpenModal(false)}>Cancelar</button>
                <button onClick={() => setEditForm(false)}>Confirmar</button>
            </div>
        </div>
    );
};

export default ModalCancelForm;