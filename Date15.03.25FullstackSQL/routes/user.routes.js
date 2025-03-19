import express from "express";
import { loginUser, registerUser } from "../controller/user.controller.js";

const userRouter = express.Router()

userRouter.get("/register", registerUser)
userRouter.get("/login", loginUser)


export default userRouter