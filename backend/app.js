// app.js

import { configDotenv } from 'dotenv';
// Load environment variables from .env file
configDotenv();

import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import miscellaneousRoutes from './routes/miscellaneous.routes.js';

import express from 'express';
import connectToDb from './config/db.config.js';
import errorMiddleware from './middleware/error.middleware.js';

const app = express();

// ====== MIDDLEWARE ======

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

const allowedOrigins = [
  'http://localhost:5173',
  'https://learnify-lms-2.onrender.com'  // ✅ your frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Handle preflight requests
app.options('*', cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


// ====== ROUTES ======

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/', miscellaneousRoutes);

// ====== ERROR HANDLING AND DB CONNECTION ======

app.all('*', (req, res) => {
  res.status(404).send('OOPS!! 404 page not found');
});

app.use(errorMiddleware);
connectToDb();

export default app;
