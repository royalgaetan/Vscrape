import { Router } from "express";
import registerController from "../controllers/register.controller";

const authRoutes = Router();

// prefix: '/auth'
authRoutes.post("/register", registerController);

export default authRoutes;
