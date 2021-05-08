import asynchandler from 'express-async-handler';
import Product from '../models/products.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
export const getProducts = asynchandler(async (req, res) => {
  const limit = Number(req.query.limit);
  const page = Number(req.query.page) || 1;

  const isSearched = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const totalProductCount = await Product.countDocuments({ ...isSearched });

  let products = await Product.find({ ...isSearched })
    .populate('category', 'name')
    .limit(limit)
    .skip(limit * (page - 1))
    .lean();

  res.status(200).json({
    products,
    page,
    pages: Math.ceil(totalProductCount / limit),
    totalProducts: totalProductCount,
  });
});

// @desc create product
// @route POST /api/products
// @access Public
export const createProducts = asynchandler(async (req, res) => {
  const {
    name,
    image,
    description,
    brand,
    categoryId,
    price,
    countInStock,
    rating,
    numReviews,
    userId,
  } = req.body;

  const product = await Product.create({
    name,
    image,
    description,
    brand,
    category: categoryId,
    price,
    countInStock,
    rating,
    numReviews,
    user: userId,
  });

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error('Internal Server Error');
  }
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
export const getProductById = asynchandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category', 'name');
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error('Product not Found');
  }
});

// @desc Create new review
// @route GET /api/products/:id/reviews
// @access Private
export const createProductReview = asynchandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString(),
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not Found');
  }
});

// @desc Get top rated products
// @route GET /api/products/top
// @access Public
export const getTopProducts = asynchandler(async (req, res) => {
  const limit = Number(req.query.limit);
  const products = await Product.find({}).sort({ rating: -1 }).limit(limit).lean();
  res.json(products);
});
