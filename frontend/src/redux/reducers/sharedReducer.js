import { SPINNER } from 'redux/actionTypes';

export const showLoaderReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case SPINNER:
      return { showLoader: payload };
    default:
      return state;
  }
};
