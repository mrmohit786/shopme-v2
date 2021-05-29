import { combineReducers } from 'redux';
import { cartReducer } from './cart';
import {
  myOrderListsReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
} from './order';
import {
  productListReducer,
  productDetailsReducer,
  createProductReviewReducer,
  getTopProductsReducer,
  getAllCategoriesReducer,
} from './products';
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from './user';

import { showLoaderReducer } from './sharedReducer';

export default combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myOrderLists: myOrderListsReducer,
  createProductReview: createProductReviewReducer,
  topProducts: getTopProductsReducer,
  allCategories: getAllCategoriesReducer,
  showLoader: showLoaderReducer,
});
