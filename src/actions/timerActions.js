export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const TICK_TIMER = 'TICK_TIMER';
export const LOAD_TIMER_SETTINGS = 'LOAD_TIMER_SETTINGS';
export const SET_TIMER_SETTINGS = 'SET_TIMER_SETTINGS';

export const startTimer = (focusTime, breakTime) => ({
  type: START_TIMER,
  //all times will be held as data in raw second count and then displayed as minutes
  focusTime: focusTime * 60,
  breakTime: breakTime * 60,
});

export const stopTimer = () => ({
  type: STOP_TIMER,
});

export const tickTimer = () => ({
  type: TICK_TIMER,
});

export const loadTimerSettings = (focusTime, breakTime) => ({
  type: LOAD_TIMER_SETTINGS,
  focusTime: focusTime * 60,
  breakTime: breakTime * 60,
});

export const setTimerSettings = (focusTime, breakTime) => ({
  type: SET_TIMER_SETTINGS,
  focusTime: focusTime * 60,
  breakTime: breakTime * 60,
});
