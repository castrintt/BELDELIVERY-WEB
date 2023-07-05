import { combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";

export const rootReducers = combineReducers({
  cartSlice,
});
