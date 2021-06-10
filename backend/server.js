/* npm modules */
import express from 'express';
import colors from 'colors';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import xssClean from 'xss-clean';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';

/* local imports */
import env from './config/env.js';
import connectDB from './config/database.js';
import routes from './routes/routes.js';
import { errorHandler, notFound } from './middleware/error.js';

/* connect mongo database */
connectDB();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 200, // 200 requests per IP
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

/* Restrict all routes to only 200 requests per IP address every 1o minutes */
app.use(limiter);

/* secure headers */
app.use(helmet());

/* Protect against XSS attacks*/
app.use(xssClean());

/* Protect against HPP, should come before any routes */
app.use(hpp());

/* Remove all keys containing prohibited characters */
app.use(mongoSanitize());

/* log APIs hit by client "DEVELOPMENT MODE ONLY" */
if (env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.use(
  express.json({
    /* We need the raw body to verify webhook signatures.
       Let's compute it only when hitting the Stripe webhook endpoint. */
    verify: function (req, res, buf) {
      if (req.originalUrl.includes('/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  }),
);

/* Alternative of cors access
 * app.use((req, res, next) => {
 * res.setHeader('Access-Control-Allow-Origin', '*');
 * res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
 * res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
 * next(); });
 */

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
