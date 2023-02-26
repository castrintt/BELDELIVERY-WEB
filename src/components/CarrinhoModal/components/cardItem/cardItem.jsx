import { useState, useEffect } from "react";
import css from "./cardItem.module.css";
import { useDispatch } from "react-redux";
import { updateItem } from "../../../../redux/cartSlice";

const CardItem = ({product}) => {
    const [amount, setAmout] = useState();
    const dispatch = useDispatch();

    const someUnidad = () => {
        product = {...product, unidad:  product.unidad + 1};
        dispatch(updateItem(product));
    };

    const decriseUnidad = () => {
        product = {...product, unidad: product.unidad - 1};
        dispatch(updateItem(product));
    };

    useEffect(() => {
        setAmout(product.value * product.unidad);
    }, [product]);

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
                        onClick={() => someUnidad()}
                    >+</button>
                    <span className={css.cart_product_unidad}>{product.unidad}</span>
                    <button
                        className={css.cart_product_operator}
                        onClick={() => decriseUnidad()}
                    >-</button>
                </div>
            </div>
        </>
    );
};

export default CardItem;