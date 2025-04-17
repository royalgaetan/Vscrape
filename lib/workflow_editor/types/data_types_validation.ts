import { vsDateTime, vsEmailURL, vsTel, vsURL } from "./data_types";

// Email validator
export const isEmail = (val: string): val is vsEmailURL =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

// URL validator
export const isURL = (val: string): val is vsURL => {
  try {
    new URL(val);
    return true;
  } catch {
    return false;
  }
};

// Tel (basic international format)
export const isTel = (val: string): val is vsTel =>
  /^\+?[0-9\s\-().]{7,20}$/.test(val);

// DateTime validator (ISO 8601)
export const isDateTime = (val: string): val is vsDateTime =>
  !isNaN(Date.parse(val));
