// store/slices/websocketSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface WebSocketState {
    connected: boolean;
}

const initialState: WebSocketState = {
    connected: false,
};

const websocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        setConnected: (state, action) => {
            state.connected = action.payload;
        },
    },
});

export const { setConnected } = websocketSlice.actions;
export default websocketSlice.reducer;
