import { useEffect, useState } from "react";
import css from "./cartResume.module.css";

const CartResume = ({cart}) => {
    const [subTotal, setSubTotal] = useState(0);
    const [feerDelivery, setFeerDelivery] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let subTotalCurrent = cart.cartItem.reduce((acc, item) => {
            let unidad = item.unidad;
            let value = item.value;
            return acc + (unidad * value);
        }, 0);
    
        setSubTotal(subTotalCurrent);
        setFeerDelivery(cart.feerDelivery);
        setTotal(subTotalCurrent + cart.feerDelivery);
    }, [cart]);

    return(
        <div className={css.cart_summary}>
            <h3>Resumo da compra</h3>
            <div className={css.cart_summary_item}>
                <span>Subtotal:</span>
                <span>R${subTotal}</span>
            </div>
            <div className={css.cart_summary_item}>
                <span>Entrega:</span>
                <span>{feerDelivery}</span>
            </div>
            <div className={css.cart_summary_item}>
                <span>Total:</span>
                <span>R${total}</span>
            </div>
            <button className={css.cart_checkout}>Finalizar compra</button>
        </div>
    );
};

export default CartResume;