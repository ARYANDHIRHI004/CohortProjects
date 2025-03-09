import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookie?.token
        if(!token){
            res.status(400).json({
                message: "token not present" 
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
            message: "error"
        })
    }

}

export default verifyJWT