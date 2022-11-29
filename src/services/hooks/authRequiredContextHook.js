import { useContext } from "react";
import { authRequiredContext } from "../contexts/authRequiredContext";

export const useAuthRequired = () => useContext(authRequiredContext);