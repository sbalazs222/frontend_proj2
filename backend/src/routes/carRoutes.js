import express from 'express';
import { authenticateToken, isPermitted } from '../middlewares/auth.js';
import { validateFieldCount, validateRequiredFields } from 'psgutil';

import { getCars, getCarById, createCar, deleteCar, updateCar } from '../controllers/carController.js';

const router = express.Router();

/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Get all cars
 *     tags: [Cars]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of all cars retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   brand:
 *                     type: string
 *                   model:
 *                     type: string
 *                   year:
 *                     type: integer
 *                   mileage:
 *                     type: number
 *                   price:
 *                     type: number
 *                   description:
 *                     type: string
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get('/cars',
    authenticateToken,
    getCars
);

/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: Get car by ID
 *     tags: [Cars]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Car ID
 *     responses:
 *       200:
 *         description: Car retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 brand:
 *                   type: string
 *                 model:
 *                   type: string
 *                 year:
 *                   type: integer
 *                 mileage:
 *                   type: number
 *                 price:
 *                   type: number
 *                 description:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Car not found
 */
router.get('/cars/:id',
    authenticateToken,
    getCarById
);

/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Create a new car listing
 *     tags: [Cars]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brand
 *               - model
 *               - year
 *               - mileage
 *               - price
 *               - description
 *             properties:
 *               brand:
 *                 type: string
 *                 example: Toyota
 *               model:
 *                 type: string
 *                 example: Camry
 *               year:
 *                 type: integer
 *                 example: 2022
 *               mileage:
 *                 type: number
 *                 example: 15000
 *               price:
 *                 type: number
 *                 example: 25000
 *               description:
 *                 type: string
 *                 example: Well-maintained sedan in excellent condition
 *     responses:
 *       201:
 *         description: Car created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/cars',
    authenticateToken,
    validateFieldCount(6),
    validateRequiredFields(['brand', 'model', 'year', 'mileage', 'price', 'description']),
    createCar
);

/**
 * @swagger
 * /cars/{id}:
 *   put:
 *     summary: Update car listing
 *     tags: [Cars]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Car ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brand
 *               - model
 *               - year
 *               - mileage
 *               - price
 *               - description
 *             properties:
 *               brand:
 *                 type: string
 *                 example: Toyota
 *               model:
 *                 type: string
 *                 example: Camry
 *               year:
 *                 type: integer
 *                 example: 2022
 *               mileage:
 *                 type: number
 *                 example: 15000
 *               price:
 *                 type: number
 *                 example: 25000
 *               description:
 *                 type: string
 *                 example: Well-maintained sedan in excellent condition
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       404:
 *         description: Car not found
 */
router.put('/cars/:id',
    authenticateToken,
    isPermitted,
    validateFieldCount(6),
    validateRequiredFields(['brand', 'model', 'year', 'mileage', 'price', 'description']),
    updateCar
);

/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     summary: Delete car listing
 *     tags: [Cars]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Car ID
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       404:
 *         description: Car not found
 */
router.delete('/cars/:id',
    authenticateToken,
    isPermitted,
    deleteCar
);

export default router;