import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { userReducer, uiReducer } from '../reducers';

const appReducer = combineReducers({
  /* your app’s top-level reducers */
  uiStore: uiReducer,
  userStore: userReducer,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'USER_LOGGED_OUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;
