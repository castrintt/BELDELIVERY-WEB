import { useState, useEffect } from "react";
import css from "./styled.module.css";
import CardItem from "./components/cardItem/cardItem";
import { useSelector } from "react-redux";
import CartResume from "./components/cartResume/cartResume";

const CarrinhoModal = ({ openModalProps }) => {
  const [products, setProducts] = useState([]);

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (cart) setProducts(cart.cartItem);
  }, [cart]);

  return (
    <>
      <div
        className={
          openModalProps
            ? css.container_carrinho_modal
            : css.container_carrinho_modal_off
        }
      >
        <div className={css.cart_header}>
          <h2>Carrinho de compras</h2>
        </div>
        <div className={css.cart_products}>
          {products?.length > 0 &&
            products.map((product) => (
              <CardItem key={product.id} product={product} />
            ))}
        </div>
        {products?.length > 0 && <CartResume cart={cart} />}
      </div>
    </>
  );
};

export default CarrinhoModal;
