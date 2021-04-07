import express from 'express';

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js';

import {
  getProductById,
  getProducts,
} from '../controllers/productController.js';

import { auth } from '../middleware/auth.js';
import {
  addOrderItems,
  getOrderByID,
  updateOrderToPaid,
} from '../controllers/orderController.js';

const router = express.Router();

// Products
router.route('/products').get(getProducts);
router.route('/products/:id').get(getProductById);

// Users
router.route('/users').post(registerUser);
router.route('/users/login').post(authUser);
router
  .route('/users/profile')
  .get(auth, getUserProfile)
  .put(auth, updateUserProfile);

// Order
router.route('/orders').post(auth, addOrderItems);
router.route('/orders/:id').get(auth, getOrderByID);
router.route('/orders/:id/pay').put(auth, updateOrderToPaid);

export default router;
