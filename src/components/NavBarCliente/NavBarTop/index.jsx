import css from "./styled.module.css"
import logo from '../../../utilites/img/delivery-logo.png';
import { useNavigate } from "react-router-dom";
import CarrinhoModal from "../../CarrinhoModal";
import { useState } from "react";
import { NavDropdown } from "react-bootstrap";

const NavBarTop = () => {
    const [openModalCarrinho,  setOpenModalCarrinho] = useState(false);
    const navigate = useNavigate();

    const ItensDropDownCategorie = ["Hambugueria", "Sorveteria", "Bar", "Lanchonete"];

    return(
        <>
            <CarrinhoModal openModalProps={openModalCarrinho}/>
            <div className={css.container_nav_bar}>
                <nav className={css.content_nav_bar}>
                    <div className={css.container_logo}>
                        <img onClick={() => navigate("/home")} src={logo} alt="logo-site" />
                    </div>
                    <div className={css.container_menu}>
                        <NavDropdown
                            style={{color: "#F7F7F7"}} 
                            id="nav-dropdown-dark-example"
                            title="Categorias"
                            >
                            {ItensDropDownCategorie.map((item) => (
                                <NavDropdown.Item onClick={() => navigate(`/descobrir/${item}`)} key={item.length}>
                                    {item}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
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