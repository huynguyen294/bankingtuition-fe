import { constants } from "../constants";

const {
  SET_USER,
  SET_IS_LOGIN,
  SET_PAYMENT_INFO,
  SET_LSGD_LIST,
  SET_HOC_PHI_LIST,
} = constants;
export const initialState = {
  user: {},
  isLogin: false,
  paymentInfo: {},
  lsgdList: [],
  hocphiList: [],
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return { ...state, user: { ...payload } };
    case SET_IS_LOGIN:
      return { ...state, isLogin: payload };
    case SET_PAYMENT_INFO:
      return { ...state, paymentInfo: { ...payload } };
    case SET_LSGD_LIST:
      return { ...state, lsgdList: payload };
    case SET_HOC_PHI_LIST:
      return { ...state, hocphiList: payload };
    default:
      return state;
  }
};

export default userReducer;
