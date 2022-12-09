import { useState, createContext, useEffect } from "react";
import { getCurrentUser } from "../../utilites/helpers/helpers";
import { db } from "../api/firebaseConfig";
import firebase from "firebase/app";
import "firebase/storage";

export const PerfilClientContext = createContext();

export const PerfilClientContextProvider = ({ children }) => {
 

  return (
    <PerfilClientContext.Provider
      value={{
        
      }}
    >
      {children}
    </PerfilClientContext.Provider>
  );
};