// features/timer/timerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  focusTime: 25 * 60, // in seconds
  breakTime: 5 * 60,  // in seconds
  timeLeft: 25 * 60,  // in seconds
  typeRunning: 0, // 0 is focusTime, 1 is breakTime
  isRunning: 0, // 0 is not running, 1 is running, 2 is paused
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    changeTimerSettings(state, action) {
      const { focusTime, breakTime } = action.payload;
      state.focusTime = focusTime;
      state.breakTime = breakTime;
      state.timeLeft = focusTime;
    },
    updateTimer(state, action) {
      const { timerState } = action.payload;
      state.focusTime = timerState.focusTime;
      state.breakTime = timerState.breakTime;
      state.timeLeft = timerState.timeLeft;
      state.typeRunning = timerState.typeRunning;
      state.isRunning = timerState.isRunning;
    },
    startTimer(state, action) {
      const { focusTime, breakTime } = action.payload;
      state.focusTime = focusTime;
      state.breakTime = breakTime;
      state.timeLeft = focusTime;
      state.typeRunning = 0;
      state.isRunning = 1;
    },
    stopTimer(state) {
      state.isRunning = 0;
    },
    pauseTimer(state) {
      state.isRunning = 2;
    },
    resumeTimer(state) {
      state.isRunning = 1;
    },
    tickTimer(state) {
      //
      if (state.isRunning === 1) {
        if (state.timeLeft > 0) {
          state.timeLeft -= 1;
        } 
        else if (state.typeRunning === 0) {
          state.typeRunning = 1;
          state.timeLeft = state.breakTime;
        } 
        else {
          state.typeRunning = 0;
          state.timeLeft = state.breakTime;
        }
      }
    },
  },
});

export const {
  changeTimerSettings,
  updateTimer,
  startTimer,
  stopTimer,
  pauseTimer,
  resumeTimer,
  tickTimer,
} = timerSlice.actions;

export default timerSlice.reducer;
