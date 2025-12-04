import express from 'express'
import {colorLog, errorLog} from 'psgutil'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { specs, swaggerUi} from './utils/swagger.js'

import authRoutes from './src/routes/authRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import carRoutes from './src/routes/carRoutes.js'

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later."
})
const app = express()

// Middleware
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(colorLog)
app.use(limiter)
app.use(cookieParser())

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/', carRoutes)

// Root endpoint

app.get('/', (req, res) => {
    res.send('root endpoint')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

app.use(errorLog)