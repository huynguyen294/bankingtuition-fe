import { constants } from '../constants';
const { SET_ACCEPT } = constants;

export const initialState = false;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ACCEPT:
      return (state = payload);
    default:
      return state;
  }
};
