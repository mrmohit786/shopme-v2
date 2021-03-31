import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { ProductListReducer, ProductDetailsReducer } from './reducers/products';

const reducer = combineReducers({
  productList: ProductListReducer,
  productDetails: ProductDetailsReducer,
});
const middleware = [thunk];
const initialState = {};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
