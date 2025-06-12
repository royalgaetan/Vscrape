import "dotenv/config";

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] ?? defaultValue;
  if (value === undefined) {
    throw new Error(`Missing environment variable ${key}`);
  }
  return value;
};

export const MONGO_URI = getEnv("MONGO_URI");
export const PORT = getEnv("PORT", "4004");
export const NODE_ENV = getEnv("NODE_ENV", "development");
export const APP_ORIGIN = getEnv("APP_ORIGIN");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
export const JWT_SECRET = getEnv("JWT_SECRET");

// MAILTRAP::testing
export const MAILTRAP_HOST = getEnv("MAILTRAP_HOST");
export const MAILTRAP_PORT = getEnv("MAILTRAP_PORT");
export const MAILTRAP_USERNAME = getEnv("MAILTRAP_USERNAME");
export const MAILTRAP_PASSWORD = getEnv("MAILTRAP_PASSWORD");

// MAILTRAP::prod
export const LIVE_MAILTRAP_HOST = getEnv("LIVE_MAILTRAP_HOST");
export const LIVE_MAILTRAP_PORT = getEnv("LIVE_MAILTRAP_PORT");
export const LIVE_MAILTRAP_USERNAME = getEnv("LIVE_MAILTRAP_USERNAME");
export const LIVE_MAILTRAP_PASSWORD = getEnv("LIVE_MAILTRAP_PASSWORD");
