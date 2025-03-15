import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";

//custom routes
import userRouter from "./routes/auth.routes.js";

dotenv.config({
    path: "./.env"
})

const app = express()

const PORT =  process.env.PORT || 3000

app.use(cors({
    origin: process.env.ORIGIN
}))

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())


app.use('/api/v1/users', userRouter)

app.get("/", (req, res) => {
  res.status
}
)


app.listen(postMessage, () => {
  console.log(`Server is listening at ${PORT}`);
  
})


