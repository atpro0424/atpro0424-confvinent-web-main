import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '../components/Sidebar/sidebarSlice';
import superadminSlice from '../modules/Superadmin/superadminSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    superadmin: superadminSlice,
  }
});
