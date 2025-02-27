import { randomBytes } from "crypto";

export const generateHexRandomString = (bytes = 16): string => {
  return randomBytes(bytes).toString("hex");
};
