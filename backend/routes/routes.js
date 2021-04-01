import express from 'express';

import {
  authUser,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js';

import {
  getProductById,
  getProducts,
} from '../controllers/productController.js';

import { auth } from '../middleware/auth.js';

const router = express.Router();

// Products
router.route('/products').get(getProducts);
router.route('/products/:id').get(getProductById);

// Users
router.route('/users').post(registerUser);
router.route('/users/login').post(authUser);
router.route('/users/profile').get(auth, getUserProfile);

export default router;
