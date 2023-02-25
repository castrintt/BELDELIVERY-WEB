import { useState, useEffect } from "react";
import css from "./cardItem.module.css";
import { useSelector } from "react-redux";

const CardItem = () => {
    const [product, setProduct] = useState({});
    const [unidad, setUnidad] = useState(product.unidad);
    const [amount, setAmout] = useState(product.value);

    const cart = useSelector(state => state.cart);

    const clicou = (operation) => {
        if(operation === 1){
            setUnidad(unidad + 1);
        } else {
            setUnidad(unidad - 1);
        }
    };

    useEffect(() => {
        const selectedProduct = cart.cartItem[0]; // Assuming the cart only has one item
        setProduct(selectedProduct);
        setUnidad(selectedProduct.unidad);
        setAmout(selectedProduct.value * selectedProduct.unidad);
    }, [cart]);


    return (
        <>
            <div className={css.cart_product}>
                <div className={css.cart_product_info}>
                    <h3>{product.name}</h3>
                    <p>{amount}</p>
                </div>
                <div>
                    <button
                        className={css.cart_product_operator}
                        onClick={() => clicou(1)}
                    >+</button>
                    <span className={css.cart_product_unidad}>{unidad}</span>
                    <button
                        className={css.cart_product_operator}
                        onClick={() => clicou(2)}
                    >-</button>
                </div>
            </div>
        </>
    );
};

export default CardItem;