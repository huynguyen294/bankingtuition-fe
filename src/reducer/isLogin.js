import { constants } from '../constants';
const { SET_IS_LOGIN } = constants;

export const initialState = false;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_IS_LOGIN:
      return (state = payload);
    default:
      return state;
  }
};
