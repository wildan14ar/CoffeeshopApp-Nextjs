import { createSlice } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  quantity: number;
}

const initialState = {
  items: [] as CartItem[],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {    
    setCart: (state, action: { payload: { cartItems: CartItem[] } }) => {
      state.items = action.payload.cartItems
    },
    addItem: (state, action: { payload: CartItem }) => {
      state.items.push(action.payload);
    },
  },
});

export const { setCart, addItem } = cartSlice.actions;
export default cartSlice.reducer;
