import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { STORAGE } from 'utils/constants';
import { loadState } from 'utils/utility';
import rootReducer from 'redux/reducers';

const __DEV__ = process.env.NODE_ENV !== 'production';

const middleware = [thunk];

if (__DEV__) {
  middleware.push(logger);
}

const getCartItemsFromStorage = loadState(STORAGE.CART_INFO) ? loadState(STORAGE.CART_INFO) : [];
const getUserInfoFromStorage = loadState(STORAGE.USER_INFO) ? loadState(STORAGE.USER_INFO) : null;
const shippingAddressFromStorage = loadState(STORAGE.SHIPPING_INFO)
  ? loadState(STORAGE.SHIPPING_INFO)
  : {};

const paymentMethodFromStorage = loadState(STORAGE.PAYMENT_METHOD_INFO)
  ? loadState(STORAGE.PAYMENT_METHOD_INFO)
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
  showLoader: false,
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
