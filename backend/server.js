import express from 'express';
import colors from 'colors';
import compression from 'compression';
import connectDB from './config/database.js';
import routes from './routes/routes.js';
import { errorHandler, notFound } from './middleware/error.js';
import morgan from 'morgan';
import env from './config/env.js';
import path from 'path';

const app = express();
app.use(express.json());

connectDB();

app.use(
  compression({
    threshold: 0,
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        // don't compress responses if this request header is present
        return false;
      }

      // fallback to standard compression
      return compression.filter(req, res);
    },
  })
);

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api', routes);

// PayPal
app.get('/api/config/paypal', (req, res) => res.send(env.PAYPAL_CLIENT_ID));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}
// middleware
app.use(notFound);
app.use(errorHandler);

const PORT = env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
