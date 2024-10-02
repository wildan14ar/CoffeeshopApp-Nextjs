import { configureStore } from '@reduxjs/toolkit';
import storeReducer from '@/features/storeSlice';
import cartSlice from '@/features/cartSlice';

const store = configureStore({
  reducer: {
    store: storeReducer,
    cart: cartSlice,
  }
});

export default store;
