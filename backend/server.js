import express from 'express';
import colors from 'colors';
import compression from 'compression';
import connectDB from './config/database.js';
import routes from './routes/routes.js';
import { errorHandler, notFound } from './middleware/error.js';
import morgan from 'morgan';
import cors from 'cors';
import env from './config/env.js';
import path from 'path';

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

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
