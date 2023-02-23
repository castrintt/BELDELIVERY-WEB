import React, { useState } from 'react';
import css from "./Card.module.css";
import ModalCard from '../ModalCard/ModalCard';

const Card = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return(
        <>
            <div className={css.card_container} onClick={() => setModalOpen(true)}>
                <div></div>
                <div>
                    <h4>Nome do produto</h4>
                    <p>Descrição do produto</p>
                    <span>R$30,50</span>
                </div>
            </div>
            {modalOpen && <ModalCard setModalOpen={setModalOpen}/>}
        </>
    );
};

export default Card;