import axios from 'axios';
import { toast } from 'react-toastify';
import { PRODUCTS } from '../../utils/apiRoutes';
import { LOCALSTORAGE, MESSAGE } from '../../utils/constants';
import { saveState } from '../../utils/utility';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from '../actionTypes';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${PRODUCTS}/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  saveState(getState().cart.cartItems, LOCALSTORAGE.CART_INFO);
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  toast.error(MESSAGE.REMOVE_PRODUCT);
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  saveState(getState().cart.cartItems, LOCALSTORAGE.CART_INFO);
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  saveState(data, LOCALSTORAGE.SHIPPING_INFO);
};
