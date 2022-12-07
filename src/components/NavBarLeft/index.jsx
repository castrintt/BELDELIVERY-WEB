import css from "./styled.module.css";
import { getCurrentUser } from "../../utilites/helpers/helpers";
import NavBarLeftClient from "./NavBarLeftClient/NavBarLeftClient";
import NavBarLeftStore from "./NavBarLeftStore/NavBarLeftStore";
import {useNavBarLeft} from "../../services/hooks/useNavBarLeft";

const NavBarLeft = () => {
    const {icons, openBar, setOpenBar} = useNavBarLeft();

    const currentUser = getCurrentUser();

    return (
        <>
            <img className={css.icon_open_menu}
                src={icons.openNavBar}
                onClick={() => setOpenBar(!openBar)}
            />
            {currentUser.type === "client" 
                ? <NavBarLeftClient />
                : <NavBarLeftStore />
            }
        </>
    )
}

export default NavBarLeft;