import { useEffect, useState } from "react";
import NavBarTop from "../../components/NavBarTop";
import css from "./styled.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PerfilCliente = () => {
    const [ user, setUser ] = useState();

    const navigate = useNavigate();
    const actualUrl = [window.location.pathname];
    const idClient = localStorage.getItem("id");

    useEffect(() => {
        axios.get(`https://localhost:7221/api/ClientProfile/get-by-idclient/${idClient}`)
        .then((res) => {
            setUser(res.data);
        })
        .catch((error) => console.log(error));
    }, []);

    return(
        <>
            <NavBarTop />
            <div className={css.container}>
                <div className={css.tittle}>
                    <h2>Meu Perfil</h2>
                    <button>EDITAR</button>
                </div>
                <div className={css.container_form_user}>
                    <div>
                        <span>Nome:</span>
                        <span>{user?.name || "Nome não cadastrado"}</span>
                    </div>
                    <hr />
                    <div>
                        <span>CPF:</span>
                        <span>{user?.document || "Documento não cadastrado"}</span>
                    </div>
                    <hr />
                    <div>
                        <span>Telefone:</span>
                        <span>{user?.telPhone || "Telefone não cadastrado"}</span>
                    </div>
                    <hr />
                    <div>
                        <span>Celular:</span>
                        <span>{user?.cellPhone || "Celular não cadastrado"}</span>
                    </div>
                    <hr />
                    <div>
                        <span>Título:</span>
                        <span>{user?.tittleStatus || "0"}</span>
                    </div>
                    <hr />
                    <div>
                        <span>Pedidos:</span>
                        <span>{user?.orders || "0"}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PerfilCliente;