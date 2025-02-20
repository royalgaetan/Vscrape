import { Router } from "express";
import {
  registerController,
  loginController,
  logoutController,
  refreshController,
} from "../controllers/auth.controller";

const authRoutes = Router();

// prefix: '/auth'
authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
authRoutes.get("/logout", logoutController);
authRoutes.get("/refresh", refreshController);

export default authRoutes;
