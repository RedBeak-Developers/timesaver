class MockChromeStorage {
  constructor() {
    this.storage = {};
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

let timerInterval;
let timerState = {
  focusTime: 25 * 60,
  breakTime: 5 * 60,
  timeLeft: 25 * 60,
  isRunning: false,
  isFocus: true,
};

mockChromeRuntime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startTimer') {
    timerState.focusTime = request.focusTime * 60;
    timerState.breakTime = request.breakTime * 60;
    timerState.timeLeft = timerState.focusTime;
    timerState.isRunning = true;
    timerState.isFocus = true;

    startTimer();
    sendResponse({ status: 'Timer started' });
  } else if (request.action === 'stopTimer') {
    stopTimer();
    sendResponse({ status: 'Timer stopped' });
  } else if (request.action === 'getTimerState') {
    sendResponse(timerState);
  }
});

function startTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  timerInterval = setInterval(() => {
    tickTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerState.isRunning = false;
}

function tickTimer() {
  if (timerState.timeLeft <= 0) {
    timerState.isFocus = !timerState.isFocus;
    timerState.timeLeft = timerState.isFocus ? timerState.focusTime : timerState.breakTime;
  } else {
    timerState.timeLeft -= 1;
  }
  mockChrome.storage.local.set({ timerState });
}

export default mockChrome;
