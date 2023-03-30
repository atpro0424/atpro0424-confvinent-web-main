import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collapsed: false,
  selectedItem: '1',
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSideBar: (state, action) => {
      state.collapsed = action.payload;
    },
    selectItem: (state, action) => {
      state.selectedItem = action.payload;
    }
  },
});

export const { toggleSideBar, selectItem } = sidebarSlice.actions;

export const sidebarSelector = state => {
  const { collapsed, selectedItem } = state.sidebar;
  return {
    selectedItem,
    collapsed
  };
};

export const keySelector = state => {
  const { selectItem } = state.sidebar;
  return {
    selectItem,
  };
}

export default sidebarSlice.reducer;
