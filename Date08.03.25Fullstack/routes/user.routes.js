import { Router } from "express";
import { registerUser, loginUser} from "../controllers/user.controllers.js";

const router = Router()

router.get("/register", registerUser)
router.get("/login", loginUser)

export default router