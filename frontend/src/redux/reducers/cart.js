/* eslint-disable no-else-return */
/* eslint-disable no-case-declarations */
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actionTypes';

const CartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const exist = state.cartItems.find((i) => i.product === item.product);
      if (exist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) => (i.product === exist.product ? item : i)),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    default:
      return state;
  }
};

export default CartReducer;
