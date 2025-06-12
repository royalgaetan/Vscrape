import { randomBytes } from "crypto";

export const isReallyNumber = (value: any): boolean => {
  // Check if type is number and is not NaN
  if (typeof value === "number") {
    return !Number.isNaN(value);
  }
  // If it's a string, check if it converts to a valid number
  if (typeof value === "string" && value.trim() !== "") {
    return !Number.isNaN(Number(value));
  }
  // Other types (boolean, null, undefined, objects) are not numbers
  return false;
};

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const generateHexRandomString = (bytes = 16): string => {
  return randomBytes(bytes).toString("hex");
};

export const getRandomElement = <T>(arr: Array<T>): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const generateUniqueId = ({
  prefix,
  isDateSensitive = false,
}: {
  prefix?: string;
  isDateSensitive?: boolean;
}): string => {
  const p = prefix ? `${prefix}_` : "";
  const d = isDateSensitive ? `_${new Date(Date.now()).getTime()}` : "";
  const r1 = Math.random().toString(36).slice(2, 9);
  const r2 = Math.random().toString(36).slice(2, 9);
  const r3 = Math.random().toString(36).slice(2, 9);
  return `${p}${r1}${r2}${r3}${d}`;
  // return generateHexRandomString();
};
