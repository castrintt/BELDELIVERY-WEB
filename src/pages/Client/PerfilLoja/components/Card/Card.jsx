import React, { useState } from 'react';
import css from "./Card.module.css";
import ModalCard from '../ModalCard/ModalCard';

const Card = ({product}) => {
    const [modalOpen, setModalOpen] = useState(false);

    return(
        <>
            <div className={css.card_container} onClick={() => setModalOpen(true)}>
                <div>
                    <img src={product.img} alt="ícone produto" />
                </div>
                <div>
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                    <span>R${product.value}</span>
                </div>
            </div>
            {modalOpen && <ModalCard setModalOpen={setModalOpen}/>}
        </>
    );
};

export default Card;