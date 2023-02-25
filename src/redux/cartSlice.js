import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "cart",
    initialState: {
        cartItem: [{
            id: 1,
            value: 20,
            unidad: 2,
            name: "fasfasfa"
        }],
        idStore: null,
        idClient: null
    },
    reducers: {
        addItem(state, {payload}) {
            // if(payload === ){
                return {...state, cartItem: (itens) => [...itens, payload]}
            // } else {
            //     return 0;
            // };
        },
        // cleanCart() {
        //     return {...state, cartItem: [], idStore: null, idClient: null}
        // },
    }
});

export const { addItem, cleanCart } = slice.actions;

// export const selectCartItem = state => state.cartItem;

export default slice.reducer;