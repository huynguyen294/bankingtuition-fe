import { constants } from '../constants';

const { SET_THEME, SET_IS_LOGIN_BTN, SET_IS_LOGIN, SET_USER,SET_ACCEPT, SET_PAYMENT_INFO } = constants;

export const setTheme = (payload) => ({
  type: SET_THEME,
  payload,
});

export const setIsLoginBtn = (payload) => ({
  type: SET_IS_LOGIN_BTN,
  payload,
});

export const setIsLogin = (payload) => ({
  type: SET_IS_LOGIN,
  payload,
});

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const setAccept = (payload) => ({
  type: SET_ACCEPT,
  payload,
});

export const setPaymentInfo = (payload) => ({
  type: SET_PAYMENT_INFO,
  payload,
});

