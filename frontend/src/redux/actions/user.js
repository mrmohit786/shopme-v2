import axios from 'axios';
import { toast } from 'react-toastify';
import { saveState, removeState } from '../../utils/utility';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../actionTypes';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/users/login', { email, password }, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    saveState(data, 'user_info');
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error?.response?.data?.message || error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  removeState('user_info');
  dispatch({ type: USER_LOGOUT });
};
