import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import CartReducer from './reducers/cart';
import { ProductListReducer, ProductDetailsReducer } from './reducers/products';

const reducer = combineReducers({
  productList: ProductListReducer,
  productDetails: ProductDetailsReducer,
  cart: CartReducer,
});

const middleware = [thunk];

const cartItemsFromStorage =
  localStorage.getItem('cart') && localStorage.getItem('cart') === undefined
    ? JSON.parse(localStorage.getItem('cart'))
    : [];

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
