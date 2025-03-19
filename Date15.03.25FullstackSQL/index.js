import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";

//custom routes
import userRouter from "./routes/user.routes.js";
import oidcRoute from "./routes/oidc.routes.js";

dotenv.config({
    path: "./.env"
})

const app = express()

const PORT =  process.env.PORT || 3000

app.use(cors({
    origin: process.env.ORIGIN
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.use('/api/v1/users', userRouter)
app.use('/oidc', oidcRoute)



app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);  
})


