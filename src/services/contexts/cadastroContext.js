import { useState, createContext } from "react";

export const cadastroContext = createContext();

export const cadastroContextProvider = ({ children }) => {
  const [allDocumentsWithImages, setAllDocumentsWithImages] = useState([]);

  return (
    <cadastroContext.Provider
      value={{
        allDocumentsWithImages,
        setAllDocumentsWithImages
    }}
    >
      {children}
    </cadastroContext.Provider>
  );
};