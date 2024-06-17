import { combineReducers } from 'redux';
import tabReducer from './tabReducer';
import websitesReducer from './websiteReducer';
import timerReducer from './timerReducer';
//reducers take an action and return a new state of the app
//this file specifically takes every reducer and combines them into one reducer for the root

const rootReducer = combineReducers({
  tab: tabReducer,
  websites: websitesReducer,
  timer: timerReducer,
  //continue adding reducers here
  
});

export default rootReducer;
