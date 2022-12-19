import { getCurrentUser } from "../../utilites/helpers/helpers";
import { Navigate, Outlet } from "react-router-dom";

const AuthRequiredRoutes = ({ required }) => {
    const user = getCurrentUser();

    return (
        required.includes(user.type) &&
        user.id ? <Outlet />
        : user.type === "client" ? <Navigate to="/"/>
        : user.type === "store" ? <Navigate to="/gerenciar"/>
        : <Navigate to="/sem-autorizacao"/>
    );
};

export default AuthRequiredRoutes;