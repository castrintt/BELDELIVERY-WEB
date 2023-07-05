import css from "./storeCard.module.css";
import AnonimoImg from "../../../../utils/img/anonimo.png";
import { useNavigate } from "react-router-dom";

const StoreCard = ({store}) => {

    const navigate = useNavigate();

    return(
        <>
            <div className={css.card} onClick={() => navigate(`/lojas/${store.url}`)}>
                <div>
                    <img src={store.img !== undefined ? store.img : AnonimoImg} alt="" /> 
                </div>
                <div>
                    <span>{store.name}</span>
                    <p>{store.category}</p>
                </div>
            </div>
        </>
    );
};

export default StoreCard;
