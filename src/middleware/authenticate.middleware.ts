import { RequestHandler } from "express";
import appAssert from "../utils/error";
import { HttpStatusCode } from "../constants/httpCodes";
import { tokenType, verifyToken } from "../utils/token";

const authenticate: RequestHandler = (req, res, next) => {
  // Retrieve and validate the Access Token
  const accessToken = req.cookies.accessToken;
  appAssert(
    accessToken,
    HttpStatusCode.UNAUTHORIZED,
    "Invalid Access Token. Please login."
  );

  // Decode and verify the Access Token payload using JWT
  const payload = verifyToken(accessToken, tokenType.ACCESS_TOKEN);

  // Attach User ID and Session ID to the request for further processing
  req.userId = payload.userId;
  req.sessionId = payload.sessionId;

  // Proceed to the next middleware: at this stage we consider that the user is authenticated
  next();
};

export default authenticate;
