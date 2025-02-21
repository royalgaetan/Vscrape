import { Router } from "express";
import {
  registerController,
  loginController,
  logoutController,
  refreshController,
  verifyEmailController,
  sendPasswordResetCodeController,
  resetPasswordController,
} from "../controllers/auth.controller";

const authRoutes = Router();

// prefix: '/auth'
authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
authRoutes.get("/logout", logoutController);
authRoutes.get("/refresh", refreshController);
authRoutes.get("/email/verify/:code", verifyEmailController);
authRoutes.post("/password/forgot", sendPasswordResetCodeController);
authRoutes.get("/password/reset", resetPasswordController);

export default authRoutes;
