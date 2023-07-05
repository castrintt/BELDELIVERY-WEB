import { configureStore } from "@reduxjs/toolkit";
import { rootReducers } from "./combineReducers";

const store = configureStore({
  reducer: rootReducers,
});

export default store;
