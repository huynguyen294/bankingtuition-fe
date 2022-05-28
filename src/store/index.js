import { configureStore } from '@reduxjs/toolkit';
import { themeReducer, isLoginBtnReducer, isLoginReducer, userReducer, acceptReducer, paymentInfoReducer } from '../reducer';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    isLoginBtn: isLoginBtnReducer,
    isLogin: isLoginReducer,
    user: userReducer,
    accept: acceptReducer,
    paymentInfo: paymentInfoReducer,
  },
});

export default store;
