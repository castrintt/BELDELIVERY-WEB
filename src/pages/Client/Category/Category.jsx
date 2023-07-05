import css from "./Category.module.css";
import NavBarLeft from "../../../components/NavBarCliente/NavBarLeft/NavBarLeftClient";
import NavBarTop from "../../../components/NavBarCliente/NavBarTop";
import Loading from "../../../components/Loading";
import StoreCard from "./components/storeCard";
import UseCategoryController from "./Category.controller";

const Category = () => {
  const { States } = UseCategoryController();
  return (
    <>
      {States.loading && <Loading />}
      <NavBarTop />
      <NavBarLeft />
      <div className={css.container}>
        <div className={css.tittle}>
          <h2>{States.category}</h2>
        </div>
        <article className={css.container_content}>
          <div className={css.container_products}>
            {States.stores?.length > 0
              ? States.stores.map((store) => (
                  <StoreCard key={store.id} store={store} />
                ))
              : "Nenhuma loja encontrada"}
          </div>
        </article>
      </div>
    </>
  );
};

export default Category;
