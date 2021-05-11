import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { LOCALSTORAGE } from '../utils/constants';
import { loadState } from '../utils/utility';
import rootReducer from 'redux/reducers';

const __DEV__ = process.env.NODE_ENV !== 'production';

const middleware = [thunk];

if (__DEV__) {
  middleware.push(logger);
}

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
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
