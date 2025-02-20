import { Request, Response } from "express";
import { HttpStatusCode } from "../constants/httpCodes";
import catchAsync from "../utils/catchAsync";
import { z } from "zod";
import {
  createAccount,
  loginAccount,
  refreshAccessToken,
} from "../services/auth.service";
import {
  clearAuthCookies,
  getCookieOptions,
  setAuthCookies,
} from "../utils/cookies";
import appAssert from "../utils/error";
import { SessionModel } from "../models/session.model";
import { tokenType, verifyToken } from "../utils/token";

const authSchema = z.object({
  email: z.string().email().min(4).max(255),
  password: z.string().min(6).max(255),
  userAgent: z.string().optional(),
});

const registerSchema = authSchema
  .extend({
    confirmPassword: z.string().min(6).max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export const registerController = catchAsync(
  async (req: Request, res: Response) => {
    // Validate the request
    const request = registerSchema.parse({
      ...req.body,
      userAgent: req.headers["user-agent"],
    });

    // Call the service
    const { user, accessToken, refreshToken } = await createAccount({
      email: request.email,
      password: request.password,
      userAgent: request.userAgent,
    });

    // Return the response
    setAuthCookies({ res, accessToken, refreshToken });
    return res.status(HttpStatusCode.CREATED).json({
      status: "Registered successfully!",
      user: user.omitPassword(),
    });
  }
);

export const loginController = catchAsync(
  async (req: Request, res: Response) => {
    // Validate request
    const loginRequest = authSchema.parse({
      ...req.body,
      userAgent: req.headers["user-agent"],
    });

    // Call the service
    const { user, accessToken, refreshToken } = await loginAccount(
      loginRequest
    );

    // Return the response
    setAuthCookies({ res, accessToken, refreshToken });
    return res.status(HttpStatusCode.OK).json({
      status: "Login successfully",
      user: user.email,
    });
  }
);

export const logoutController = catchAsync(
  async (req: Request, res: Response) => {
    // Verify the accessToken from request
    const accessToken = req.cookies.accessToken;
    appAssert(
      accessToken,
      HttpStatusCode.BAD_REQUEST,
      "Can't log out. Try again later"
    );

    // Verify token payload
    const payload = await verifyToken(accessToken, tokenType.ACCESS_TOKEN);
    appAssert(
      payload,
      HttpStatusCode.UNAUTHORIZED,
      "Can't log out. Token error."
    );

    // Delete corresponding session
    await SessionModel.findOneAndDelete({
      sessionId: payload.sessionId,
    });

    // Delete all sessions belonging to this users: aka log this user out from all devices
    // await SessionModel.deleteMany({ userId: payload.userId });

    // clear cookies && return status
    return clearAuthCookies(res).status(HttpStatusCode.OK).json({
      message: "Logout successful",
    });
  }
);

export const refreshController = catchAsync(
  async (req: Request, res: Response) => {
    // Verify if refresh token is there
    const refreshToken = req.cookies.refreshToken;
    appAssert(
      refreshToken,
      HttpStatusCode.BAD_REQUEST,
      "Refresh token missing"
    );

    // Call the service
    const { newAccessToken, newRefreshToken } = await refreshAccessToken(
      refreshToken
    );

    /**
     * Return new accessToken
     * (and refreshToken if it was near expiration)
     */
    let additional = undefined;
    if (newRefreshToken) {
      res.cookie(
        "refreshToken",
        newRefreshToken,
        getCookieOptions(tokenType.REFRESH_TOKEN)
      );
      additional = { additional: "refresh token renewed (silently)" };
    }
    return res
      .status(HttpStatusCode.OK)
      .cookie(
        "accessToken",
        newAccessToken,
        getCookieOptions(tokenType.ACCESS_TOKEN)
      )
      .json({
        message: "Access token refresh",
        ...(additional && additional),
      });
  }
);
