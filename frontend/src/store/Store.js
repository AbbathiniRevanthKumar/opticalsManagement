import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productChangeReducer from "./slices/productSlice";
const Store = configureStore({
    reducer : {
        auth : authReducer,
        productChange : productChangeReducer,
    }
});

export default Store;