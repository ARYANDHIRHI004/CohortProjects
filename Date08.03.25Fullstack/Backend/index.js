import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import connect from "./utils/db.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  res.sendFile(path.join(__dirname, '/views/index.html'))
})
app.get("/login", (req,res) => {
  res.sendFile(path.join(__dirname, '/views/login.html'))
})

connect()

app.use('/api/v1/users', userRouter)


app.listen(PORT, () => {
  console.log(`Serverl is listening at ${PORT}`);
})
  

