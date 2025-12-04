import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';

import { getUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', authenticateToken, getUserProfile);

export default router;