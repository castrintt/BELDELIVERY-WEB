import css from "./storeCard.module.css";
import AnonimoImg from "../../../../utilites/img/anonimo.png";
import { useNavigate } from "react-router-dom";

const StoreCard = ({storeList}) => {

    const navigate = useNavigate();

    return(
        <>
            {storeList.length > 0 &&
                storeList.map(store => (
                    <div key={store.id} onClick={() => navigate(`/lojas/${store.url}`)}>
                        <div>
                            <img src={store.img !== undefined ? store.img : AnonimoImg} alt="" /> 
                        </div>
                        <div>
                            <span>{store.name}</span>
                            <p>{store.category}</p>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default StoreCard;
