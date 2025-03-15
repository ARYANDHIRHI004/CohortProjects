import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import connect from "./utils/db.js";
import cookieParser from "cookie-parser";

//import all routes
import userRouter from "./routes/user.routes.js";

dotenv.config({
    path: "./.env"
})

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
    methods:["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json({limit:'10kb'}))
app.use(express.urlencoded({limit:'10kb'}))
app.use(cookieParser())

app.get("/", (req,res) => {
  res.send("Cohort!")
})

app.get("/aryan", (req,res) => {
  res.send("Aryan")
})

app.get("/HiteshSir", (req, res) => {
  res.send("chai wale sir")
})

connect()

app.use('/api/v1/users', userRouter)


app.listen(PORT, () => {
  console.log(`Serverl is listening at ${PORT}`);
})
  

