import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import { SessionDocument } from "../models/session.model";
import { UserDocument } from "../models/user.model";

export enum tokenType {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
}

type refreshTokenPayload = {
  sessionId: SessionDocument["_id"];
};

type accessTokenPayload = {
  sessionId: SessionDocument["_id"];
  userId: UserDocument["_id"];
};

export const generateToken = (
  payload: refreshTokenPayload | accessTokenPayload,
  type: tokenType
) => {
  return jwt.sign(
    payload,
    type === tokenType.REFRESH_TOKEN ? JWT_REFRESH_SECRET : JWT_SECRET,
    {
      audience: ["user"],
      expiresIn: type === tokenType.REFRESH_TOKEN ? "30d" : "15m",
    }
  );
};

export const verifyToken = (token: string, type: tokenType): any => {
  return jwt.verify(
    token,
    type === tokenType.REFRESH_TOKEN ? JWT_REFRESH_SECRET : JWT_SECRET
  );
};
