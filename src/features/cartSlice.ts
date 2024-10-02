import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload.cartItems;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { setCart, addItem } = cartSlice.actions;
export default cartSlice.reducer;
