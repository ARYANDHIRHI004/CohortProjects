import express from 'express'
import { registerUser } from '../controllers/user.controller.js'


const userRoutes = express.Router()

userRoutes.route('/register').get(registerUser)

export default userRoutes