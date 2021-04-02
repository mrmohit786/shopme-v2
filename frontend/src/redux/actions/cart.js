import axios from 'axios';
import { toast } from 'react-toastify';
import { saveState } from '../../utils/utility';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actionTypes';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

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
  saveState(getState().cart.cartItems, 'cart_info');
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  toast.error('Product removed from cart');
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  saveState(getState().cart.cartItems, 'cart_info');
};
