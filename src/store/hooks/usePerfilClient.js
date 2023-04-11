import { useContext } from "react";
import { PerfilClientContext } from "../contexts/PerfilClientContext";

export const usePerfilClient = () => useContext(PerfilClientContext);