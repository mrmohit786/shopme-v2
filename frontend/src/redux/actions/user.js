import axios from 'axios';
import { toast } from 'react-toastify';
import { LOGIN, REGISTER } from '../../utils/apiRoutes';
import { saveState, removeState } from '../../utils/utility';
import { LOCALSTORAGE, MESSAGE } from '../../utils/constants';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
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

    const { data } = await axios.post(LOGIN, { email, password }, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    saveState(data, LOCALSTORAGE.USER_INFO);
    toast.success(MESSAGE.LOGIN);
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error?.response?.data?.message || error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  removeState(LOCALSTORAGE.USER_INFO);
  toast.warn(MESSAGE.LOGOUT);
  dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(REGISTER, { name, email, password }, config);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    saveState(data, LOCALSTORAGE.USER_INFO);
    toast.success(MESSAGE.REGISTER);
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error?.response?.data?.message || error.message,
    });
  }
};
