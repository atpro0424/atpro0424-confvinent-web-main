import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '../components/Sidebar/sidebarSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
  }
});
