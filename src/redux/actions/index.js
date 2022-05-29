import axios from 'axios';
import { constants } from '../constants';
import {
  loginApi,
  profileApi,
  lichSuGiaoDichApi,
  getHocPhiInfoApi,
} from '../../api';

const {
  SET_THEME,
  SET_IS_LOGIN_BTN,
  SET_IS_LOGIN,
  SET_USER,
  SET_ACCEPT,
  SET_PAYMENT_INFO,
  SET_LOGIN_MESSAGE,
  SET_LSGD_LIST,
  SET_HOC_PHI_LIST,
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
          dispatch({ type: SET_USER, payload: result.data });
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

export const fetchProfile = (mssv) => (dispatch) => {
  console.log('ddddd');
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

export const fetchLsgd = (mssv) => (dispatch) => {
  axios
    .get(lichSuGiaoDichApi + `?mssv=${mssv}`)
    .then((res) => res.data)
    .then((result) => dispatch({ type: SET_LSGD_LIST, payload: result.data }))
    .catch((err) => {
      if (err.response.data.code === 1) {
        console.log('Get user failed');
      }
    });
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
