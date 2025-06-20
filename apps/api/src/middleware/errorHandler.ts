import { ErrorRequestHandler, Request, Response } from "express";
import { HttpStatusCode } from "../constants/httpCodes";
import { ZodError } from "zod";
import { AppError } from "../utils/error";
import { NODE_ENV } from "../constants/env";
import { clearAuthCookies, REFRESH_PATH } from "../utils/cookies";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

const handleZodErrors = (res: Response, zErrors: ZodError) => {
  const errors = zErrors.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));

  return res.status(HttpStatusCode.BAD_REQUEST).json({
    message: "An error occurred while registering.",
    errors: errors,
  });
};

const handleAppErrors = (res: Response, error: AppError) => {
  return res.status(error.httpStatusCode).json({
    message: error.message,
    error: error.appErrorCode,
  });
};

const handleLogs = (req: Request, error: any) => {
  if (NODE_ENV === "development") {
    console.log(`❌ An error occured at "${req.path}" |`, error);
  } else {
    // No log to show in production mode
  }
};

const handleJWTErrors = (
  res: Response,
  error: TokenExpiredError | JsonWebTokenError
) => {
  return res.status(HttpStatusCode.UNAUTHORIZED).json({
    message:
      error instanceof TokenExpiredError
        ? "Refresh Token is invalid."
        : "Token error.",
    error: error.message,
  });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next): any => {
  // Handle logs:
  handleLogs(req, error);

  // Handle error from "refreshToken path": if any, reset cookies
  if (req.path === REFRESH_PATH) {
    clearAuthCookies(res);
  }

  // Handle JWT Token Expired Error
  if (
    error instanceof TokenExpiredError ||
    error instanceof JsonWebTokenError
  ) {
    return handleJWTErrors(res, error);
  }

  // Handle errors from Zod validation (z.schema.parse())
  if (error instanceof ZodError) {
    return handleZodErrors(res, error);
  }

  // Handle errors from AppError
  if (error instanceof AppError) {
    return handleAppErrors(res, error);
  }

  // TODO: Handle MongoServerError

  // Handle other errors: the rest
  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
  });
};

export default errorHandler;
