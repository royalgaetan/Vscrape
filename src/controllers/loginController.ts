import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { z } from "zod";
import { loginAccount } from "../services/auth.service";
import { HttpStatusCode } from "../constants/httpCodes";

const loginSchema = z.object({
  email: z.string().email().min(4).max(255),
  password: z.string().min(6).max(255),
});

const loginController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Validate request
    const loginRequest = loginSchema.parse({
      ...req.body,
      userAgent: req.headers["user-agent"],
    });

    // Call the service
    const { user } = await loginAccount(loginRequest);

    // Return the response
    res.status(HttpStatusCode.OK).json({
      status: "Login successfully",
      user: user.email,
    });
  }
);

export default loginController;
