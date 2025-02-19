import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import verificationCodeType from "../constants/verificationCodeType";
import { SessionModel } from "../models/session.model";
import { UserModel } from "../models/user.model";
import { VerificationCodeModel } from "../models/verificationCode.model";
import { oneYearFromNow } from "../utils/date";
import jwt from "jsonwebtoken";
import appAssert, { AppError } from "../utils/error";
import { HttpStatusCode } from "../constants/httpCodes";
import { ok } from "assert";

export type CreateAccountParam = {
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccountParam) => {
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
  const refreshToken = jwt.sign(
    { sessionId: session._id },
    JWT_REFRESH_SECRET,
    {
      audience: ["user"],
      expiresIn: "30d",
    }
  );

  const accessToken = jwt.sign(
    { userId: user._id, sessionId: session._id },
    JWT_SECRET,
    {
      audience: ["user"],
      expiresIn: "15m",
    }
  );

  // return new user data & tokens
  return { user, accessToken, refreshToken };
};

export const loginAccount = async (data: CreateAccountParam) => {
  // Check if user exist
  const user = await UserModel.findOne({ email: data.email }).select(
    "email _id createdAt"
  );

  // If exist
  appAssert(
    user,
    HttpStatusCode.NOT_FOUND,
    "No user found. Please create an account"
  );
  return {
    user,
  };
};
