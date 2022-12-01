import { useEffect, useState } from "react";
import NavBarTop from "../../../components/NavBarTop";
import css from "./styled.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";

const OrdersClient = () => {
    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();
    // const actualUrl = [window.location.pathname];
    // const idClient = localStorage.getItem("id");

    // useEffect(() => {
    //     axios.get(`https://localhost:7221/api/ClientProfile/get-by-idclient/${idClient}`)
    //     .then((res) => {
    //         setUser(res.data);
    //     })
    //     .catch((error) => console.log(error));
    // }, []);

    return(
        <>
            <NavBarTop />
            <main className={css.container}>
                <div className={css.tittle}>
                    <h2>Meus pedidos</h2>
                </div>
                <article className={css.container_content}>
                    {orders?.length > 0 ? 
                        orders.map(order => (
                            <div className={css.card_order}>
                                <div>
                                    <p>Número</p>
                                    <p>{order.id}</p>
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
                                        <span>B</span>
                                        <span>X</span>
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