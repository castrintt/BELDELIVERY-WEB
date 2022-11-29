import { useState, useEffect, createContext } from "react";
import { getCurrentUser } from "../../utilites/helpers/helpers";
import { db } from "../api/firebaseConfig";

export const authRequiredContext = createContext();

export const AuthRequiredContextProvider = ({ children }) => {
  const [authValue, setAuthValue] = useState();

    // const permission = getCurrentUser();

    // const authUserClient = () => {
    //   let response;
    //   db.collection(permission.type)
    //   .get()
    //   .then((res) => {
    //     console.log(res.docs);
    //     res.docs.map(doc => {
    //       if(doc.id === permission.id) {
    //         response = true;
    //         console.log("foi")
    //       } else {
    //           if(response !== true){
    //             response = false;
    //           }
    //       };
    //     })
    //   })
    //   .catch(error => {
    //       console.log(error);
    //   })
    //   .finally(() => {
    //     if(!response) {
    //       window.location.replace("/sem-autorizacao")
    //     }
    //   })
    // };

    // useEffect(() => {
    //   authUserClient();
    // }, []);

  return (
    <authRequiredContext.Provider
      value={{
        authValue
    }}
    >
      {children}
    </authRequiredContext.Provider>
  );
};