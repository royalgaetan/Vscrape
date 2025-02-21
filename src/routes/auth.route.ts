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

const authRouter = Router();

// prefix: '/auth'
authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/logout", logoutController);
authRouter.get("/refresh", refreshController);
authRouter.get("/email/verify/:code", verifyEmailController);
authRouter.post("/password/forgot", sendPasswordResetCodeController);
authRouter.post("/password/reset", resetPasswordController);

export default authRouter;
