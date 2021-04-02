import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { LOCALSTORAGE } from '../utils/constants';
import { loadState } from '../utils/utility';
import CartReducer from './reducers/cart';
import { ProductListReducer, ProductDetailsReducer } from './reducers/products';
import { userLoginReducer, userRegisterReducer } from './reducers/user';

const reducer = combineReducers({
  productList: ProductListReducer,
  productDetails: ProductDetailsReducer,
  cart: CartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

const middleware = [thunk];

const getCartItemsFromStorage = loadState(LOCALSTORAGE.CART_INFO)
  ? loadState(LOCALSTORAGE.CART_INFO)
  : [];
const getUserInfoFromStorage = loadState(LOCALSTORAGE.USER_INFO)
  ? loadState(LOCALSTORAGE.USER_INFO)
  : null;

const initialState = {
  cart: {
    cartItems: getCartItemsFromStorage,
    userInfo: getUserInfoFromStorage,
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
