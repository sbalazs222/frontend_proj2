import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import { validateFieldCount, validateRequiredFields } from 'psgutil';

import { getUserProfile, updateUserProfile, deleteUserAccount, changeUserPassword } from '../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 address:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 rights:
 *                   type: integer
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get('/profile', 
    authenticateToken, 
    getUserProfile
);

/**
 * @swagger
 * /user/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - address
 *               - phone
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               address:
 *                 type: string
 *                 example: 123 Main St
 *               phone:
 *                 type: string
 *                 example: +1234567890
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input format
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Email or username already exists
 */
router.put('/profile',
    authenticateToken,
    validateFieldCount(4),
    validateRequiredFields(['username', 'email', 'address', 'phone']),
    updateUserProfile
);

/**
 * @swagger
 * /user/profile/password:
 *   put:
 *     summary: Change user password
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *                 example: OldPass123!
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: NewPass456!
 *                 description: Must contain lower-upper case letters, number, symbol and be 8 characters long
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid password format
 *       401:
 *         description: Unauthorized or incorrect current password
 */
router.put('/profile/password',
    authenticateToken,
    validateFieldCount(2),
    validateRequiredFields(['currentPassword', 'newPassword']),
    changeUserPassword
);

/**
 * @swagger
 * /user/profile:
 *   delete:
 *     summary: Delete user account
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete('/profile',
    authenticateToken,
    deleteUserAccount
);

export default router;