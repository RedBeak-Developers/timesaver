import { createAction } from '@reduxjs/toolkit';

//this file will only contain the visual state of the timer
//update timer visually updates the timer when the focus tab is switched

//update the timer visually when focus tab is opened
export const UPDATE_TIMER = 'UPDATE_TIMER';
//tick the timer only when focus tab is currently opened
export const TICK_TIMER = 'TICK_TIMER';
//change the timer settings in the store
export const CHANGE_TIMER_SETTINGS = 'CHANGE_TIMER_SETTINGS';
//start timer in store
export const START_TIMER = 'START_TIMER';
//stop timer in store
export const STOP_TIMER = 'STOP_TIMER';
//pause the timer
export const PAUSE_TIMER = 'PAUSE_TIMER';
//resume 
export const RESUME_TIMER = 'RESUME_TIMER';

export const updateTimer = createAction(UPDATE_TIMER, timerState => ({
  payload: { timerState }
}));

export const tickTimer = createAction(TICK_TIMER);

export const changeTimerSettings = createAction(CHANGE_TIMER_SETTINGS, timerState => ({
  payload: { timerState }
}));

export const stopTimer = createAction(STOP_TIMER);

export const pauseTimer = createAction(PAUSE_TIMER);

export const resumeTimer = createAction(RESUME_TIMER);

export const startTimer = (focusTime, breakTime) => (dispatch, getState) => {
  const state = getState();
  const actualFocusTime = focusTime || state.timer.focusTime;
  const actualBreakTime = breakTime || state.timer.breakTime;
  dispatch({
    type: START_TIMER,
    payload: { focusTime: actualFocusTime, breakTime: actualBreakTime },
  });
};
