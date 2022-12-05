import { useEffect, useState } from "react";
import NavBarTop from "../../../components/NavBarTop";
import css from "./styled.module.css";
import { getCurrentUser } from "../../../utilites/helpers/helpers";
import { db } from "../../../services/api/firebaseConfig";
import Loading from "../../../components/Loading";
import moment from "moment";

const OrdersClient = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);

    const viewIcon = "https://img.icons8.com/color/20/null/search--v1.png";
    const deletIcon = "https://img.icons8.com/office/20/null/delete-sign.png";

    const currentUser = getCurrentUser();

    const getOrders = () => {
        setLoading(true);
        db.collection("orders")
        .where("idClient", "==" , currentUser.id)
        .get()
        .then((res) => {
            res.docs.map(doc => {
                const caminho = doc._delegate._document.data.value.mapValue.fields;
                setOrders([{
                    id: doc.id,
                    createDate: caminho.createDate.timestampValue,
                    idClient: caminho.idClient.stringValue,
                    idStore: caminho.idStore.stringValue,
                    itemLength: caminho.itemLength.integerValue,
                    status: caminho.status.stringValue,
                    totalValue: caminho.totalValue.stringValue,
                    ...orders
                }]
                ); 
                setLoading(false);
            });
        }) 
        .catch((error) => {
            setLoading(false);
        })
    };

    useEffect(() => {
        getOrders();
    }, []);

    return(
        <>
            {loading && <Loading />}
            <NavBarTop />
            <main className={css.container}>
                <div className={css.tittle}>
                    <h2>Meus pedidos</h2>
                </div>
                <article className={css.container_content}>
                    {orders?.length > 0 ?
                        orders.map(order => (
                            <div className={css.card_order} key={order.id}>
                                <div>
                                    <p>Status</p>
                                    <p>{order.status}</p>
                                </div>
                                <div>
                                    <p>Itens</p>
                                    <p>{order.itemLength}</p>
                                </div>
                                <div>
                                    <p>Data do pedido</p>
                                    <p>{moment(order.createDate).format("DD/MM/YYYY")}</p>
                                </div>
                                <div>
                                    <p>Valor total</p>
                                    <p>{order.totalValue}</p>
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
                            <p>Nenhum pedido foi achado</p>
                        </div>
                    }
                </article>
            </main>
        </>
    );
}

export default OrdersClient;