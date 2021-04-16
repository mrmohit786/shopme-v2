import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { LOCALSTORAGE } from '../utils/constants';
import { loadState } from '../utils/utility';
import { cartReducer } from './reducers/cart';
import {
  myOrderListsReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
} from './reducers/order';
import {
  productListReducer,
  productDetailsReducer,
  createProductReviewReducer,
  getTopProductsReducer,
} from './reducers/products';
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from './reducers/user';

const reducer = combineReducers({
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
});

const middleware = [thunk];

const getCartItemsFromStorage = loadState(LOCALSTORAGE.CART_INFO)
  ? loadState(LOCALSTORAGE.CART_INFO)
  : [];
const getUserInfoFromStorage = loadState(LOCALSTORAGE.USER_INFO)
  ? loadState(LOCALSTORAGE.USER_INFO)
  : null;
const shippingAddressFromStorage = loadState(LOCALSTORAGE.SHIPPING_INFO)
  ? loadState(LOCALSTORAGE.SHIPPING_INFO)
  : {};

const paymentMethodFromStorage = loadState(LOCALSTORAGE.PAYMENT_METHOD_INFO)
  ? loadState(LOCALSTORAGE.PAYMENT_METHOD_INFO)
  : '';

const initialState = {
  cart: {
    cartItems: getCartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: {
    userInfo: getUserInfoFromStorage,
  },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
