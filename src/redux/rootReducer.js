import { combineReducers } from 'redux';
import sidebarReducer from './sidebar/sidebarReducer';

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
});

export default rootReducer;
