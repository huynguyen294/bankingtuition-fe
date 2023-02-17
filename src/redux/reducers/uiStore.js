import { constants } from "../constants";

const {
  SET_THEME,
  SET_IS_LOGIN_BTN,
  SET_HOME_MESSAGE,
  SET_LOGIN_MESSAGE,
  SET_SENDMAIL_STATUS,
  SET_PAYMENT_STATUS,
  SET_UPDATE_PROFILE_STATUS,
  SET_BACKDROP,
} = constants;
export const initialState = {
  theme: false,
  homeMessage: "",
  loginMessage: "",
  isLoginBtn: true,
  sendMailStatus: { code: -999, message: "" },
  paymentStatus: { code: -999, message: "" },
  updateProfileStatus: { code: -999, message: "" },
  backdrop: false,
};

const uiReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_THEME:
      return { ...state, theme: payload };
    case SET_IS_LOGIN_BTN:
      return { ...state, isLoginBtn: payload };
    case SET_HOME_MESSAGE:
      return { ...state, homeMessage: payload };
    case SET_LOGIN_MESSAGE:
      return { ...state, loginMessage: payload };
    case SET_SENDMAIL_STATUS:
      return { ...state, sendMailStatus: { ...payload } };
    case SET_PAYMENT_STATUS:
      return { ...state, paymentStatus: { ...payload } };
    case SET_UPDATE_PROFILE_STATUS:
      return { ...state, updateProfileStatus: { ...payload } };
    case SET_BACKDROP:
      return { ...state, backdrop: payload };
    default:
      return state;
  }
};

export default uiReducer;
