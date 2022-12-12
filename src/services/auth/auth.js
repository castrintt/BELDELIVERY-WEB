import { getCurrentUser, verifyExitentClient } from "../../utilites/helpers/helpers";
import { db } from "../api/firebaseConfig";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthRequiredRoutes = ({ required }) => {
    const user = getCurrentUser();

    const navigate = useNavigate();

    const validateTypeAcess = () => {
        if(user.type){
            user.type === "client" && navigate("/");
            user.type === "store" && navigate("/gerenciar");
        } else {
            navigate("/sem-autorizacao");
        };
    };

    // const authUserClient = () => {
    //     db.collection(permission.type)
    //     .doc(permission.id)
    //     .get()
    //     .then((res) => {
    //         if(res.exists === false){
    //             window.location.replace("/login")
    //         };
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
    // };

    // useEffect(() => {
    //     authUserClient();
    // }, []);

    return (
        required.includes(user.type) &&
        user.id ? <Outlet />
        : user.type === "client" ? <Navigate to="/"/>
        : user.type === "store" ? <Navigate to="/gerenciar"/>
        : <Navigate to="/sem-autorizacao"/>
    );
};

export default AuthRequiredRoutes;