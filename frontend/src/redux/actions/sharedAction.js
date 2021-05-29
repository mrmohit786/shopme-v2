import { SPINNER } from 'redux/actionTypes';

export const showLoader = (loading) => {
  return {
    type: SPINNER,
    payload: loading,
  };
};
