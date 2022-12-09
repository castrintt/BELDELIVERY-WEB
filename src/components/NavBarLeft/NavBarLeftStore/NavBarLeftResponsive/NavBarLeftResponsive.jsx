import css from "./NavBarLeftResponsive.module.css";
import {useNavBarLeft} from "../../../../services/hooks/useNavBarLeft";
import {Logout, getCurrentUser} from "../../../../utilites/helpers/helpers";
import { useNavigate } from "react-router-dom";

const NavBarLeftResponsive = () => {
    const {icons, openBar, setOpenBar, perfilImg} = useNavBarLeft();

    const currentUser = getCurrentUser();
    const navigate = useNavigate();

    return(
        <>
            {openBar &&
                <div className={css.container_left_bar}>
                    <div className={css.nav_container}>
                        <div onClick={() => setOpenBar(false)}>
                            <div className={css.container_avatar}>
                                <div className={css.container_img_avatar}>
                                    <img src={perfilImg} alt="" />
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
                                onClick={() => navigate("/gerenciar-loja")}
                            >
                                <img src={icons.perfil} />
                                <span>PERFIL</span>
                            </div>
                            <div className={css.menu_items}
                                onClick={() => navigate("/gerenciar-loja/pedidos")}
                            >
                                <img src={icons.order} />
                                <span>PEDIDOS</span>
                            </div>
                            <div className={css.menu_items}
                                onClick={() => navigate("/gerenciar-loja/enderecos")}
                            >
                                <img src={icons.address} />
                                <span>ENDEREÇOS</span>
                            </div>
                            <div className={css.menu_items}
                                onClick={() => navigate("/gerenciar-loja/alterar-senha")}
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
            }
        </>
    );
};

export default NavBarLeftResponsive;