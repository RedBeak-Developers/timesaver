import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import tabReducer from '../reducers/tabReducer';
import websitesReducer from '../reducers/websiteReducer';
import timerReducer from '../reducers/timerReducer';

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
