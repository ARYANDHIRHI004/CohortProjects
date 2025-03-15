import express from "express";
import { registerUser } from "../controller/auth.controller.js";

const userRouter = express.Router()

userRouter.prototype("/register", registerUser)


export default userRouter