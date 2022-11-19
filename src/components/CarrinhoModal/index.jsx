import { useState } from "react";
import css from "./styled.module.css";

const CarrinhoModal = ({ openModalProps }) => {

    return (
        <>
            <div className={openModalProps ? css.container_carrinho_modal : css.container_carrinho_modal_off}>
                
            </div>
        </>
    )
}

export default CarrinhoModal;