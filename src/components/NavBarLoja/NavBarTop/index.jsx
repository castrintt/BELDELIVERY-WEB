import css from "./styled.module.css";
import logo from "../../../utils/img/delivery-logo.png";
import { useNavigate } from "react-router-dom";
import CarrinhoModal from "../../CarrinhoModal";
import { useState } from "react";
import { NavDropdown } from "react-bootstrap";

const NavBarTop = () => {
    const [openModalCarrinho,  setOpenModalCarrinho] = useState(false);
    const navigate = useNavigate();

    const ItensDropDownCategorie = ["Hambugueria", "Sorveteria", "Bar"];

    return(
        <>
            <CarrinhoModal openModalProps={openModalCarrinho}/>
            <div className={css.container_nav_bar}>
                <nav className={css.content_nav_bar}>
                    <div className={css.container_logo}>
                        <img onClick={() => navigate("/home")} src={logo} alt="logo-site" />
                    </div>
                    <div className={css.container_menu}>
                    </div>
                    <div className={css.container_input}>
                        <img src="https://img.icons8.com/ios-filled/30/000000/search--v1.png"/>
                        <input type="text" placeholder="Pesquisar"/>
                    </div>
                    <div className={css.container_icons}>
                        <div
                            className={css.container_carrinho}
                            onClick={() => setOpenModalCarrinho(!openModalCarrinho)}
                        >
                            <img src="https://img.icons8.com/small/30/000000/shopping-cart.png"/>
                            <div>
                                <span>R$ 00,00</span>
                                <span>Itens: 0</span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default NavBarTop;