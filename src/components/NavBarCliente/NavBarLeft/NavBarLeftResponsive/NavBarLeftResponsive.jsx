import css from "./NavBarLeftResponsive.module.css";
import {useNavBarLeft} from "../../../../services/hooks/useNavBarLeft";
import {Logout, getCurrentUser} from "../../../../utilites/helpers/helpers";
import { useNavigate } from "react-router-dom";

const NavBarLeftResponsive = () => {
    const {icons, openBarMobile, setOpenBarMobile, perfilImg} = useNavBarLeft();

    const currentUser = getCurrentUser();
    const navigate = useNavigate();

    const Navigate = (route) => {
        setOpenBarMobile(false);
        navigate(route);
    };

    return(
        <section>
            <img className={css.icon_open_menu}
                src={icons.openNavBar}
                onClick={() => setOpenBarMobile(!openBarMobile)}
            />
            {openBarMobile &&
                <div className={css.container_left_bar}>
                    <div className={css.nav_container}>
                        <div>
                            <div className={css.container_avatar}>
                                <div className={css.container_img_avatar}>
                                    <img src={perfilImg} alt="" />
                                </div>
                                <span>{currentUser.name}</span>
                            </div>
                            <div className={css.menu_items}
                                onClick={() => Navigate("/home")}
                            >
                                <img src={icons.home} />
                                <span>HOME</span>
                            </div>
                            <div className={css.menu_items}
                                onClick={() => Navigate("/perfil")}
                            >
                                <img src={icons.perfil} />
                                <span>PERFIL</span>
                            </div>
                            <div className={css.menu_items}
                                onClick={() => Navigate("/perfil/pedidos")}
                            >
                                <img src={icons.order} />
                                <span>PEDIDOS</span>
                            </div>
                            <div className={css.menu_items}
                                onClick={() => Navigate("/perfil/enderecos")}
                            >
                                <img src={icons.address} />
                                <span>ENDEREÇOS</span>
                            </div>
                            <div className={css.menu_items}
                                onClick={() => Navigate("/perfil/alterar-senha")}
                            >
                                <img src={icons.changePassword} />
                                <span>ALTERAR SENHA</span>
                            </div>
                        </div>
                        
                        <div>
                            <div
                                onClick={() => Logout()}
                            >
                                <img src={icons.logout} />
                                <span>Sair</span>
                            </div>
                        </div>
                    </div>
                </div>    
            }
        </section>
    );
};

export default NavBarLeftResponsive;