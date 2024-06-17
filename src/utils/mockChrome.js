import { startTimer, stopTimer, getTimerState } from './timerLogic';

class MockChromeStorage {
  constructor() {
    this.storage = JSON.parse(localStorage.getItem('mockChromeStorage')) || {};
  }

  get(keys, callback) {
    const result = {};
    if (Array.isArray(keys)) {
      keys.forEach((key) => {
        result[key] = this.storage[key] || null;
      });
    } else {
      Object.keys(keys).forEach((key) => {
        result[key] = this.storage[key] || keys[key];
      });
    }
    callback(result);
  }

  set(items, callback) {
    Object.keys(items).forEach((key) => {
      this.storage[key] = items[key];
    });
    localStorage.setItem('mockChromeStorage', JSON.stringify(this.storage));
    if (callback) callback();
  }

  clear(callback) {
    this.storage = {};
    localStorage.removeItem('mockChromeStorage');
    if (callback) callback();
  }
}

class MockChromeRuntime {
  constructor() {
    this.listeners = [];
  }

  sendMessage(message, callback) {
    this.listeners.forEach((listener) => {
      listener(message, null, callback);
    });
  }

  onMessage = {
    addListener: (callback) => {
      this.listeners.push(callback);
    },
  };
}

const mockChromeStorage = new MockChromeStorage();
const mockChromeRuntime = new MockChromeRuntime();

const mockChrome = {
  storage: {
    local: mockChromeStorage,
    sync: mockChromeStorage,
  },
  runtime: mockChromeRuntime,
};

mockChrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startFocus') {
    startTimer(mockChrome, request.focusTime, request.breakTime, sendResponse);
  } else if (request.action === 'stopFocus') {
    stopTimer(mockChrome, sendResponse);
  } else if (request.action === 'getTimerState') {
    getTimerState(sendResponse);
  }
});

export default mockChrome;
