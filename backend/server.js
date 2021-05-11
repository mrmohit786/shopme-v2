import express from 'express';
import colors from 'colors';
import compression from 'compression';
import connectDB from './config/database.js';
import routes from './routes/routes.js';
import { errorHandler, notFound } from './middleware/error.js';
import logger from 'morgan';
import cors from 'cors';
import env from './config/env.js';
import path from 'path';

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

if (env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.includes('/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')),
  );
} else {
  app.get('/', (req, res) => {
    res.send('ShopME API');
  });
}

app.use('/api', routes);

// PayPal
app.get('/api/config/paypal', (req, res) => res.send(env.PAYPAL_CLIENT_ID));

app.use(notFound);
app.use(errorHandler);

const PORT = env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
