import express from 'express'
import rateLimit from 'express-rate-limit'
import {validateFieldCount, validateRequiredFields} from 'psgutil'
import { logUser, regUser, logoutUser } from '../controllers/authController.js'
import { RATE_LIMITS } from '../utils/constants.js'

const limiter = rateLimit({
    windowMs: RATE_LIMITS.AUTH.WINDOW_MS,
    max: RATE_LIMITS.AUTH.MAX_REQUESTS,
    message: "Too many requests from this IP, please try again later."
})

const router = express.Router()

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Pass123!
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 user:
 *                   type: string
 *                   example: johndoe
 *       401:
 *         description: Invalid credentials
 *       429:
 *         description: Too many requests - Rate limit exceeded
 */
router.post('/login', 
    limiter, 
    validateFieldCount(2), 
    validateRequiredFields(['email', 'password']), 
    logUser
);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
 *               - address
 *               - phone
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Pass123!
 *                 description: Must contain lower-upper case letters, number, symbol and be 8 characters long
 *               username:
 *                 type: string
 *                 example: johndoe
 *               address:
 *                 type: string
 *                 example: 123 Main St, New York
 *               phone:
 *                 type: string
 *                 example: +1234567890
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 userId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Invalid input format (username, email, phone, or password)
 *       409:
 *         description: Email or username already exists
 */
router.post('/register', 
    validateFieldCount(5), 
    validateRequiredFields(['email', 'password', 'username', 'address', 'phone']), 
    regUser
);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout successful
 */
router.post('/logout', 
    logoutUser
);

export default router