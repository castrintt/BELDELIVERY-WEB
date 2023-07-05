import css from "./styled.module.css";
import NavBarLeft from "../../../components/NavBarCliente/NavBarLeft/NavBarLeftClient";
import NavBarTop from "../../../components/NavBarCliente/NavBarTop/index";
import Loading from "../../../components/Loading";
import StoreCard from "./components/storeCard";
import UseHomeController from "./index.controller";

const HomePage = () => {
  const { States } = UseHomeController();
  return (
    <>
      {States.loading && <Loading />}
      <NavBarTop />
      <NavBarLeft />
      <div className={css.container}>
        <div className={css.tittle}>
          <h2>Nossas Lojas</h2>
        </div>
        <article className={css.container_content}>
          <div className={css.container_products}>
            {States.storeList?.length > 0 &&
              States.storeList.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
          </div>
        </article>
      </div>
    </>
  );
};

export default HomePage;
