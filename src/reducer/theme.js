import { constants } from '../constants';

const { SET_THEME } = constants;
export const initialState = false;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_THEME:
      return (state = payload);
    default:
      return state;
  }
};
