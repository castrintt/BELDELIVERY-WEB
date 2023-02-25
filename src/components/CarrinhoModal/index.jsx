import { useState, useEffect } from "react";
import css from "./styled.module.css";
import CardItem from "./components/cardItem/cardItem";
import { useSelector } from "react-redux";

const CarrinhoModal = ({ openModalProps }) => {
    let cartState = useSelector(state => state.cart);
    const [cart, setCart] = useState(useSelector(state => state.cart));

    useEffect(() => {
        if(!!cart.cartItem) {
            cart.cartItem.map(x => {
                console.log(x)
            })
        }
    }, [cartState])
    
    return (
        <>
            <div className={openModalProps ? css.container_carrinho_modal : css.container_carrinho_modal_off}>
                <div className={css.cart_header}>
                    <h2>Carrinho de compras</h2>
                </div>
                <div className={css.cart_products}>
                    <CardItem />
                </div>
                <div className={css.cart_summary}>
                    <h3>Resumo da compra</h3>
                    <div className={css.cart_summary_item}>
                        <span>Subtotal:</span>
                        <span>R$ 50,00</span>
                    </div>
                    <div className={css.cart_summary_item}>
                        <span>Entrega:</span>
                        <span>Grátis</span>
                    </div>
                    <div className={css.cart_summary_item}>
                        <span>Total:</span>
                        <span>R$ 50,00</span>
                    </div>
                    <button className={css.cart_checkout}>Finalizar compra</button>
                </div>
            </div>
        </>
    );
};

export default CarrinhoModal;