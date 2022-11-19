import NavBarTop from "../../components/NavBarTop";
import css from "./styled.module.css";
import CategoriasCards from "../../components/Categorias";

const HomePage = () => {

    return(
        <>
            <NavBarTop />
            <section className={css.banner}></section>
            <div className={css.container}>
                <CategoriasCards />
            </div>
        </>
    )
}

export default HomePage;