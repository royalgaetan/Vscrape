import { authRoutes } from "./auth.route";

authRoutes.post("/password/forgot", sendPasswordResetCodeController);
