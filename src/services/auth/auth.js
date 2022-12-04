import { getCurrentUser } from "../../utilites/helpers/helpers";
import { db } from "../api/firebaseConfig";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

const AuthRequiredRoutes = ({ required }) => {
    const permission = getCurrentUser();

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
        required.includes(permission.type) &&
            permission.id ? <Outlet />
            : <Navigate to="/sem-autorizacao" />
    );
};

export default AuthRequiredRoutes;