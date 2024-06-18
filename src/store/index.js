import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import rootReducer from '../reducers/index';
import { loadTimerSettings, updateTimer } from '../actions/timerActions';
import mockChrome from '../utils/mockChrome';

const chrome = typeof window.chrome !== 'undefined' ? window.chrome : mockChrome;

const store = configureStore({
  reducer: rootReducer,
  middleware: thunk,
});

// Load timer settings from chrome.storage on startup
chrome.storage.sync.get(['focusTime', 'breakTime'], (result) => {
  const focusTime = result.focusTime || 25;
  const breakTime = result.breakTime || 5;
  store.dispatch(loadTimerSettings(focusTime, breakTime));
});

// Subscribe to store changes to send Chrome messages
store.subscribe(() => {
  const state = store.getState();
  if (chrome.runtime && chrome.runtime.sendMessage) {
    if (state.timer.isRunning) {
      chrome.runtime.sendMessage({ action: 'startFocus', focusTime: state.timer.focusTime, breakTime: state.timer.breakTime }, (response) => {
        console.log(response.status);
      });
    } else {
      chrome.runtime.sendMessage({ action: 'stopFocus' }, (response) => {
        console.log(response.status);
      });
    }
  }
});

// Subscribe to changes in the timer state to update the UI
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateTimerState') {
    store.dispatch(updateTimer(request.timerState));
  }
});

export default store;
