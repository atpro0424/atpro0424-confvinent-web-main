import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collapsed: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSideBar: (state, action) => {
      state.collapsed = action.payload;
    }
  },
});

export const { toggleSideBar, selectItem } = sidebarSlice.actions;

export const sidebarSelector = state => {
  const { collapsed } = state.sidebar;
  return {
    collapsed
  };
};

export default sidebarSlice.reducer;
