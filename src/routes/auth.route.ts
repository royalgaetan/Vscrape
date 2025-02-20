import { Router } from "express";
import {
  registerController,
  loginController,
  logoutController,
  refreshController,
  verifyEmailController,
} from "../controllers/auth.controller";

const authRoutes = Router();

// prefix: '/auth'
authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
authRoutes.get("/logout", logoutController);
authRoutes.get("/refresh", refreshController);
authRoutes.get("/email/verify/:code", verifyEmailController);

export default authRoutes;
