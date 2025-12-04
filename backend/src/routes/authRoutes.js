import express from 'express'
import rateLimit from 'express-rate-limit'
import {validateFieldCount, validateRequiredFields} from 'psgutil'
import { logUser, regUser } from '../controllers/authController.js'

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 3,
    message: "Too many requests from this IP, please try again later."
})

const router = express.Router()

router.post('/login', limiter, validateFieldCount(2), validateRequiredFields(['email', 'password']), logUser)
router.post('/register', validateFieldCount(5), validateRequiredFields(['email', 'password', 'username', 'address', 'phone']), regUser)

export default router