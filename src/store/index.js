import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import tabReducer from '../slices/tabSlice';
import websitesReducer from '../slices/websiteSlice';
import timerReducer from '../slices/timerSlice';

const store = configureStore({
  reducer: {
    tab: tabReducer,
    websites: websitesReducer,
    timer: timerReducer,
    //more reducers here
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});


export default store;
