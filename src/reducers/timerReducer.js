import {
  START_TIMER,
  STOP_TIMER,
  TICK_TIMER,
  LOAD_TIMER_SETTINGS,
  UPDATE_TIMER,
} from '../actions/timerActions';

const initialState = {
  focusTime: 25 * 60, // in seconds
  breakTime: 5 * 60,  // in seconds
  timeLeft: 25 * 60,  // in seconds
  isRunning: false,
  isFocus: true,
};

const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_TIMER:
      return {
        ...state,
        focusTime: action.focusTime,
        breakTime: action.breakTime,
        timeLeft: action.focusTime,
        isRunning: true,
        isFocus: true,
      };
    case STOP_TIMER:
      return {
        ...state,
        isRunning: false,
      };
    case TICK_TIMER:
      if (state.timeLeft <= 0) {
        return {
          ...state,
          isFocus: !state.isFocus,
          timeLeft: state.isFocus ? state.breakTime : state.focusTime,
        };
      } else {
        return {
          ...state,
          timeLeft: state.timeLeft - 1,
        };
      }
    case LOAD_TIMER_SETTINGS:
      return {
        ...state,
        focusTime: action.focusTime,
        breakTime: action.breakTime,
        timeLeft: action.focusTime,
      };
    case UPDATE_TIMER:
      return {
        ...state,
        ...action.timerState,
      };
    default:
      return state;
  }
};

export default timerReducer;
