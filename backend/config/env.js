import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  STRIPE_PRIVATE_KEY: process.env.STRIPE_PRIVATE_KEY,
};
