import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import css from "./styled.module.css";
import Loading from "../Loading";
import axios from "axios";
import api from "../../services/axios/axios";

const NavBarLeft = () => {
    const [typeUser, setTypeUser] = useState("");
    const [loading, setLoading] = useState(false);
    const [openBar, setOpenBar] = useState(true);
    const [userName, setUserName] = useState("");

    const navigate = useNavigate();
    
    useEffect(() => {
        setLoading(true);
        api.get(`/clientProfile/${localStorage.getItem("id")}`)
        .then((res) => {
            setUserName(res.data.name);
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
            console.log(error);
        })
    }, [])
    
    return (
        <>
            {loading && <Loading />}
            <img className={css.icon_open_menu}
                src="https://img.icons8.com/ios-filled/50/000000/menu--v1.png"
                onClick={() => setOpenBar(!openBar)}
            />
            {openBar ? (
                <div className={css.container_left_bar}>
                <div className={css.nav_container}>
                    <div>
                        <div className={css.container_avatar}>
                            <div className={css.container_img_avatar}>

                            </div>
                            <span>{userName}</span>
                        </div>
                        <div className={css.menu_items} onClick={() => navigate("/home")}>
                            <img src="https://img.icons8.com/material-rounded/35/null/home-page.png"/>
                            <span>Home</span>
                        </div>
                        <div className={css.menu_items} onClick={() => navigate("/perfil")}>
                            <img src="https://img.icons8.com/small/35/000000/user-male-circle.png"/>
                            <span>Perfil</span>
                        </div>
                        {typeUser === "ADMIN" && (
                            <div className={css.menu_items} onClick={() => navigate("/perfil")}>
                                <img src="https://img.icons8.com/small/35/000000/user-male-circle.png"/>
                                <span>Produtos</span>
                            </div>
                        )}
                        <div className={css.menu_items} onClick={() => navigate("/perfil/pedidos")}>
                            <img src="https://img.icons8.com/sf-ultralight/35/null/mobile-order.png"/>
                            <span>Pedidos</span>
                        </div>
                        <div className={css.menu_items} onClick={() => navigate("/perfil/enderecos")}>
                            <img src="https://img.icons8.com/ios/35/null/order-delivered.png"/>
                            <span>Endereços</span>
                        </div>
                        <div className={css.menu_items} onClick={() => navigate("/perfil/alterar-senha")}>
                            <img src="https://img.icons8.com/ios/30/null/private-lock.png"/>
                            <span>Alterar senha</span>
                        </div>
                    </div>
                    <div>
                        <div onClick={() => navigate("/home")}>
                            <img src="https://img.icons8.com/windows/40/null/exit.png"/>
                            <span>Sair</span>
                        </div>
                    </div>
                </div>
            </div>
            ) :
                <div className={css.hidde_bar}>
                    <div className={css.nav_container_hidde}>
                        <div>
                            <div className={css.container_avatar}>
                                <div className={css.container_img_avatar}>

                                </div>
                                <span>{userName}</span>
                            </div>
                            <div className={css.menu_items}>
                                <img src="https://img.icons8.com/material-rounded/35/null/home-page.png"/>
                            </div>
                            <div className={css.menu_items} onClick={() => navigate("/perfil")}>
                                <img src="https://img.icons8.com/small/40/000000/user-male-circle.png"/>
                            </div>
                            <div className={css.menu_items} onClick={() => navigate("/perfil/pedidos")}>
                                <img src="https://img.icons8.com/sf-ultralight/40/null/mobile-order.png"/>
                            </div>
                            <div className={css.menu_items} onClick={() => navigate("/perfil/enderecos")}>
                                <img src="https://img.icons8.com/ios/40/null/order-delivered.png"/>
                            </div>
                            <div className={css.menu_items} onClick={() => navigate("/perfil/alterar-senha")}>
                                <img src="https://img.icons8.com/ios/35/null/private-lock.png"/>
                            </div>
                        </div>
                        <div>
                            <div className={css.menu_items}>
                                <img src="https://img.icons8.com/windows/40/null/exit.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
       
    )
}

export default NavBarLeft;