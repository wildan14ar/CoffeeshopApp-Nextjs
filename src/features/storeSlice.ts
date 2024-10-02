import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedStoreId: null,
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setSelectedStore(state, action) {
      state.selectedStoreId = action.payload;
    },
  },
});

export const { setSelectedStore } = storeSlice.actions;
export default storeSlice.reducer;
