import { Router } from "express";
import { validateLogin, validateRegister } from "../validator/auth.validator";
import { loginController, registerController } from "../controller/auth.controller";

const router = Router();

router.post("/register", validateRegister, registerController);
router.post("/login", validateLogin, loginController)

export default router;
