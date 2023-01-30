import css from "./TableResponsive.module.css";
import moment from "moment";

const TableResponsive = ({orders}) => {
    
    const viewIcon = "https://img.icons8.com/color/20/null/search--v1.png";
    const deletIcon = "https://img.icons8.com/office/20/null/delete-sign.png";

    return(
        <>
            {orders?.length > 0 ?
                orders.map(order => (
                    <div className={css.card_order} key={order.id}>
                        <div>
                            <p>Status</p>
                            <p>{order.status}</p>
                        </div>
                        <div>
                            <p>Loja</p>
                            <p>{order.storeName}</p>
                        </div>
                        <div>
                            <p>Valor total</p>
                            <p>{order.totalValue}</p>
                        </div>
                        <div>
                            <p>Data do pedido</p>
                            <p>{moment(order.createDate).format("DD/MM/YYYY")}</p>
                        </div>
                        <div>
                            <p>Ações</p>
                            <div className={css.actions_container}>
                                <span>
                                    <img src={viewIcon} />
                                </span>
                                <span>
                                    <img src={deletIcon} />
                                </span>
                            </div>
                        </div>
                    </div>
                )) : 
                <div className={css.not_found}>
                    <p>Nenhum pedido encontrado</p>
                </div>
            }
        </>
    );
};

export default TableResponsive;