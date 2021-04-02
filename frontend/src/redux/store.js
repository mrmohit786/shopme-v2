import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loadState } from '../utils/utility';
import CartReducer from './reducers/cart';
import { ProductListReducer, ProductDetailsReducer } from './reducers/products';
import userLoginReducer from './reducers/user';

const reducer = combineReducers({
  productList: ProductListReducer,
  productDetails: ProductDetailsReducer,
  cart: CartReducer,
  userLogin: userLoginReducer,
});

const middleware = [thunk];

const getCartItemsFromStorage = loadState('cart_info') ? loadState('cart_info') : [];
const getUserInfoFromStorage = loadState('user_info') ? loadState('user_info') : null;

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
