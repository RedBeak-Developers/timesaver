import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/index';
import { loadWebsites } from '../actions';

const store = configureStore({
  reducer: rootReducer,
});


// Load websites from chrome.storage on startup
if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
  chrome.storage.sync.get(['websites'], (result) => {
    if (result.websites) {
      console.log('Websites loaded from storage:', result.websites);
      store.dispatch(loadWebsites(result.websites));
    } else {
      console.log('No websites found in storage.');
    }
  });
} else {
  console.log('Chrome storage is not available.');
}

// Save websites to chrome.storage whenever they change
store.subscribe(() => {
  const state = store.getState();
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
    console.log('Saving websites to storage:', state.websites.websites);
    chrome.storage.sync.set({ websites: state.websites.websites });
  } else {
    console.log('Chrome storage is not available.');
  }
});

export default store;