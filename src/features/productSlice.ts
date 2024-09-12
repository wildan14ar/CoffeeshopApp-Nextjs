import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk untuk fetch produk dari API
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch('/api/products');
    const data = await response.json();
    return data;
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            });
    }
});

export default productSlice.reducer;
