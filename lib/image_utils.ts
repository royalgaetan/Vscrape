import { createAvatar } from "@dicebear/core";
import { notionists } from "@dicebear/collection";
import { avatarBackgroundColors } from "./constants";
import { generateHexRandomString } from "./numbers_utils";

export const generateAvatar = (customSeed?: string, bgColors?: string[]) => {
  try {
    const seed = customSeed ?? generateHexRandomString();
    return createAvatar(notionists, {
      seed,
      backgroundColor: bgColors ?? avatarBackgroundColors,
      backgroundType: ["solid"],
    });
  } catch (e) {
    console.log("🟠@Unable to generate avatar:", e);
  }
};

export const isImage = (fileName: string): boolean => {
  return /\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(fileName);
};
