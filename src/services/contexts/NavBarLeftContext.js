import { useState, createContext, useEffect } from "react";
import { getCurrentUser } from "../../utilites/helpers/helpers";
import firebase from "firebase/app";
import "firebase/storage";

export const NavBarLeftContext = createContext();

export const NavBarLeftContextProvider = ({ children }) => {
  const [openBar, setOpenBar] = useState(true);
  const [perfilImg, setPerfilImg] = useState();

  const currentUser = getCurrentUser();

  const icons = {
    openNavBar: "https://img.icons8.com/ios-filled/000000/menu--v1.png",
    home: "https://img.icons8.com/material-rounded/35/null/home-page.png",
    perfil:"https://img.icons8.com/small/35/000000/user-male-circle.png",
    order: "https://img.icons8.com/sf-ultralight/35/null/mobile-order.png",
    address: "https://img.icons8.com/ios/35/null/order-delivered.png",
    changePassword: "https://img.icons8.com/ios/30/null/private-lock.png",
    logout: "https://img.icons8.com/windows/40/null/exit.png"
  };
  
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
  };

  useEffect(() => {
    getImagePerfil();
  }, []);

  return (
    <NavBarLeftContext.Provider
      value={{
        openBar,
        setOpenBar,
        icons,
        perfilImg
      }}
    >
      {children}
    </NavBarLeftContext.Provider>
  );
};