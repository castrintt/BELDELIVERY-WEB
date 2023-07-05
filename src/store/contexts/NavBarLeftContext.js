import { useState, createContext } from "react";
import AnonimoImg from "../../utils/img/anonimo.png";
import "firebase/storage";
import { icons } from "../../utils/helpers/helpers";

export const NavBarLeftContext = createContext();

export const NavBarLeftContextProvider = ({ children }) => {
  const [openBar, setOpenBar] = useState(true);
  const [openBarMobile, setOpenBarMobile] = useState(false);
  const [perfilImg, setPerfilImg] = useState(AnonimoImg);

  return (
    <NavBarLeftContext.Provider
      value={{
        openBar,
        setOpenBar,
        icons,
        perfilImg,
        setPerfilImg,
        setOpenBarMobile,
        openBarMobile,
      }}
    >
      {children}
    </NavBarLeftContext.Provider>
  );
};
