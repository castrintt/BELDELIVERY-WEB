import React, { useState } from 'react';
import css from "./Card.module.css";
import ModalCard from '../ModalCard/ModalCard';

const Card = ({product}) => {
    const [modalOpen, setModalOpen] = useState(false);

    const nameView = (name) => {
        if(name.length > 20){
            name = name.slice(0, 20);
            return name + "..."
        } else{
            return name;
        }
    };

    const descriptionView = (description) => {
        if(description.length > 60){
            description = description.slice(0, 60);
            return description + "..."
        } else{
            return description;
        }
    };

    return(
        <>
            <div className={css.card_container} onClick={() => setModalOpen(true)}>
                <div>
                    <img src={product.img} alt="ícone produto" />
                </div>
                <div className={css.containerDescription}>
                    <div>
                        <h4>{nameView(product.name)}</h4>
                        <p>{descriptionView(product.description)}</p>
                    </div>
                    <div>
                        <span>R${product.value}</span>
                    </div>
                </div>
            </div>
            {modalOpen && <ModalCard setModalOpen={setModalOpen}/>}
        </>
    );
};

export default Card;