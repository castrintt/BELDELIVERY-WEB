import css from "./styled.module.css";
import React from "react";
import Loading from "../../components/Loading";
import Logo from "../../utils/img/delivery-logo.png";
import UseLoginController from "./index.controller";

const Login2 = () => {
  const { Actions, States } = UseLoginController();
  return (
    <>
      {States.loading && <Loading />}
      <section className={css.bg_login}>
        <div>
          <img src={Logo} alt="logo-delivery" />
        </div>
        <div>
          <div className={css.container_form}>
            <div>
              <p>Bem-vindo(a)</p>
            </div>
            <form
              action="POST"
              className={css.card_form}
              onSubmit={(e) => Actions.onVerifyData(e)}
            >
              <h2>Login</h2>
              <input
                type="text"
                id={States.error.customError.email && css.error_input}
                value={States.formData.email}
                onChange={(e) => Actions.onChange(e)}
                name="email"
                placeholder="Email"
              />
              <input
                type="text"
                id={States.error.customError.password && css.error_input}
                value={States.formData.password}
                onChange={(e) => Actions.onChange(e)}
                name="password"
                placeholder="Senha"
              />
              <button type="submit">Enviar</button>
            </form>
            <div>
              <span
                onClick={Actions.onChangeLoginType}
                className={css.cursor_pointer}
              >
                {States.loginType === 1
                  ? "Logar como loja"
                  : "Logar como cliente"}
              </span>
              <span
                className={css.cursor_pointer}
                onClick={() => Actions.onNavigate("/cadastro")}
              >
                Criar nova conta
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login2;
