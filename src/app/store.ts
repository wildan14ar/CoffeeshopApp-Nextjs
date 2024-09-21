import { configureStore } from '@reduxjs/toolkit';
import productReducer from '@/features/productSlice';
import orderReducer from '@/features/orderSlice';
import cartReducer from '@/features/cartSlice';
import websocketReducer from '@/features/websocketSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    orders: orderReducer,
    cart: cartReducer,
    websocket: websocketReducer,
  }
});

export default store;
