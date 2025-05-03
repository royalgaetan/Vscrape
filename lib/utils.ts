import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isRecord(obj: unknown): obj is Record<string, any> {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}

export function debounce<F extends (...args: any[]) => void>(
  fn: F,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
