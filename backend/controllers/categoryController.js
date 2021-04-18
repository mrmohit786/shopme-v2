import asynchandler from 'express-async-handler';
import Category from '../models/category.js';

// @desc Fetch all categories
// @route GET /api/categories
// @access Public
export const getAllCategories = asynchandler(async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
});

// @desc create categories
// @route POST /api/categories
// @access Private
export const createCategories = asynchandler(async (req, res) => {
  const { name, description } = req.body;

  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    res.status(400);
    throw new Error(`${name} category is already exists`);
  }

  const category = await Category.create({
    name,
    description,
  });

  if (category) {
    res.status(201).json(category);
  } else {
    res.status(400);
    throw new Error('Internal Server Error');
  }
});
