import css from "./styled.module.css";
import Hamb from "../../utilites/img/hamburguer.jpg"

const CategoriasCards = () => {

    return(
        <div className={css.container_card_category}>
            <div>
                <img src={Hamb} alt="" />
            </div>
            <div>
            </div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default CategoriasCards;