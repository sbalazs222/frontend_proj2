import express from 'express'
import {colorLog, errorLog} from 'psgutil'
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later."
})

const app = express()
app.use(express.json())
app.use(colorLog)
app.use(limiter)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

app.get('/', (req, res) => {
    res.send('Hello, World!')
})

app.use(errorLog)