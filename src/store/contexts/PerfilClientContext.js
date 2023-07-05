import { createContext } from "react";
import "firebase/storage";

export const PerfilClientContext = createContext();

export const PerfilClientContextProvider = ({ children }) => {
  return (
    <PerfilClientContext.Provider value={{}}>
      {children}
    </PerfilClientContext.Provider>
  );
};
