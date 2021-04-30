import express from 'express';

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js';

import {
  createProductReview,
  createProducts,
  getProductById,
  getProducts,
  getTopProducts,
} from '../controllers/productController.js';

import { auth } from '../middleware/auth.js';
import {
  addOrderItems,
  getMyOrders,
  getOrderByID,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import {
  createCategories,
  getAllCategories,
} from '../controllers/categoryController.js';
import {
  createSubCategories,
  getAllSubCategory,
} from '../controllers/subCategoryController.js';
import {
  createProductsType,
  getAllProductsType,
} from '../controllers/productTypeController.js';
import {
  createPayment,
  stripeWebhooks,
} from '../controllers/paymentController.js';

const router = express.Router();

// Products
router.route('/products').get(getProducts);
router.route('/products').post(createProducts);
router.route('/products/top').get(getTopProducts);
router.route('/products/:id').get(getProductById);
router.route('/products/:id/reviews').post(auth, createProductReview);

// Categories
router.route('/categories').post(createCategories);
router.route('/categories').get(getAllCategories);

// Sub Categories
router.route('/subcategories').get(getAllSubCategory);
router.route('/subcategories').post(createSubCategories);

// Products Type
router.route('/productsType').get(getAllProductsType);
router.route('/productsType').post(createProductsType);

// Users
router.route('/users').post(registerUser);
router.route('/users/login').post(authUser);
router
  .route('/users/profile')
  .get(auth, getUserProfile)
  .put(auth, updateUserProfile);

// Order
router.route('/orders').post(auth, addOrderItems);
router.route('/orders/myorders').get(auth, getMyOrders);
router.route('/orders/:id').get(auth, getOrderByID);
router.route('/orders/:id/pay').put(auth, updateOrderToPaid);

// payment
router.route('/payment/stripe').post(auth, createPayment);
router.route('/payment/stripe/webhooks').post(stripeWebhooks);
export default router;
