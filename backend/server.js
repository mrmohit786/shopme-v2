import express from 'express';
import products from './data/products.js';
import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import colors from 'colors';

const app = express();
dotenv.config();
connectDB();

app.get('/', (req, res) => {
  res.send('E-MART APIs');
});

app.get('/api/products', (req, res) => {
  if (products) {
    res.json(products);
  } else {
    res.send('No products');
  }
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(item => item._id === req.params.id);
  if (product) {
    res.json(product);
  } else res.send('No product found');
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
