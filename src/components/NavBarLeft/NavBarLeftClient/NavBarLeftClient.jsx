import css from "../styled.module.css";
import { useEffect } from "react";
import { getCurrentUser, Logout } from "../../../utilites/helpers/helpers";
import { useNavigate } from "react-router-dom";
import NavBarLeftResponsive from "./NavBarLeftResponsive/NavBarLeftResponsive";
import {useNavBarLeft} from "../../../services/hooks/useNavBarLeft";
import firebase from "firebase/app";
import "firebase/storage";
import AnonimoImg from "../../../utilites/img/anonimo.png";

const NavBarLeftClient = () => {
    const {icons, openBar, perfilImg, setPerfilImg} = useNavBarLeft();

    const currentUser = getCurrentUser();
    const navigate = useNavigate();

    const getImagePerfil = () => {
        const storageRef = firebase.storage().ref();

        storageRef.child("user/").listAll()
        .then((res) => {
            res.items.map(item => {
                if(item.name === currentUser.id){
                    item.getDownloadURL()
                    .then((img) => {
                    setPerfilImg(img);
                    })
                }
            })
        })
        .finally(() => {
            if(!perfilImg){
                setPerfilImg(AnonimoImg);
            }
        })
    };

    useEffect(() => {
        getImagePerfil();
    }, [])

    return (
        <>
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
                                <img src={perfilImg} alt="" />
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