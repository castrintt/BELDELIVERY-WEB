import { getCurrentUser } from "../../utils/helpers/helpers";
import { Navigate, Outlet } from "react-router-dom";

const AuthRequiredRoutes = ({ required }) => {
  const user = getCurrentUser();
  const navigateUserType = {
    client: <Navigate to="/" />,
    store: <Navigate to="/gerenciar" />,
  };
  if (required.includes(user.type) && user.id) {
    return <Outlet />;
  }
  return navigateUserType[user.type] ?? <Navigate to="/login" />;
};

export default AuthRequiredRoutes;

// import { useEffect } from "react";
// import { getCurrentUser } from "../../utils/helpers/helpers";
// import { Navigate, Outlet } from "react-router-dom";
// import { db } from "../../config/api/firebaseConfig";

// const AuthRequiredRoutes = ({ required }) => {
//     const user = getCurrentUser();

//     const getAuthorization = async () => {
//         await db.collection("client")
//         .doc(user.id)
//         .get()
//         .then((res) => {
//            return true;
//         })
//         .catch(error => {
//             return false;
//         });
//     };

//     const rediretionRouteByUserType = () => {
//         if(user.type === "client"){
//             return <Navigate to="/"/>;
//         } else if(user.type === "store"){
//             <Navigate to="/gerenciar"/>
//         };
//     };

//     const authorization = () => {
//         if(required.includes(user.type) && !!user.id){
//             if(getAuthorization()){
//                 <Outlet />;
//             } else{
//                 <Navigate to="/login"/>
//             };
//         } else{
//             return <Outlet />;
//         };
//     };

//     useEffect(() => {
//         authorization();
//     }, [user.type, user.id]);

//     return (
//         rediretionRouteByUserType()
//     );
// };

// export default AuthRequiredRoutes;
