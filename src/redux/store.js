import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '../components/Sidebar/sidebarSlice';
import superadminSlice from '../modules/Superadmin/superadminSlice';
import conferenceSlice from '../modules/Conferences/conferenceSlice';
import settingsSlice from '../modules/Settings/settingsSlice';
import submissionsSlice from '../modules/Submissions/submissionsSlice';
import reviewsSlices from '../modules/Reviews/reviewsSlices';
import rootSlice from './rootSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    superadmin: superadminSlice,
    conference: conferenceSlice,
    settings: settingsSlice,
    submissions: submissionsSlice,
    reviews: reviewsSlices,
    root: rootSlice,
  }
});
