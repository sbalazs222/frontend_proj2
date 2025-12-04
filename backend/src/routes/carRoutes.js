import express from 'express';
import { authenticateToken, isPermitted } from '../middlewares/auth.js';
import { validateFieldCount, validateRequiredFields } from 'psgutil';

import { getCars, getCarById, createCar, deleteCar, updateCar } from '../controllers/carController.js';

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

router.put('/cars/:id',
    authenticateToken,
    isPermitted,
    validateFieldCount(6),
    validateRequiredFields(['brand', 'model', 'year', 'mileage', 'price', 'description']),
    updateCar
);

router.delete('/cars/:id',
    authenticateToken,
    isPermitted,
    deleteCar
);

export default router;