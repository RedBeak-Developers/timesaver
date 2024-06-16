import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/index';
import { loadTimerSettings } from '../actions/timerActions';
import mockChrome from '../utils/mockChrome';

const chrome = typeof window.chrome !== 'undefined' ? window.chrome : mockChrome;

const store = configureStore({
  reducer: rootReducer,
});

// Load timer settings from chrome.storage on startup
chrome.storage.sync.get(['focusTime', 'breakTime'], (result) => {
  const focusTime = result.focusTime || 25;
  const breakTime = result.breakTime || 5;
  store.dispatch(loadTimerSettings(focusTime, breakTime));
});

// Save timer settings to chrome.storage whenever they change
store.subscribe(() => {
  const state = store.getState();
  chrome.storage.sync.set({
    focusTime: state.timer.focusTime / 60,
    breakTime: state.timer.breakTime / 60,
  });
});

export default store;
