import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.token
        
        if(!token){
            res.status(400).json({
                message: "please login" 
            })
        }
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken
        next()
    } catch (error) {
        res.status(400).json({
            message: "user not logged in"
        })
    }

}

export default verifyJWT