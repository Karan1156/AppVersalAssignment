// redux/sidebarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        activeTab: 'home',
    },
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },
    },
});

export const { setActiveTab } = sidebarSlice.actions;
export default sidebarSlice.reducer;