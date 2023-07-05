import { useEffect, useState } from "react";
import NavBarTop from "../../../components/NavBarCliente/NavBarTop";
import NavBarLeft from "../../../components/NavBarCliente/NavBarLeft/NavBarLeftClient";
import TableResponsive from "./TableResponsive/TableResponsive";
import Table from "./Table/Table";
import css from "./styled.module.css";
import { getCurrentUser } from "../../../utils/helpers/helpers";
import { db } from "../../../config/api/firebaseConfig";
import Loading from "../../../components/Loading";

const OrdersClient = () => {
    const [loading, setLoading] = useState(false);
    const [currentTable, setCurrentTable] = useState(1);
    const [orders, setOrders] = useState([]);
    const [dataTable, setDataTable] = useState([]);

    const currentUser = getCurrentUser();

    const getOrders = () => {
        setLoading(true);
        let ordersResponse = [];

        db.collection("orders")
        .where("idClient", "==" , currentUser.id)
        .get()
        .then((res) => {
            if(res.size > 0){
                res.docs.map(doc => {
                    const caminho = doc._delegate._document.data.value.mapValue.fields;
                    ordersResponse.push({
                        id: doc.id,
                        createDate: caminho.createDate.timestampValue,
                        idClient: caminho.idClient.stringValue,
                        idStore: caminho.idStore.stringValue,
                        itemLength: caminho.itemLength.integerValue,
                        status: caminho.status.stringValue,
                        totalValue: caminho.totalValue.stringValue,
                        storeName: caminho.storeName.stringValue,
                        ...orders
                    });
                });
            };
            setLoading(false);
            setOrders(ordersResponse);
            setDataTable(ordersResponse);
        })
        .catch((error) => {
            setLoading(false);
        })
    };

    const filterTable = (currentNumber) => {
        setCurrentTable(currentNumber)
        let filter = [];

        switch (currentNumber){
            case 1:
                filter = orders;
                break;
            case 2:
                filter = orders.filter(order => order.status === "Em preparação");
                break;
            case 3:
                filter = orders.filter(order => order.status === "Em entrega");
                break;
            case 4:
                filter = orders.filter(order => order.status === "Concluído");
                break;
        };

        setDataTable(filter);
    };

    useEffect(() => {
        getOrders();
    }, []);

    return(
        <>
            {loading && <Loading />}
            <NavBarTop />
            <NavBarLeft />
            <main className={css.container}>
                <div className={css.tittle}>
                    <h2>Meus pedidos</h2>
                </div>
                <div className={css.select_table}>
                    <div
                        onClick={() => filterTable(1)}
                        className={currentTable === 1 && css.active_option}
                    >
                        TODOS
                    </div>
                    <div
                        onClick={() => filterTable(2)}
                        className={currentTable === 2 && css.active_option}
                    >
                        EM PREPARAÇÃO
                    </div>
                    <div
                        onClick={() => filterTable(3)}
                        className={currentTable === 3 && css.active_option}
                    >
                        EM ENTREGA
                    </div>
                    <div
                        onClick={() => filterTable(4)}
                        className={currentTable === 4 && css.active_option}
                    >
                        CONCLUÍDOS
                    </div>
                </div>
                <article className={css.container_content}>
                    <TableResponsive orders={dataTable} />
                    <Table orders={dataTable} />
                </article>
            </main>
        </>
    );
}

export default OrdersClient;