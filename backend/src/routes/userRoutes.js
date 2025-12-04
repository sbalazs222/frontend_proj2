import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import { validateFieldCount, validateRequiredFields } from 'psgutil';

import { getUserProfile, updateUserProfile, deleteUserAccount } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', 
    authenticateToken, 
    getUserProfile);

router.put('/profile',
    authenticateToken,
    validateFieldCount(4),
    validateRequiredFields(['username', 'email', 'address', 'phone']),
    updateUserProfile
);
router.delete('/profile',
    authenticateToken,
    deleteUserAccount
);

export default router;