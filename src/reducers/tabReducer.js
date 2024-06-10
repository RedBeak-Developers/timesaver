import { SET_ACTIVE_TAB } from '../actions';

//define the initial state of the tab
const initialState = {
  activeTab: 'home',
};

//handle any actions and returns a new state with updated tabs
const tabReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };
    default:
      return state;
  }
};

export default tabReducer;
