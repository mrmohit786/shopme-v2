import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import categories from './data/categories.js';
import User from './models/users.js';
import Product from './models/products.js';
import Category from './models/category.js';
import Order from './models/orders.js';
import connectDB from './config/database.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();

    await User.insertMany(users);
    await Category.insertMany(categories);
    await Product.insertMany(products);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const removeData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();

    console.log('Data Removed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2 === '-d']) {
  removeData();
} else {
  importData();
}
