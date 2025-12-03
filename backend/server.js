import express from 'express'
import {colorLog, errorLog} from 'psgutil'

const app = express()
app.use(express.json())
app.use(colorLog)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

app.get('/', (req, res) => {
    res.send('Hello, World!')
})

app.use(errorLog)