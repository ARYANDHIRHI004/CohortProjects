import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
    const token = req.cookies?.token
    try {
        
        if(!token){
            res.status(400).json({
                message: "please login" 
            })
        }
        const decodedToken = jwt.verify(token, 'shhhhhh');
        const user = await User.findById(decodedToken.id)
        if (!user) {
            res.status(400).json({
                message: "invalid token"
            })
        }
        req.user = user
        next()
    } catch (error) {
        res.status(400).json({
            message: "user not logged in"
        })
    }

}

export default verifyJWT