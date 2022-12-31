import cartActionType from "./action-types";

export const AddProductToCart = (payload) => ({
    type: cartActionType.ADDPRODUCT,
    payload
});

// export const Logout = () => ({
//     type: cartActionType.LOGOUT
// });