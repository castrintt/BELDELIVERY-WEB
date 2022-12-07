import css from "../styled.module.css";
import { getCurrentUser, Logout } from "../../../utilites/helpers/helpers";
import { useNavigate } from "react-router-dom";
import NavBarLeftResponsive from "./NavBarLeftResponsive/NavBarLeftResponsive";
import {useNavBarLeft} from "../../../services/hooks/useNavBarLeft";

const NavBarLeftClient = () => {
    const {icons, openBar} = useNavBarLeft();

    const currentUser = getCurrentUser();
    const navigate = useNavigate();

    return (
        <>
            {openBar ? (
                <div className={css.container_left_bar}>
                <div className={css.nav_container}>
                    <div>
                        <div className={css.container_avatar}>
                            <div className={css.container_img_avatar}>

                            </div>
                            <span>{currentUser.name}</span>
                        </div>
                        <div className={css.menu_items}
                            onClick={() => navigate("/home")}
                        >
                            <img src={icons.home} />
                            <span>HOME</span>
                        </div>
                        <div className={css.menu_items}
                            onClick={() => navigate("/perfil")}
                        >
                            <img src={icons.perfil} />
                            <span>PERFIL</span>
                        </div>
                        <div className={css.menu_items}
                            onClick={() => navigate("/perfil/pedidos")}
                        >
                            <img src={icons.order} />
                            <span>PEDIDOS</span>
                        </div>
                        <div className={css.menu_items}
                            onClick={() => navigate("/perfil/enderecos")}
                        >
                            <img src={icons.address} />
                            <span>ENDEREÇOS</span>
                        </div>
                        <div className={css.menu_items}
                            onClick={() => navigate("/perfil/alterar-senha")}
                        >
                            <img src={icons.changePassword} />
                            <span>ALTERAR SENHA</span>
                        </div>
                    </div>
                    
                    <div>
                        <div onClick={() => Logout()}>
                            <img src={icons.logout} />
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
                        <div className={css.menu_items_hidde}
                            onClick={() => navigate("/")}
                        >
                            <img src={icons.home} />
                        </div>
                        <div className={css.menu_items_hidde}
                            onClick={() => navigate("/perfil")}
                        >
                            <img src={icons.perfil} />
                        </div>
                        <div className={css.menu_items_hidde}
                            onClick={() => navigate("/perfil/pedidos")}
                        >
                            <img src={icons.order} />
                        </div>
                        <div className={css.menu_items_hidde}
                            onClick={() => navigate("/perfil/enderecos")}
                        >
                            <img src={icons.address} />
                        </div>
                        <div className={css.menu_items_hidde}
                            onClick={() => navigate("/perfil/alterar-senha")}
                        >
                            <img src={icons.changePassword} />
                        </div>
                    </div>
                    <div>
                        <div className={css.menu_items_hidde} onClick={() => Logout()}>
                        <img src={icons.logout} />
                        </div>
                    </div>
                </div>
            </div>
            }

            <NavBarLeftResponsive/>
        </>
    );
};

export default NavBarLeftClient;