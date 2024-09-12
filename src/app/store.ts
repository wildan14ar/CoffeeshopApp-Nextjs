import { configureStore } from '@reduxjs/toolkit';
import productReducer from '@/features/productSlice';
import orderReducer from '@/features/orderSlice';
import userReducer from '@/features/userSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    order: orderReducer,
    user: userReducer
  }
});

export default store;
