import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { userReducer, uiReducer } from '../reducers';

const store = configureStore({
  reducer: {
    uiStore: uiReducer,
    userStore: userReducer,
  },
  middleware: [thunk],
});

export default store;
