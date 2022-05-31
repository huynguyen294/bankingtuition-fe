import axios from 'axios';
import { constants } from '../constants';
import {
  loginApi,
  profileApi,
  lichSuGiaoDichApi,
  getHocPhiInfoApi,
  sendEmailApi,
  handlePaymentApi,
  updateUserProfileApi,
} from '../../api';

const {
  SET_THEME,
  SET_IS_LOGIN_BTN,
  SET_IS_LOGIN,
  SET_USER,
  SET_PAYMENT_INFO,
  SET_LOGIN_MESSAGE,
  SET_LSGD_LIST,
  SET_HOC_PHI_LIST,
  SET_SENDMAIL_STATUS,
  SET_PAYMENT_STATUS,
} = constants;

export const userLogin =
  ({ username, password }) =>
  (dispatch) => {
    axios
      .post(loginApi, { username, password })
      .then((res) => res.data)
      .then((result) => {
        if (result.code === 0) {
          dispatch(setIsLogin(true));
          dispatch(refreshUser(result.mssv));
        }
      })
      .catch((err) => {
        if (err.response.data.code === 1) {
          dispatch({
            type: SET_LOGIN_MESSAGE,
            payload: 'Tài khoảng hoặc mật khẩu không chính xác',
          });
        }
      });
  };

export const refreshUser = (mssv) => (dispatch) => {
  axios
    .get(profileApi + `?mssv=${mssv}`)
    .then((res) => res.data)
    .then((result) => dispatch({ type: SET_USER, payload: result.data }))
    .catch((err) => {
      if (err.response.data.code === 1) {
        console.log('Get user failed');
      }
    });
};

export const fetchUpdateUser = (newUser) => (dispatch) => {
  axios
    .post(updateUserProfileApi, newUser)
    .then((res) => res.data)
    .then(() => dispatch(refreshUser(newUser.mssv)))
    .catch((err) => {
      if (err.response.data.code === 1) {
        console.log('Update user failed');
      }
    });
};

export const fetchLsgd = (mssv) => async (dispatch) => {
  try {
    await axios
      .get(lichSuGiaoDichApi + `?mssv=${mssv}`)
      .then((res) => res.data)
      .then((result) => dispatch({ type: SET_LSGD_LIST, payload: result.data }))
      .catch((err) => {
        if (err.response.data.code === 1) {
          console.log('Get user failed');
        }
      });
  } catch (error) {
    console.log('fetch error:', error);
  }
};

export const fetchHocPhi = (mssv) => (dispatch) => {
  axios
    .get(getHocPhiInfoApi + mssv)
    .then((res) => res.data)
    .then((result) =>
      dispatch({ type: SET_HOC_PHI_LIST, payload: result.data })
    )
    .catch((err) => {
      if (err.response.data.code === 1) {
        console.log('Get tuition failed');
      }
    });
};

export const sendMail = (mssv, email) => async (dispatch) => {
  await axios
    .post(sendEmailApi, { mssv, email })
    .then((res) => res.data)
    .then((result) =>
      dispatch({
        type: SET_SENDMAIL_STATUS,
        payload: { code: result.code, message: 'send mail success' },
      })
    )
    .catch((err) => {
      if (err) {
        dispatch({
          type: SET_SENDMAIL_STATUS,
          payload: { code: -1, message: 'send mail failed' },
        });
        console.log('Get tuition failed');
      }
    });
};

export const fetchHandlePayment =
  (code, userMoney, userMssv, userMagd) => (dispatch) => {
    axios
      .post(handlePaymentApi, {
        code: code,
        userMoney: userMoney,
        userMssv: userMssv,
        userMagd: userMagd,
      })
      .then((res) => res.data)
      .then((result) => {
        if (result.code === 0) {
          dispatch(refreshUser(userMssv));
          dispatch({
            type: SET_PAYMENT_STATUS,
            payload: { code: result.code, message: 'identify success' },
          });
        }
      })
      .catch((err) => {
        if (err.err.response.data.code === -1) {
          dispatch({
            type: SET_PAYMENT_STATUS,
            payload: { code: -1, message: 'send mail failed' },
          });
          console.log('Get tuition failed');
        }
      });
  };

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

export const setLoginMessage = (payload) => ({
  type: SET_LOGIN_MESSAGE,
  payload,
});

export const setPaymentInfo = (payload) => ({
  type: SET_PAYMENT_INFO,
  payload,
});

export const setSendMailStatus = (payload) => ({
  type: SET_SENDMAIL_STATUS,
  payload,
});

export const setPaymentStatus = (payload) => ({
  type: SET_PAYMENT_STATUS,
  payload,
});
