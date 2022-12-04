import { useEffect, useState } from "react";
import NavBarTop from "../../../components/NavBarTop";
import css from "./styled.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { getCurrentUser } from "../../../utilites/helpers/helpers";
import { db } from "../../../services/api/firebaseConfig";
import Loading from "../../../components/Loading";

const OrdersClient = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();
    const currentUser = getCurrentUser();


    const getOrders = () => {
        setLoading(true);
        db.collection("orders")
        .where("idClient", "==" , currentUser.id)
        .get()
        .then((res) => {
            res.docs.map(doc => {
                const caminho = doc._delegate._document.data.value.mapValue.fields;
                setOrders(
                    [{...orders,
                    id: doc.id,
                    createDate: caminho.createDate.timestampValue,
                    idClient: caminho.idClient.stringValue,
                    idStore: caminho.idStore.stringValue,
                    itemLength: caminho.itemLength.integerValue,
                    status: caminho.status.integerValue,
                    totalValue: caminho.totalValue.stringValue}]
                );
                setLoading(false);
            });
        }) 
        .catch((error) => {
            setLoading(false);
        })
    };

    const renderStatus = (status) => {
        switch (status){
            case 1:
                return "Em análise";
            case 2:
                return "Em preparação";
            case 3:
                return "Em entrega";
            case 4:
                return "Entregue";
            case 5:
                return "Problema na entrega";
            case 6:
                return "Cancelado";
        }
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
                                    {/* <p>{renderStatus(order.status)}</p> */}
                                </div>
                                <div>
                                    <p>Itens</p>
                                    <p>{order.itemLength}</p>
                                </div>
                                <div>
                                    <p>Data do pedido</p>
                                    <p>{order.registrationDate}</p>
                                </div>
                                <div>
                                    <p>Valor total</p>
                                    <p>{order.totalValue}</p>
                                </div>
                                <div>
                                    <p>Ações</p>
                                    <div className={css.actions_container}>
                                        <span>
                                            <img src="https://img.icons8.com/color/20/null/search--v1.png"/>
                                        </span>
                                        <span>
                                            <img src="https://img.icons8.com/office/20/null/delete-sign.png"/>
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
    )
}

export default OrdersClient;