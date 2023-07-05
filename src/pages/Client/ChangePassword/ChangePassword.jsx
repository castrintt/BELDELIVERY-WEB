import css from "./ChangePassword.module.css";
import NavBarTop from "../../../components/NavBarCliente/NavBarTop";
import NavBarLeft from "../../../components/NavBarCliente/NavBarLeft/NavBarLeftClient";
import Loading from "../../../components/Loading";
import "react-toastify/dist/ReactToastify.css";
import UseChangePasswordController from "./ChangePassword.controller";

const ChangePassword = () => {
  const { Actions, States } = UseChangePasswordController();

  return (
    <>
      <NavBarTop />
      <NavBarLeft />
      {States.loading && <Loading />}
      <main className={css.container}>
        <div className={css.tittle}>
          <h2>Alterar senha</h2>
          <button onClick={() => Actions.onCheckData()}>EDITAR</button>
        </div>
        <article className={css.container_form}>
          <div>
            <div className={css.input_group}>
              <label htmlFor="old_password">Senha atual:</label>
              <input
                type="text"
                id="old_password"
                value={States.dataForm.oldPassword}
                onChange={(e) => Actions.onChange(e)}
                name="oldPassword"
              />
              {States.customError.oldPassword?.length > 0 && (
                <p>{States.customError.oldPassword}</p>
              )}
            </div>
            <div className={css.input_group}>
              <label htmlFor="new_password">Nova senha:</label>
              <input
                type="text"
                id="new_password"
                value={States.dataForm.newPassword}
                onChange={(e) => Actions.onChange(e)}
                name="newPassword"
              />
              {States.customError.newPassword?.status && (
                <p>{States.customError.newPassword.messenge}</p>
              )}
            </div>
          </div>
        </article>
      </main>
    </>
  );
};

export default ChangePassword;
