import css from "./Pedidos.module.css";
import NavBarTop from "../../../components/NavBarLoja/NavBarTop";
import NavBarLeft from "../../../components/NavBarLoja/NavBarLeft/NavBarLeft";
import Tabela from "./Tabela/Tabela";

const Pedidos = () => {

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
    ];

    return(
        <>
            <NavBarTop />
            <NavBarLeft />
            <main className={css.container}>
                <div className={css.tittle}>
                    <h2>Pedidos</h2>
                </div>
                <article className={css.container_form}>
                    <Tabela orders={orders}/>
                </article>
            </main>
        </>
    );
};

export default Pedidos;