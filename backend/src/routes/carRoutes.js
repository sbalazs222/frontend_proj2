import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import { validateFieldCount, validateRequiredFields } from 'psgutil';

import { getCars, getCarById, createCar } from '../controllers/carController.js';

const router = express.Router();

router.get('/cars',
    authenticateToken,
    getCars
);

router.get('/cars/:id',
    authenticateToken,
    getCarById
);

router.post('/cars',
    authenticateToken,
    validateFieldCount(6),
    validateRequiredFields(['brand', 'model', 'year', 'mileage', 'price', 'description']),
    createCar
);

export default router;