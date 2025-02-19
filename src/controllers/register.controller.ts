import { Request, Response } from "express";
import { HttpStatusCode } from "../constants/httpCodes";
import catchAsync from "../utils/catchAsync";
import { z } from "zod";
import { createAccount } from "../services/auth.service";
import { setAuthCookies } from "../utils/cookies";

const registerSchema = z
  .object({
    email: z.string().email().min(4).max(255),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

const registerController = catchAsync(async (req: Request, res: Response) => {
  // Validate the request
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // Call the service
  const { user, accessToken, refreshToken } = await createAccount({
    email: request.email,
    password: request.password,
    userAgent: request.git push origin backend
    
  });

  // Return the response
  setAuthCookies({ res, accessToken, refreshToken });
  return res.status(HttpStatusCode.CREATED).json({
    status: "Registered successfully!",
    user,
  });
});

export default registerController;
