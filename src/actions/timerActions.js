// Action Types
export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const TICK_TIMER = 'TICK_TIMER';
export const LOAD_TIMER_SETTINGS = 'LOAD_TIMER_SETTINGS';
export const UPDATE_TIMER = 'UPDATE_TIMER';

// Action Creators
export const startTimer = (focusTime, breakTime) => ({
  type: START_TIMER,
  focusTime,
  breakTime,
});

export const stopTimer = () => ({
  type: STOP_TIMER,
});

export const tickTimer = () => ({
  type: TICK_TIMER,
});

export const loadTimerSettings = (focusTime, breakTime) => ({
  type: LOAD_TIMER_SETTINGS,
  focusTime,
  breakTime,
});

export const updateTimer = (timerState) => ({
  type: UPDATE_TIMER,
  timerState,
});
