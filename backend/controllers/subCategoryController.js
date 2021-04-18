import asynchandler from 'express-async-handler';
import SubCategory from '../models/subCategory.js';

// @desc Fetch all sub categories
// @route GET /api/subcategories
// @access Public
export const getAllSubCategory = asynchandler(async (req, res) => {
  const subCategory = await SubCategory.find({}).populate('category', 'name');
  res.status(200).json(subCategory);
});

// @desc create category
// @route POST /api/subcategories
// @access Private
export const createSubCategories = asynchandler(async (req, res) => {
  const { name, description, categoryId } = req.body;

  const subCategoryExists = await SubCategory.findOne({ name });

  if (subCategoryExists) {
    res.status(400);
    throw new Error(`${name} sub-category is already exists`);
  }

  const subCategory = await SubCategory.create({
    name,
    description,
    category: categoryId,
  });

  if (subCategory) {
    res.status(201).json(subCategory);
  } else {
    res.status(400);
    throw new Error('Internal Server Error');
  }
});
