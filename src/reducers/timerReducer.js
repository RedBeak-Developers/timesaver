import { START_TIMER, STOP_TIMER, TICK_TIMER, LOAD_TIMER_SETTINGS, SET_TIMER_SETTINGS } from '../actions/timerActions';

const initialState = {
  focusTime: 25 * 60,
  breakTime: 5 * 60,
  timeLeft: 25 * 60,
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
      }
      return {
        ...state,
        timeLeft: state.timeLeft - 1,
      };
    case LOAD_TIMER_SETTINGS:
      return {
        ...state,
        focusTime: action.focusTime,
        breakTime: action.breakTime,
        timeLeft: action.focusTime,
      };
    case SET_TIMER_SETTINGS:
      return {
        ...state,
        focusTime: action.focusTime,
        breakTime: action.breakTime,
      };
    default:
      return state;
  }
};

export default timerReducer;
