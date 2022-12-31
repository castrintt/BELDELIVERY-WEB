import cartActionType from "./action-types";

const initialStates = {
    idStore: null,
    products: [],
    totalValue: 0
};

const cartReducer = (state = initialStates, action) => {
    if(action.type === cartActionType.ADDPRODUCT){

        return {...initialStates, products: [...initialStates.products, action.payload]};
    }

    return state;
};

export default cartReducer;