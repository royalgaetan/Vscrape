import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { VsOperationBlockType } from "./workflow_editor/types/w_types";

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

export const deepFreeze = <T>(obj: T): T => {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const value = (obj as any)[prop];
    if (
      value !== null &&
      !Object.isFrozen(value) &&
      (typeof value === "function" || typeof value === "object")
    ) {
      deepFreeze(value);
    }
  });
  return obj;
};

export function deepClone<T>(
  p0: Omit<VsOperationBlockType, "id">,
  input: T
): T {
  const seen = new WeakMap();

  const clone = (value: any): any => {
    if (value === null || typeof value !== "object") return value;
    if (seen.has(value)) return seen.get(value);

    if (Array.isArray(value)) {
      const arr = [] as any;
      seen.set(value, arr);
      for (const item of value) arr.push(clone(item));
      return arr;
    }

    const result: any = {};
    seen.set(value, result);

    for (const key of Reflect.ownKeys(value)) {
      if (typeof key === "symbol") continue;
      const val = value[key as keyof typeof value];
      if (typeof val === "function") continue;
      result[key] = clone(val);
    }

    return result;
  };

  return clone(input);
}
