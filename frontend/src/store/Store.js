import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productChangeReducer from "./slices/productSlice";
import productCartReducer from "./slices/productCartSlice";
const Store = configureStore({
    reducer : {
        auth : authReducer,
        productChange : productChangeReducer,
        productCart : productCartReducer,
    }
});

export default Store;