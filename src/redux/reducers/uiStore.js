import { constants } from '../constants';

const {
  SET_THEME,
  SET_IS_LOGIN_BTN,
  SET_HOME_ACCEPT_RULE,
  SET_HOME_MESSAGE,
  SET_LOGIN_MESSAGE,
} = constants;
export const initialState = {
  theme: false,
  homeAcceptRule: false,
  homeMessage: '',
  loginMessage: '',
  isLoginBtn: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_THEME:
      return { ...state, theme: payload };
    case SET_IS_LOGIN_BTN:
      return { ...state, isLoginBtn: payload };
    case SET_HOME_ACCEPT_RULE:
      return { ...state, homeAcceptRule: payload };
    case SET_HOME_MESSAGE:
      return { ...state, homeMessage: payload };
    case SET_LOGIN_MESSAGE:
      return { ...state, loginMessage: payload };
    default:
      return state;
  }
};
