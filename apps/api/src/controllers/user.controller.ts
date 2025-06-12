import { RequestHandler } from "express";
import { HttpStatusCode } from "../constants/httpCodes";
import catchAsync from "../utils/catchAsync";
import { UserModel } from "../models/user.model";
import appAssert from "../utils/error";
import { SessionModel } from "../models/session.model";
import { z } from "zod";

const mongooseObjectIdSchema = z.string().min(1).max(24);

export const getUserController = catchAsync(async (req, res, next) => {
  // Get Current User (Me via req.userId) or any other User specified in params: :userId
  const userId = req.params.userId ?? req.userId;

  // Fetch User data
  const user = await UserModel.findById(userId);
  appAssert(user, HttpStatusCode.NOT_FOUND, "User not found");

  // Return response
  return res.status(HttpStatusCode.OK).json({
    user: user.omitPassword(),
  });
});

export const getUserSessionsController = catchAsync(async (req, res, next) => {
  // Fetch Sessions only for authenticated user: req.userId;
  const sessions = await SessionModel.find({
    userId: req.userId,
  })
    .select("_id userAgent createdAt")
    .sort({ createdAt: -1 });
  appAssert(sessions, HttpStatusCode.NOT_FOUND, "No session found.");

  // Return response
  return res.status(HttpStatusCode.OK).json({
    sessions: sessions.map((session) => ({
      ...session.toObject(),
      ...(session._id === req.sessionId && { isActive: true }),
    })),
  });
});

export const deleteUserSessionController = catchAsync(
  async (req, res, next) => {
    // Validate sessionId from the request
    // And Prevent user from deleting their current session (req.sessionId)
    const sessionIdToDelete = mongooseObjectIdSchema.parse(req.params.id);
    appAssert(
      sessionIdToDelete && sessionIdToDelete !== req.sessionId.toString(),
      HttpStatusCode.FORBIDDEN,
      "Cannot delete current session."
    );

    // Remove the specified session
    const deleted = await SessionModel.findOneAndDelete({
      _id: sessionIdToDelete,
      userId: req.userId,
    });
    appAssert(deleted, HttpStatusCode.NOT_FOUND, "Session not found.");

    // Return response
    return res.status(HttpStatusCode.OK).json({
      message: "Session has been deleted successfully.",
    });
  }
);
