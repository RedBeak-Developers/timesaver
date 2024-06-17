let timerInterval;
let timerState = {
  focusTime: 25 * 60,
  breakTime: 5 * 60,
  timeLeft: 25 * 60,
  isRunning: false,
  isFocus: true,
};

const startTimer = (chrome, focusTime, breakTime, sendResponse) => {
  timerState.focusTime = focusTime * 60;
  timerState.breakTime = breakTime * 60;
  timerState.timeLeft = timerState.focusTime;
  timerState.isRunning = true;
  timerState.isFocus = true;

  if (timerInterval) {
    clearInterval(timerInterval);
  }
  timerInterval = setInterval(() => tickTimer(chrome), 1000);

  if (sendResponse) sendResponse({ status: 'Timer started' });
};

const stopTimer = (chrome, sendResponse) => {
  clearInterval(timerInterval);
  timerState.isRunning = false;

  if (sendResponse) sendResponse({ status: 'Timer stopped' });
};

const tickTimer = (chrome) => {
  if (timerState.timeLeft <= 0) {
    timerState.isFocus = !timerState.isFocus;
    timerState.timeLeft = timerState.isFocus ? timerState.focusTime : timerState.breakTime;
  } else {
    timerState.timeLeft -= 1;
  }
  chrome.storage.local.set({ timerState }, () => {
    console.log('Timer updated:', timerState);
  });
};

const getTimerState = (sendResponse) => {
  if (sendResponse) sendResponse(timerState);
};

export { startTimer, stopTimer, getTimerState, timerState };
