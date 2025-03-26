import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: JSON.parse(localStorage.getItem("productCart")) || [],
  count: JSON.parse(localStorage.getItem("productCart"))?.length || 0,
};

const productCartSlice = createSlice({
  name: "productCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const currentCart = [...state.cartProducts];
      const newItem = action.payload;
      //if it already there increase the qty
      const isItemExists = currentCart.findIndex(
        (item) => item.code === newItem.code
      );
      if (isItemExists >= 0) {
        currentCart[isItemExists].qty = Number(currentCart[isItemExists].qty) +  Number(newItem.qty);
        //dont increase the count
        state.cartProducts = currentCart;
        localStorage.setItem("productCart", JSON.stringify(currentCart));
        return;
      }
      //if it is new add newly //increase the count by 1
      currentCart.push(newItem);
      state.cartProducts = currentCart;
      state.count = currentCart.length;
      localStorage.setItem("productCart", JSON.stringify(currentCart));
    },
    removeFromCart: (state, action) => {
      const currentCart = state.cartProducts.filter(
        (item) => item.code !== action.payload.code
      );
      state.count = currentCart.length;
      state.cartProducts = currentCart;
      localStorage.setItem("productCart", JSON.stringify(currentCart));
      return;
    },
    changeItemInCart: (state, action) => {
      const currentCart = [...state.cartProducts];
      //find the item if present change the quantity or else return;
      const editableItem = action.payload;
      const itemIndex = currentCart.findIndex(
        (item) => item.code === editableItem.code
      );
      if (itemIndex >= 0) {
        currentCart[itemIndex].qty = editableItem.qty;
      }
      state.cartProducts = currentCart;
      localStorage.setItem("productCart", JSON.stringify(currentCart));
    },
  },
});

export const { addToCart, removeFromCart, changeItemInCart } =
  productCartSlice.actions;
export default productCartSlice.reducer;
