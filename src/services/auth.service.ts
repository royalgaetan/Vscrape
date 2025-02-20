import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import verificationCodeType from "../constants/verificationCodeType";
import { SessionModel } from "../models/session.model";
import { UserModel } from "../models/user.model";
import { VerificationCodeModel } from "../models/verificationCode.model";
import { ONE_DAY_MS, oneYearFromNow, thirtyDaysFromNow } from "../utils/date";
import jwt from "jsonwebtoken";
import appAssert from "../utils/error";
import { HttpStatusCode } from "../constants/httpCodes";
import { generateToken, tokenType, verifyToken } from "../utils/token";

export type AccountParam = {
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: AccountParam) => {
  // verify if user already exist
  const existingUser = await UserModel.exists({ email: data.email });
  appAssert(!existingUser, HttpStatusCode.CONFLICT, "Email already in use");

  // create a new account
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
  });

  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    verificationType: verificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  // send verification code
  // TODO

  // create session
  const session = await SessionModel.create({
    userId: user._id,
    userAgent: data.userAgent,
  });

  // sign access token & refresh token
  const refreshToken = generateToken(
    { sessionId: session._id },
    tokenType.REFRESH_TOKEN
  );
  const accessToken = generateToken(
    { userId: user._id, sessionId: session._id },
    tokenType.ACCESS_TOKEN
  );

  // return new user data & tokens
  return { user, accessToken, refreshToken };
};

export const loginAccount = async (data: AccountParam) => {
  // Check if user with this email exist
  const user = await UserModel.findOne({ email: data.email }).select(
    "email _id createdAt password"
  );
  appAssert(user, HttpStatusCode.NOT_FOUND, "Invalid email or password");

  // Verify password: by comparing
  const isValid = await user.comparePassword(data.password, user.password);
  appAssert(isValid, HttpStatusCode.UNAUTHORIZED, "Invalid email or password");

  // Create a session
  const session = await SessionModel.create({
    userId: user._id,
    userAgent: data.userAgent,
  });

  // Generate accessToken and refreshToken
  const refreshToken = generateToken(
    { sessionId: session._id },
    tokenType.REFRESH_TOKEN
  );
  const accessToken = generateToken(
    { sessionId: session._id, userId: user._id },
    tokenType.ACCESS_TOKEN
  );

  // Return tokens
  return {
    user: user.omitPassword(),
    refreshToken,
    accessToken,
  };
};

export const refreshAccessToken = async (refreshToken: string) => {
  // Verify refreshToken payload
  const payload = await verifyToken(refreshToken, tokenType.REFRESH_TOKEN);
  appAssert(payload, HttpStatusCode.UNAUTHORIZED, "Invalid refresh token");

  // Verify if the session if in Session Store (DB) or Not expired
  const now = Date.now();
  const session = await SessionModel.findOne({
    sessionId: payload.sessionId,
    expiresAt: { $gt: now },
  });
  appAssert(session, HttpStatusCode.UNAUTHORIZED, "Session expired.");

  // (Optional) Refresh the session if it expires in the next 24 hours
  let newRefreshToken = undefined;
  if (session.expiresAt.getTime() - now <= ONE_DAY_MS) {
    session.expiresAt = thirtyDaysFromNow();
    await session.save();

    // Generate a new refresh token (sync with the new session in term of expiration date)
    newRefreshToken = generateToken(
      { sessionId: session._id },
      tokenType.REFRESH_TOKEN
    );
  }

  // Generate a new access token
  const newAccessToken = generateToken(
    { sessionId: session._id, userId: payload.userId },
    tokenType.ACCESS_TOKEN
  );

  // Return tokens
  return {
    newAccessToken,
    newRefreshToken,
  };
};
