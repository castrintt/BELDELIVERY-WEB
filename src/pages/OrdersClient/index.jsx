import { useEffect, useState } from "react";
import NavBarTop from "../../components/NavBarTop";
import css from "./styled.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";

const OrdersClient = () => {
    // const [ user, setUser ] = useState();

    // const navigate = useNavigate();
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
            <div className={css.container}>
                <div className={css.tittle}>
                    <h2>Meus pedidos</h2>
                </div>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Status</th>
                            <th>Valor</th>
                            <th>Data do pedido</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>
                                <img src="https://img.icons8.com/fluency/30/null/delete-forever.png"/>
                            </td>
                        </tr>
                    </tbody>
                    </Table>
            </div>
        </>
    )
}

export default OrdersClient;