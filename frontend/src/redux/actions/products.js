import axios from 'axios';
import { toast } from 'react-toastify';
import { PRODUCTS } from '../../utils/apiRoutes';
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
} from '../actionTypes';

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(PRODUCTS);

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
