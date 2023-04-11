import { useContext } from "react";
import {NavBarLeftContext} from "../contexts/NavBarLeftContext";

export const useNavBarLeft = () => useContext(NavBarLeftContext);