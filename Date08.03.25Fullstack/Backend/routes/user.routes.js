import { Router } from "express";
import verifyJWT from "../middlewares/auth.middlewares.js";
import { loginUser,
         registerUser,
         varifyUser,
         logoutUser, 
         getMe} from "../controllers/user.controllers.js";

const router = Router()

router.post("/register", registerUser)
router.get("/verify/:token", varifyUser)
router.post("/login", loginUser)
router.post("/logout",verifyJWT, logoutUser)
router.get("/me",verifyJWT, getMe)

export default router