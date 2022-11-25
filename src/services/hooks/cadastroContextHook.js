import { useContext } from "react";
import { cadastroContext } from "../contexts/cadastroContext";

export const useCheckDocument = () => useContext(cadastroContext);