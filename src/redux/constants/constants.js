export const SET_THEME = 'SET_THEME';
export const SET_IS_LOGIN_BTN = 'SET_IS_LOGIN_BTN';
export const SET_IS_LOGIN = 'SET_IS_LOGIN';
export const SET_USER = 'SET_USER';
export const SET_HOME_ACCEPT_RULE = 'SET_HOME_ACCEPT_RULE';
export const SET_HOME_MESSAGE = 'SET_HOME_MESSAGE';
export const SET_LOGIN_MESSAGE = 'SET_LOGIN_MESSAGE';
export const SET_PAYMENT_INFO = 'SET_PAYMENT_INFO';
export const SET_LSGD_LIST = 'SET_LSGD_LIST';
export const SET_HOC_PHI_LIST = 'SET_HOC_PHI_LIST';
export const USER_LOGION = 'USER_LOGION';

export const FORMAT_MONEY = (string) =>
  string.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'vnđ';
