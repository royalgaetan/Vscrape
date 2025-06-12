import { APP_ORIGIN } from "../constants/env";
import verificationCodeType from "../constants/verificationCodeType";
import { SessionModel } from "../models/session.model";
import { UserModel } from "../models/user.model";
import { VerificationCodeModel } from "../models/verificationCode.model";
import {
  fiveMinutesAgo,
  ONE_DAY_MS,
  thirtyDaysFromNow,
  thirtyMinutesFromNow,
} from "../utils/date";

import appAssert from "../utils/error";
import { HttpStatusCode } from "../constants/httpCodes";
import { generateToken, tokenType, verifyToken } from "../utils/token";
import { sendEmail } from "../utils/email";
import {
  getEmailVerificationTemplate,
  getPasswordResetTemplate,
} from "../constants/emailTemplates";
import { hashValue } from "../utils/bcrypt";

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
    expiresAt: thirtyMinutesFromNow(),
  });

  // send verification code via Email
  const verificationURL = `${APP_ORIGIN}/email/verify/${verificationCode._id}`;
  const { emailStatus, emailError } = await sendEmail({
    to: data.email,
    ...getEmailVerificationTemplate(verificationURL),
  });

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
  return { user, accessToken, refreshToken, emailError, emailStatus };
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
  // Verify refreshToken payload & validity (if not expired)
  const payload = await verifyToken(refreshToken, tokenType.REFRESH_TOKEN);
  appAssert(payload, HttpStatusCode.UNAUTHORIZED, "Invalid Refresh Token.");

  // Verify if the session exists Session Store (DB) or Not expired
  const now = Date.now();
  const session = await SessionModel.findOne({
    _id: payload.sessionId,
    expiresAt: { $gt: now },
  });
  appAssert(session, HttpStatusCode.UNAUTHORIZED, "Session expired.");

  // (Optional) Refresh the session if it expires in the next 24 hours
  let newRefreshToken = undefined;
  if (session.expiresAt.getTime() - now <= ONE_DAY_MS) {
    session.expiresAt = thirtyDaysFromNow();
    await session.save();

    // Generate a new refresh token (synced with the new session in term of expiration date)
    newRefreshToken = generateToken(
      { sessionId: session._id },
      tokenType.REFRESH_TOKEN
    );
  }

  // Generate a new access token
  const newAccessToken = generateToken(
    { sessionId: session._id, userId: session.userId },
    tokenType.ACCESS_TOKEN
  );

  // Return tokens
  return {
    newAccessToken,
    newRefreshToken,
  };
};

export const verifyEmail = async (verificationCode: string) => {
  // Verify if the Email Verification Code exists in DB and is still valid (not expired)
  const validCode = await VerificationCodeModel.findOne({
    _id: verificationCode,
    verificationType: verificationCodeType.EmailVerification,
    expiresAt: { $gt: new Date() },
  });
  appAssert(
    validCode,
    HttpStatusCode.NOT_FOUND,
    "Verification code invalid or expired."
  );

  // Get the (owner) user and update the verified field to "true"
  const updatedUser = await UserModel.findByIdAndUpdate(
    validCode.userId,
    {
      verified: true,
    },
    { new: true }
  );
  appAssert(
    updatedUser,
    HttpStatusCode.INTERNAL_SERVER_ERROR,
    "Failed to verify email"
  );

  // Delete all verification codes from this user in the DB (to avoid double-verification)
  await VerificationCodeModel.deleteMany({
    userId: updatedUser._id,
  });

  // return the user
  return {
    user: updatedUser.omitPassword,
  };
};

export const sendPasswordResetCode = async (email: string) => {
  // Check if a user exists with the provided email.
  const user = await UserModel.findOne({ email });
  appAssert(user, HttpStatusCode.NOT_FOUND, "User not found.");

  // Ensure a verification code hasn’t been sent to this user in the last 5 minutes.
  const count = await VerificationCodeModel.countDocuments({
    userId: user._id,
    verificationType: verificationCodeType.PasswordVerification,
    createdAt: { $gt: fiveMinutesAgo() },
  });
  appAssert(
    count <= 1,
    HttpStatusCode.TOO_MANY_REQUESTS,
    "You’ve requested too many password resets. Please wait a bit and try again."
  );

  // Generate a new verification code for password reset.
  const expiresAt = thirtyMinutesFromNow();
  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    verificationType: verificationCodeType.PasswordVerification,
    expiresAt,
  });
  appAssert(
    verificationCode,
    HttpStatusCode.INTERNAL_SERVER_ERROR,
    "There was an issue generating your verification code. Please try again shortly."
  );

  // Craft Reset URL to attach to email
  const resetPasswordURL = `${APP_ORIGIN}/password/reset?code=${
    verificationCode._id
  }&exp=${expiresAt.getTime()}`;

  // Send the newly generated verification code to the user’s email.
  const { emailStatus, emailError } = await sendEmail({
    to: email,
    ...getPasswordResetTemplate(resetPasswordURL),
  });
  appAssert(
    !emailError,
    HttpStatusCode.INTERNAL_SERVER_ERROR,
    "Unable to send Reset Password Email"
  );

  // Return the email status
  return {
    emailStatus,
  };
};

export const resetPassword = async (
  resetPasswordCode: string,
  newPassword: string
) => {
  // Get verification code: check validity and expiration date
  const resetCode = await VerificationCodeModel.findOne({
    _id: resetPasswordCode,
    verificationType: verificationCodeType.PasswordVerification,
    expiresAt: { $gt: new Date() },
  });
  appAssert(
    resetCode,
    HttpStatusCode.UNAUTHORIZED,
    "Reset Password Code invalid or expired."
  );

  // Hash new password
  // Then Update user password with the new one
  const newPasswordHashed = await hashValue(newPassword);
  const updatedUser = await UserModel.findByIdAndUpdate(
    resetCode.userId,
    {
      password: newPasswordHashed,
    },
    {
      new: true,
    }
  );
  appAssert(
    updatedUser,
    HttpStatusCode.INTERNAL_SERVER_ERROR,
    "Failed to reset password."
  );

  // Delete all sessions of this user in our Session Store (DB)
  // The user will be logout from all others sessions/devices
  await SessionModel.deleteMany({
    userId: updatedUser._id,
  });

  // Delete all Reset Password Request of this user in our DB
  await VerificationCodeModel.deleteMany({
    userId: updatedUser._id,
    verificationType: verificationCodeType.PasswordVerification,
  });

  // Return the reponse
  return {
    user: updatedUser.omitPassword(),
  };
};
