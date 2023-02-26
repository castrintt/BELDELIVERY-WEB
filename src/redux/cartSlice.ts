import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentUser } from "../utilites/helpers/helpers";
import { useState } from "react";

//interfaces
interface CartItem {
    id: string;
    value: number;
    unidad: number;
    name: string;
    idStore: string;
}
interface CartState {
    cartItem: CartItem[];
    idStore: string | null;
    idClient: string | null;
    feerDelivery: number;
}
interface User {
    type: string | null;
    id: string | null;
    name: string | null;
}

const user : User = getCurrentUser();
const cart = () => {
    const localCart = localStorage.getItem("cart");
    if (!!localCart) {
      return JSON.parse(localCart);
    }
    return { cartItem: [] };
};

//stado inicial
const initialState: CartState = {
    cartItem: cart().cartItem,
    idStore: null,
    idClient: user.id,
    feerDelivery: 0
};

export const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
        const payload = action.payload;
        let currentCart: CartItem[] = cart().cartItem;
        currentCart.push(payload);
        if(state.idStore === null){
            state.idStore = payload.idStore;
        };
        if (payload.id === state.idStore) {
            localStorage.setItem("cart", JSON.stringify(currentCart));
            return {
                ...state,
                cartItem: [...state.cartItem, payload],
                idStore: payload.idStore
            };
        } else {
            return state;
        };
    },
    updateItem(state, action: PayloadAction<CartItem>) {
        const payload = action.payload;
        const index = state.cartItem.findIndex((item) => item.id === payload.id);
        const newCartItems = [...state.cartItem];

        if (payload.unidad !== 0) {
            newCartItems[index] = { ...newCartItems[index], unidad: payload.unidad};
        }
        else {
            newCartItems.splice(index, 1);
        };
        localStorage.setItem("cart", JSON.stringify(newCartItems));
        return { ...state, cartItem: newCartItems };
    },
    deleteItem(state, action: PayloadAction<CartItem>) {
        const payload = action.payload;
        const index = state.cartItem.findIndex((item) => item.id === payload.id);
        if (index !== -1) {
            const newCartItems = [...state.cartItem];
            newCartItems.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(newCartItems));
            return { ...state, cartItem: newCartItems };
        } else {
            return state;
        }
    },
    cleanCart(state) {
        localStorage.removeItem("cart");
        return { ...state, cartItem: [], idStore: ""};
    }
  }
});

export const { addItem, updateItem, deleteItem, cleanCart } = slice.actions;

export default slice.reducer;