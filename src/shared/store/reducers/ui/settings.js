import * as TYPE from 'consts/actionTypes';

const initialState = {
  lastActiveTab: 'App',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.SWITCH_SETTINGS_TAB:
      return {
        ...state,
        lastActiveTab: action.payload,
      };

    default:
      return state;
  }
};
