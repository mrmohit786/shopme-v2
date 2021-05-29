import axios from 'axios';
import { toast } from 'react-toastify';
import { LOGIN, PROFILE, REGISTER } from '../../utils/apiRoutes';
import { saveState, removeState } from '../../utils/utility';
import { STORAGE, MESSAGE } from '../../utils/constants';
import {
  MY_ORDER_LISTS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
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
    saveState(data, STORAGE.USER_INFO);
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
  removeState(STORAGE.USER_INFO);
  dispatch({ type: MY_ORDER_LISTS_REQUEST });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_LOGOUT });
  toast.warn(MESSAGE.LOGOUT);
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
    saveState(data, STORAGE.USER_INFO);
    toast.success(MESSAGE.REGISTER);
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error?.response?.data?.message || error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${REGISTER}/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error?.response?.data?.message || error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(PROFILE, user, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    toast.success(MESSAGE.PROFILE_UPDATED);
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error?.response?.data?.message || error.message,
    });
  }
};
