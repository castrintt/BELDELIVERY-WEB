import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import css from "./styled.module.css";
import Loading from "../Loading";
import { logout } from "../../services/validations/validation";

const NavBarLeft = () => {
    const [typeUser, setTypeUser] = useState("");
    const [loading, setLoading] = useState(false);
    const [openBar, setOpenBar] = useState(true);
    const [userName, setUserName] = useState("");

    const navigate = useNavigate();
    
    useEffect(() => {
        setUserName(localStorage.getItem("clientName"));
    }, []);
    
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
                        <div onClick={() => logout()}>
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
                            </div>
                            <div className={css.menu_items_hidde}>
                                <img src="https://img.icons8.com/material-rounded/30/null/home-page.png"/>
                            </div>
                            <div className={css.menu_items_hidde} onClick={() => navigate("/perfil")}>
                                <img src="https://img.icons8.com/small/30/000000/user-male-circle.png"/>
                            </div>
                            <div className={css.menu_items_hidde} onClick={() => navigate("/perfil/pedidos")}>
                                <img src="https://img.icons8.com/sf-ultralight/30/null/mobile-order.png"/>
                            </div>
                            <div className={css.menu_items_hidde} onClick={() => navigate("/perfil/enderecos")}>
                                <img src="https://img.icons8.com/ios/30/null/order-delivered.png"/>
                            </div>
                            <div className={css.menu_items_hidde} onClick={() => navigate("/perfil/alterar-senha")}>
                                <img src="https://img.icons8.com/ios/30/null/private-lock.png"/>
                            </div>
                        </div>
                        <div>
                            <div className={css.menu_items_hidde} onClick={() => logout()}>
                                <img src="https://img.icons8.com/windows/30/null/exit.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
       
    )
}

export default NavBarLeft;