import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CREATE_PRODUCT_REVIEW_REQUEST,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_REVIEW_FAIL,
  CREATE_PRODUCT_REVIEW_RESET,
  TOP_PRODUCTS_REQUEST,
  TOP_PRODUCTS_SUCCESS,
  TOP_PRODUCTS_FAIL,
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
  ALL_CATEGORIES_FAIL,
} from '../actionTypes';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createProductReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REVIEW_REQUEST:
      return { loading: true };
    case CREATE_PRODUCT_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case CREATE_PRODUCT_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_PRODUCT_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const getTopProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case TOP_PRODUCTS_REQUEST:
      return { loading: true, products: [] };
    case TOP_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case TOP_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case ALL_CATEGORIES_REQUEST:
      return { loading: true, categories: [] };
    case ALL_CATEGORIES_SUCCESS:
      return { loading: false, categories: action.payload };
    case ALL_CATEGORIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
