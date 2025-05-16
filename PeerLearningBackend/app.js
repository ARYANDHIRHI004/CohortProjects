import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.ORIGIN
}))
app.use(express.json({limit: '15kb'}))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("Hiiiii.....!!")
})

import userRoutes from './routes/user.routes.js'

app.use('/api/v1/users', userRoutes)

export default app