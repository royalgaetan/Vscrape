import nodemailer from "nodemailer";
import {
  LIVE_MAILTRAP_HOST,
  LIVE_MAILTRAP_PASSWORD,
  LIVE_MAILTRAP_PORT,
  LIVE_MAILTRAP_USERNAME,
  MAILTRAP_HOST,
  MAILTRAP_PASSWORD,
  MAILTRAP_PORT,
  MAILTRAP_USERNAME,
  NODE_ENV,
} from "../constants/env";

export const emailTransporter = nodemailer.createTransport({
  host: NODE_ENV === "prod" ? LIVE_MAILTRAP_HOST : MAILTRAP_HOST,
  port:
    NODE_ENV === "prod" ? Number(LIVE_MAILTRAP_PORT) : Number(MAILTRAP_PORT),
  auth: {
    user: NODE_ENV === "prod" ? LIVE_MAILTRAP_USERNAME : MAILTRAP_USERNAME,
    pass: NODE_ENV === "prod" ? LIVE_MAILTRAP_PASSWORD : MAILTRAP_PASSWORD,
  },
});
