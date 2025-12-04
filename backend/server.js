import express from 'express';
import {colorLog, errorLog} from 'psgutil';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { sanitizeInputs } from './src/middlewares/sanitize.js';
import { RATE_LIMITS } from './src/utils/constants.js';

import { specs, swaggerUi} from './src/utils/swagger.js';

// Import routes
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import carRoutes from './src/routes/carRoutes.js';

// Global rate limiter
const limiter = rateLimit({
    windowMs: RATE_LIMITS.GLOBAL.WINDOW_MS,
    max: RATE_LIMITS.GLOBAL.MAX_REQUESTS,
    message: "Too many requests from this IP, please try again later."
});

// Initialize Express app
const app = express();

// Middleware
app.use(express.json({ limit: '10kb' }));
app.use(sanitizeInputs);
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(colorLog);
app.use(limiter);
app.use(cookieParser());

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/', carRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Car Management API');
});

// Error logging middleware
app.use(errorLog);

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
    console.log('Swagger docs available at http://localhost:3000/api-docs');
});