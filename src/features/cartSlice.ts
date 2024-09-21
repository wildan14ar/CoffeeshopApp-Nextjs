import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch cart items
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('/api/cart');
    if (!response.ok) {
      const error = await response.json();
      return rejectWithValue(error);
    }
    return await response.json(); // Payload will include cartItems and other objects
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Add item to cart
export const addToCart = createAsyncThunk('cart/addToCart', async (cartItem, { rejectWithValue }) => {
  try {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartItem),
    });
    if (!response.ok) {
      const error = await response.json();
      return rejectWithValue(error);
    }
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Update cart item
export const updateCartItem = createAsyncThunk('cart/updateCartItem', async (cartItem, { rejectWithValue }) => {
  try {
    const response = await fetch('/api/cart', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartItem),
    });
    if (!response.ok) {
      const error = await response.json();
      return rejectWithValue(error);
    }
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Delete cart item
export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch('/api/cart', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      const error = await response.json();
      return rejectWithValue(error);
    }
    return { id }; // Mengembalikan ID item yang dihapus
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        // Store the cartItems array in state.items
        state.items = action.payload.cartItems || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Item to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload); // Append new cart item
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Cart Item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload; // Replace updated item
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Cart Item
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        // Filter out the deleted item from the state
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
