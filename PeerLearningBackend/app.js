import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: process.env.ORIGIN
}))
app.use(express.json({limit: '15kb'}))
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {

})

export default app