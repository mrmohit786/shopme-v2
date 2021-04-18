import axios from 'axios';
import { toast } from 'react-toastify';
import { PAGE_LIMIT, TOP_PRODUCTS_LIMIT } from 'utils/constants';
import { GET_ALL_CATEGORIES, GET_TOP_PRODUCTS, PRODUCTS } from 'utils/apiRoutes';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CREATE_PRODUCT_REVIEW_REQUEST,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_REVIEW_FAIL,
  TOP_PRODUCTS_REQUEST,
  TOP_PRODUCTS_SUCCESS,
  TOP_PRODUCTS_FAIL,
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
  ALL_CATEGORIES_FAIL,
} from 'redux/actionTypes';

export const listProducts = (keyword = '', page = 1, limit = PAGE_LIMIT) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(`${PRODUCTS}?keyword=${keyword}&page=${page}&limit=${limit}`);

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error?.response?.data?.message || error.message });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`${PRODUCTS}/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error?.response?.data?.message || error.message,
    });
  }
};

export const createProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REVIEW_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/products/${productId}/reviews`, review, config);

    dispatch({ type: CREATE_PRODUCT_REVIEW_SUCCESS });
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    dispatch({
      type: CREATE_PRODUCT_REVIEW_FAIL,
      payload: error?.response?.data?.message || error.message,
    });
  }
};

export const listTopProducts = (limit = TOP_PRODUCTS_LIMIT) => async (dispatch) => {
  try {
    dispatch({ type: TOP_PRODUCTS_REQUEST });
    const { data } = await axios.get(`${GET_TOP_PRODUCTS}?limit=${limit}`);

    dispatch({ type: TOP_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    dispatch({
      type: TOP_PRODUCTS_FAIL,
      payload: error?.response?.data?.message || error.message,
    });
  }
};

export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORIES_REQUEST });
    const { data } = await axios.get(GET_ALL_CATEGORIES);

    dispatch({ type: ALL_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    dispatch({
      type: ALL_CATEGORIES_FAIL,
      payload: error?.response?.data?.message || error.message,
    });
  }
};
