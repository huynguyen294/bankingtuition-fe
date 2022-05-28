import { constants } from '../constants';
const { SET_IS_LOGIN_BTN } = constants;

export const initialState = true;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_IS_LOGIN_BTN:
      return (state = payload);
    default:
      return state;
  }
};
