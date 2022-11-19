// import * as css from "./styled";
import css from "./styled.module.css"
import logo from '../../utilites/img/delivery-logo.png';
import { useNavigate } from "react-router-dom";
import CarrinhoModal from "../CarrinhoModal";
import { useState } from "react";
import { NavDropdown, Dropdown } from "react-bootstrap";
import NavBarLeft from "../NavBarLeft";

const NavBarTop = () => {
    const [ openModalCarrinho,  setOpenModalCarrinho] = useState(false);
    const navigate = useNavigate();

    const ItensDropDownCategorias = ["Hambugueria", "Sorveteria", "Bar"];


    return(
        <>
            <CarrinhoModal openModalProps={openModalCarrinho}/>
            <NavBarLeft />
            <div className={css.container_nav_bar}>
                <nav className={css.content_nav_bar}>
                    <div className={css.container_logo}>
                        <img onClick={() => navigate("/home")} src={logo} alt="logo-site" />
                    </div>

                    <div className={css.container_menu}>
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="Categorias"
                            >
                            {ItensDropDownCategorias.map((item) => (
                                <NavDropdown.Item onClick={() => navigate(`/delivery/descobrir/${item}`)} key={item.length}>
                                    {item}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                    </div>

                    <div className={css.container_input}>
                        <img src="https://img.icons8.com/ios-filled/30/000000/search--v1.png"/>
                        <input type="text" placeholder="Procure uma loja"/>
                    </div>

                    <div className={css.container_icons}>
                        <div className={css.container_carrinho} onClick={() => setOpenModalCarrinho(!openModalCarrinho)}>
                            <img src="https://img.icons8.com/small/35/000000/shopping-cart.png"/>
                            <div>
                                <span>R$ 00,00</span>
                                <span>Itens: 0</span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default NavBarTop;