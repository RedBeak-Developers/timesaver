// features/timer/timerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  focusTime: 1500, //25*60 in seconds
  breakTime: 300,  // in seconds
  timeLeft: 1500,  // in seconds
  typeRunning: 0, // 0 is focusTime, 1 is breakTime
  isRunning: 0, // 0 is not running, 1 is running, 2 is paused
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    updateTimer(state, action) {
      const { focusTime, breakTime, timeLeft, typeRunning, isRunning } = action.payload;
      state.focusTime = focusTime * 60;
      state.breakTime = breakTime * 60;
      state.timeLeft = timeLeft * 60;
      state.typeRunning = typeRunning;
      state.isRunning = isRunning;
    },
    startTimer(state) {
      state.typeRunning = 0;
      state.isRunning = 1;
    },
    stopTimer(state) {
      state.isRunning = 0;
      state.timeLeft = state.focusTime;
    },
    pauseTimer(state) {
      console.log("attempted to pause timer in ui");
      state.isRunning = 2;
    },
    resumeTimer(state) {
      state.isRunning = 1;
      console.log("attempted to resume timer in ui");
    },
    tickTimer(state) {
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
          state.timeLeft = state.focusTime;
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
