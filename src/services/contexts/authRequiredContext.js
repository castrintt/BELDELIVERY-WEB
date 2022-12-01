import { useState, useEffect, createContext } from "react";
import { getCurrentUser } from "../../utilites/helpers/helpers";
import { db } from "../api/firebaseConfig";

export const authRequiredContext = createContext();

export const AuthRequiredContextProvider = ({ children }) => {
  const [authValue, setAuthValue] = useState();

    const permission = getCurrentUser();

    const authUserClient = () => {
      db.collection(permission.type)
      .doc(permission.id)
      .get()
      .then((res) => {
        console.log(res);
       
      })
      .catch(error => {
          console.log(error);
      })
      .finally(() => {
        // if(!response) {
        //   window.location.replace("/sem-autorizacao")
        // }
      })
    };

    useEffect(() => {
      authUserClient();
    }, []);

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