import { constants } from '../constants';

const { SET_PAYMENT_INFO } = constants;
export const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PAYMENT_INFO:
      return {...payload}
    default:
      return state;
  }
};
