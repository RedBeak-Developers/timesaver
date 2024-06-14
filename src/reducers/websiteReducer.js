import { ADD_WEBSITE, REMOVE_WEBSITE, LOAD_WEBSITES } from '../actions';

const initialState = {
  websites: [],
};

const websitesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WEBSITE:
      return {
        ...state,
        websites: [...state.websites, action.payload],
      };
    case REMOVE_WEBSITE:
      return {
        ...state,
        websites: state.websites.filter((website) => website !== action.payload),
      };
    case LOAD_WEBSITES:
      return {
        ...state,
        websites: action.payload,
      };
    default:
      return state;
  }
};

export default websitesReducer;
