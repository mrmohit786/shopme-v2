import asynchandler from 'express-async-handler';
import Product from '../models/products.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
export const getProducts = asynchandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
export const getProductById = asynchandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not Found');
  }
});