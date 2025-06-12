import AppErrorCode from "../constants/appErrorCodes";
import { HttpStatusCodeType } from "../constants/httpCodes";
import assert from "node:assert";

/**
 * The AppError class extends the built-in Error class to add custom functionality,
 * such as a status code, custom error codes (AppErrorCode), and more.
 *
 * Throughout the project, use AppError() instead of the standard Error() class to
 * handle errors with enhanced information.
 *
 * Additional parameters should be included as optional (?) to avoid breaking the code.
 */

export class AppError extends Error {
  constructor(
    public httpStatusCode: HttpStatusCodeType,
    public message: string,
    public appErrorCode?: AppErrorCode
  ) {
    super(message);
  }
}

/**
 * This class asserts a condition and throws an AppError if the condition is falsy.
 *
 * Instead of using: if (!existingUser) throw new Error(...args);
 * Do this: AppAssert(!existingUser, new AppError(...args));
 *
 */

type AppAssert = (
  condition: any,
  statusCode: HttpStatusCodeType,
  message: string,
  appErrorCode?: AppErrorCode
) => asserts condition;

const appAssert: AppAssert = (condition, statusCode, message, appErrorCode) =>
  assert(condition, new AppError(statusCode, message, appErrorCode));

export default appAssert;
