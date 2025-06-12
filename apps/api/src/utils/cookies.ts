import { CookieOptions, Response } from "express";
import { NODE_ENV } from "../constants/env";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";
import { tokenType } from "./token";

export const REFRESH_PATH = "/auth/refresh";

export const getCookieOptions = (type: tokenType): CookieOptions => ({
  sameSite: "strict",
  httpOnly: true,
  secure: NODE_ENV !== "development",
  expires:
    type === tokenType.REFRESH_TOKEN
      ? thirtyDaysFromNow()
      : fifteenMinutesFromNow(),
  path: type === tokenType.REFRESH_TOKEN ? REFRESH_PATH : undefined,
});

type setAuthCookiesParams = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

export const setAuthCookies = ({
  res,
  accessToken,
  refreshToken,
}: setAuthCookiesParams) => {
  res
    .cookie(
      "accessToken",
      accessToken,
      getCookieOptions(tokenType.ACCESS_TOKEN)
    )
    .cookie(
      "refreshToken",
      refreshToken,
      getCookieOptions(tokenType.REFRESH_TOKEN)
    );
};

export const clearAuthCookies = (res: Response) => {
  return res.clearCookie("accessToken").clearCookie("refreshToken", {
    path: REFRESH_PATH,
  });
};
