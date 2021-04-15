import express from 'express';
import colors from 'colors';
import compression from 'compression';
import connectDB from './config/database.js';
import routes from './routes/routes.js';
import { errorHandler, notFound } from './middleware/error.js';
import morgan from 'morgan';
import env from './config/env.js';

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

// if (env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

app.get('/', (req, res) => {
  res.send('E-MART APIs');
});

app.use('/api', routes);

// PayPal
app.get('/api/config/paypal', (req, res) => res.send(env.PAYPAL_CLIENT_ID));

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
