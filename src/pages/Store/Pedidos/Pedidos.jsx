import css from "./Pedidos.module.css";
import NavBarTop from "../../../components/NavBarLoja/NavBarTop";
import NavBarLeft from "../../../components/NavBarLoja/NavBarLeft/NavBarLeft";
import Tabela from "./Tabela/Tabela";
import { useState } from "react";

const Pedidos = () => {
    const [currentTable, setCurrentTable] = useState(1);

    let orders = [
        {
            id: 1002,
            status: "Em preparação",
            totalValue: "R$50,00",
            itens: 15,
            date: "21/12/2022"
        },
        {
            id: 1003,
            status: "Em entrega",
            totalValue: "R$70,00",
            itens: 10,
            date: "21/12/2022"
        },
        {
            id: 1004,
            status: "Em preparação",
            totalValue: "R$50,00",
            itens: 15,
            date: "21/12/2022"
        },
        {
            id: 1005,
            status: "Concluído",
            totalValue: "R$20,00",
            itens: 15,
            date: "21/12/2022"
        },
    ];

    return(
        <>
            <NavBarTop />
            <NavBarLeft />
            <main className={css.container}>
                <div className={css.tittle}>
                    <h2>Pedidos</h2>
                </div>
                <div className={css.select_table}>
                    <div
                        onClick={() => setCurrentTable(1)}
                        className={currentTable === 1 && css.active_option}
                    >
                        TODOS
                    </div>
                    <div
                        onClick={() => setCurrentTable(2)}
                        className={currentTable === 2 && css.active_option}
                    >
                       EM PREPARAÇÃO
                    </div>
                    <div
                        onClick={() => setCurrentTable(3)}
                        className={currentTable === 3 && css.active_option}
                    >
                       EM ENTREGA
                    </div>
                    <div
                        onClick={() => setCurrentTable(4)}
                        className={currentTable === 4 && css.active_option}
                    >
                        CONCLUÍDOS
                    </div>
                </div>
                <article className={css.container_form}>
                    <Tabela orders={orders} currentTable={currentTable} />
                </article>
            </main>
        </>
    );
};

export default Pedidos;