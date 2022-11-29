import { getCurrentUser } from "../../utilites/helpers/helpers";
import { db } from "../api/firebaseConfig";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRequiredRoutes = ({ required }) => {
    const permission = getCurrentUser();

    // const authVerification = () => {
    //     let authReponse = true;

    //     db.collection("client")
    //     .get()
    //     .then((res) => {
    //         res.docs.map(doc => {
    //             if(doc.id === 2424124) {
    //                 authReponse = true;
    //                 console.log("achou " + doc.id);
    //             }
    //         })
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })

    //     return authReponse;
    // };

    return (
        required.includes(permission.type) &&
            permission.id ? <Outlet />
            : <Navigate to="/sem-autorizacao" />
    );
};

export default AuthRequiredRoutes;