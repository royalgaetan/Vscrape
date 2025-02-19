import { ErrorRequestHandler, Request, Response } from "express";
import { HttpStatusCode } from "../constants/httpCodes";
import { ZodError } from "zod";
import { AppError } from "../utils/error";
import { NODE_ENV } from "../constants/env";

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

const errorHandler: ErrorRequestHandler = (error, req, res, next): any => {
  // Handle logs:
  handleLogs(req, error);

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
