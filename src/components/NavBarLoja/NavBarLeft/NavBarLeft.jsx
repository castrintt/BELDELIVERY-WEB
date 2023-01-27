import { useEffect } from "react";
import css from "./styled.module.css";
import { getCurrentUser, Logout} from "../../../utilites/helpers/helpers";
import { useNavigate } from "react-router-dom";
import {useNavBarLeft} from "../../../services/hooks/useNavBarLeft";
import NavBarLeftResponsive from "./NavBarLeftResponsive/NavBarLeftResponsive";
import firebase from "firebase/app";
import "firebase/storage";
import AnonimoImg from "../../../utilites/img/anonimo.png";

const NavBarLeft = () => {
    const {icons, openBar, setPerfilImg, perfilImg, setOpenBar} = useNavBarLeft();

    const currentUser = getCurrentUser();
    const navigate = useNavigate();
    
    const getImagePerfil = () => {
        const storageRef = firebase.storage().ref();

        storageRef.child("user/").listAll()
        .then((res) => {
            let userId = res.items.find(x => x.name === currentUser.id);
            if(userId){
                userId.getDownloadURL()
                .then((img) => {
                    setPerfilImg(img);
                })
            } else setPerfilImg(AnonimoImg);
        });
    };

    useEffect(() => {
        getImagePerfil();
    }, []);

    return (
        <>
            <img className={css.icon_open_menu}
                src={icons.openNavBar}
                onClick={() => setOpenBar(!openBar)}
            />
            {openBar ? (
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
                            onClick={() => navigate("/gerenciar")}
                        >
                            <img src={icons.perfil} />
                            <span>GERENCIAR</span>
                        </div>
                        <div className={css.menu_items}
                            onClick={() => navigate("/gerenciar/produtos")}
                        >
                            <img src={icons.order} />
                            <span>MEUS PRODUTOS</span>
                        </div>
                        <div className={css.menu_items}
                            onClick={() => navigate("/gerenciar/pedidos")}
                        >
                            <img src={icons.order} />
                            <span>PEDIDOS</span>
                        </div>
                        {/* <div className={css.menu_items}
                            onClick={() => navigate("/gerenciar/endereco")}
                        >
                            <img src={icons.address} />
                            <span>ENDEREÇOS</span>
                        </div> */}
                        <div className={css.menu_items}
                            onClick={() => navigate("/gerenciar/alterar-senha")}
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
                                <img src={perfilImg} alt="" />
                            </div>
                        </div>
                        <div className={css.menu_items_hidde}
                            onClick={() => navigate("/gerenciar")}
                        >
                            <img src={icons.perfil} />
                        </div>
                        <div className={css.menu_items_hidde}
                            onClick={() => navigate("/gerenciar/pedidos")}
                        >
                            <img src={icons.order} />
                        </div>
                        <div className={css.menu_items_hidde}
                            onClick={() => navigate("/gerenciar/pedidos")}
                        >
                            <img src={icons.order} />
                        </div>
                        <div className={css.menu_items_hidde}
                            onClick={() => navigate("/gerenciar/alterar-senha")}
                        >
                            <img src={icons.changePassword} />
                        </div>
                        {/* <div className={css.menu_items_hidde}
                            onClick={() => navigate("/gerenciar/endereco")}
                        >
                            <img src={icons.address} />
                        </div> */}
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

export default NavBarLeft;