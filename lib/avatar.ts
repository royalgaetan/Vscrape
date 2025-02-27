import { createAvatar } from "@dicebear/core";
import { notionists } from "@dicebear/collection";
import { avatarBackgroundColors } from "./constants";
import { generateHexRandomString } from "./crypto";

export const generateAvatar = (customSeed?: string) => {
  try {
    const seed = customSeed ?? generateHexRandomString();
    return createAvatar(notionists, {
      seed,
      backgroundColor: avatarBackgroundColors,
      backgroundType: ["solid"],
    });
  } catch (e) {
    console.log("🟠@Unable to generate avatar:", e);
  }
};
