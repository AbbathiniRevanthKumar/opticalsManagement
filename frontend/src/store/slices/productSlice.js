import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFramesChanged: false,
  isLensChanged: false,
};

const productSlice = createSlice({
  name: "productsChange",
  initialState,
  reducers: {
    framesChanged: (state, action) => {
      state.isFramesChanged = action.payload;
    },
    lensChanged: (state, action) => {
      state.isLensChanged = action.payload;
    },
  },
});

export const { framesChanged, lensChanged } = productSlice.actions;
export default productSlice.reducer;
