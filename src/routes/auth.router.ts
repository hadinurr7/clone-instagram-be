import { Router } from "express";
import { validateRegister } from "../validator/auth.validator";
import { registerController } from "../controller/auth.controller";

const router = Router();

router.post("/register", validateRegister, registerController);

export default router;
