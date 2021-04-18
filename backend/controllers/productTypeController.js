import asynchandler from 'express-async-handler';
import ProductType from '../models/productType.js';

// @desc Fetch all product type
// @route GET /api/productsType
// @access Public
export const getAllProductsType = asynchandler(async (req, res) => {
  const productType = await ProductType.find({})
    .populate('category', 'name')
    .populate('subCategory', 'name');
  res.status(200).json(productType);
});

// @desc create product type
// @route POST /api/productsType
// @access Private
export const createProductsType = asynchandler(async (req, res) => {
  const { name, description, categoryId, subCategoryId } = req.body;

  const productTypeExists = await ProductType.findOne({ name });

  if (productTypeExists) {
    res.status(400);
    throw new Error(`${name} product type is already exists`);
  }

  const productType = await ProductType.create({
    name,
    description,
    category: categoryId,
    subCategory: subCategoryId,
  });

  if (productType) {
    res.status(201).json(productType);
  } else {
    res.status(400);
    throw new Error('Internal Server Error');
  }
});
