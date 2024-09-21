// store/slices/orderSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Order } from '@/types';

// Define the initial state of the order
interface OrderState {
  currentOrder: Order | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
}

const initialState: OrderState = {
  currentOrder: null,
  status: 'idle',
  error: null,
};

// Asynchronous thunk action to create an order by calling the API
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (cartItems: any[], thunkAPI) => {
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems, storeId: 1, paymentMethod: 'credit_card', address: '123 Main St' }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const order = await response.json();
      return order;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice definition
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.currentOrder = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.status = 'success';
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
