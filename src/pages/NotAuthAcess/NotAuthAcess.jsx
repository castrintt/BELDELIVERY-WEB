/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import css from "./NotAuthAcess.module.css";

const NotAuthAcess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  }, []);
  return (
    <section className={css.container_page}>
      <div className={css.card_content}>
        <h1>Você será redirecionado à tela de Login</h1>
      </div>
    </section>
  );
};

export default NotAuthAcess;
