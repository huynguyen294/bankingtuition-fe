import { constants } from '../constants';

const { SET_USER } = constants;
export const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {...payload}
    default:
      return state;
  }
};
