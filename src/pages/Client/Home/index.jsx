import css from "./styled.module.css";
import NavBarLeft from "../../../components/NavBarCliente/NavBarLeft/NavBarLeftClient";
import NavBarTop from "../../../components/NavBarCliente/NavBarTop/index";

const HomePage = () => {

    return(
        <>
            <NavBarTop />
            <NavBarLeft />
            <section className={css.banner}></section>
            <main className={css.container}>
                {/* <CategoriasCards /> */}
            </main>
        </>
    )
}

export default HomePage;