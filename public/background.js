import { startTimer, stopTimer, getTimerState } from './utils/timerLogic';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startFocus') {
    startTimer(chrome, request.focusTime, request.breakTime, sendResponse);
  } else if (request.action === 'stopFocus') {
    stopTimer(chrome, sendResponse);
  } else if (request.action === 'getTimerState') {
    getTimerState(sendResponse);
  }
});
