import NavBarTop from "../../../components/NavBarTop";
import css from "./styled.module.css";
import CategoriasCards from "../../../components/Categorias";

const HomePage = () => {

    return(
        <>
            <NavBarTop />
            <section className={css.banner}></section>
            <main className={css.container}>
                {/* <CategoriasCards /> */}
            </main>
        </>
    )
}

export default HomePage;