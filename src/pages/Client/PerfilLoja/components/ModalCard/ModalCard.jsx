import React from 'react';
import css from "./ModalCard.module.css";

const ModalCard = ({setModalOpen}) => {

    function setModalOpen1(){
        setModalOpen(false)
        console.log("clicou")
    }
    return(
        <>
            <div className={css.modal_background} onBlur={() => setModalOpen(false)}> 
                <div className={css.modal_container}>
                    <div className={css.image_card}>

                    </div>
                    <div className={css.info_card}>

                    </div>
                </div>
                <span className={css.close_icon} onClick={() => setModalOpen(false)}>
                    X
                </span>
            </div>
        </>
    );
};

export default ModalCard;