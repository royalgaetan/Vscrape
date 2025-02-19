import { Router } from "express";
import registerController from "../controllers/register.controller";
import loginController from "../controllers/loginController";

const authRoutes = Router();

// prefix: '/auth'
authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);

export default authRoutes;
