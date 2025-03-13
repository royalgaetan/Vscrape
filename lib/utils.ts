import { clsx, type ClassValue } from "clsx";
import {
  BarChart3,
  Bell,
  Cloudy,
  Cpu,
  DatabaseZap,
  FileUp,
  Globe,
  LucideIcon,
  PlugZap,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const maskApiKey = (key: string): string => {
  if (key.length <= 4) return "*".repeat(key.length); // If key is too short, mask it
  const visiblePart = key.slice(0, 4);
  const maskedPart = "*".repeat(key.length - 4);
  return visiblePart + maskedPart;
};

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy!", err);
    return false;
  }
};

export const camelToSentenceCase = (text: string) => {
  if (!text) return "";
  const spaced = text.replace(/([A-Z])/g, " $1");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

// Capitalize the first letter of the theme
export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const removeDiacritics = (str: string): string => {
  return str
    .normalize("NFD") // Normalize the string to decomposed form (NFD).
    .replace(/[\u0300-\u036f]/g, ""); // Remove the diacritical marks (accents).
};

export const scrollToEl = ({
  parentId,
  id,
}: {
  parentId?: string;
  id: string;
}) => {
  const parent = parentId ? document.getElementById(parentId) : window;
  const el = document.getElementById(id);
  if (el && parent) {
    parent.scrollTo({
      top: el.offsetTop - 15,
      behavior: "smooth",
    });
  } else {
    console.log(
      `Parent element with ID "${parent}" or child element with ID "${id}" was not found.`
    );
  }
};
export const getIconColor = (icon: LucideIcon): string => {
  switch (icon) {
    case Zap:
      return "#dc2626"; // red-600
    case Workflow:
      return "#ca8a04"; // yellow-600
    case Globe:
      return "#16a34a"; // green-600
    case Cpu:
      return "#db2777"; // pink-600
    case FileUp:
      return "#c026d3"; // fuchsia-600
    case Cloudy:
      return "#2563eb"; // blue-600
    case DatabaseZap:
      return "#737373"; // neutral-600
    case Users:
      return "#9333ea"; // purple-600
    case BarChart3:
      return "#ea580c"; // orange-600
    case Bell:
      return "#ca8a04"; // yellow-600
    case PlugZap:
      return "#059669"; // emerald-600
    default:
      return "#475569"; // slate-600
  }
};
