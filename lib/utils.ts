import { clsx, type ClassValue } from "clsx";
import { format, formatDistanceToNow, subDays } from "date-fns";
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
};

export const getRandomElement = <T>(arr: Array<T>): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const formatNumber = (n: number) => Intl.NumberFormat("en-US").format(n);

export const getTimeAgoWithLimit = (date: Date, suffix?: boolean) => {
  // If date if more than 1 month
  if (date.getTime() > subDays(Date.now(), 29).getTime()) {
    return formatDistanceToNow(date, {
      addSuffix: true,
    });
  } else {
    return `${suffix ? "on " : ""}${format(date, "MMM dd, yyyy")}`;
  }
};

export const formatLargeNumber = (num: number): string => {
  if (num < 1000) return num.toString(); // No abbreviation if < 1000

  const units = ["K", "M", "B", "T"]; // Kilo, Million, Billion, Trillion
  let unitIndex = -1;
  let formattedNum = num;

  while (formattedNum >= 1000 && unitIndex < units.length - 1) {
    formattedNum /= 1000;
    unitIndex++;
  }

  return `${parseFloat(formattedNum.toFixed(1))}${units[unitIndex]}`;
};

export const isSearchTermFound = ({
  text,
  keySearchTerm,
}: {
  text: string;
  keySearchTerm: string;
}): boolean => {
  return removeDiacritics(text.toLocaleLowerCase()).includes(
    removeDiacritics(keySearchTerm.toLocaleLowerCase())
  );
};

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

export const formatFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} B`; // Bytes
  } else if (sizeInBytes < 1024 * 1024) {
    return `${(sizeInBytes / 1024).toFixed(2)} KB`; // Kilobytes
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`; // Megabytes
  } else {
    return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`; // Gigabytes
  }
};

export const removeDiacritics = (str: string): string => {
  return str
    .normalize("NFD") // Normalize the string to decomposed form (NFD).
    .replace(/[\u0300-\u036f]/g, ""); // Remove the diacritical marks (accents).
};

export const isElementInViewport = (
  parent: HTMLElement,
  child: HTMLElement
): boolean => {
  const parentRect = parent.getBoundingClientRect();
  const childRect = child.getBoundingClientRect();

  return (
    childRect.top >= parentRect.top &&
    childRect.bottom <= parentRect.bottom &&
    childRect.left >= parentRect.left &&
    childRect.right <= parentRect.right
  );
};

export const waitForElementById = (
  id: string,
  timeout = 5000
): Promise<HTMLElement> => {
  return new Promise((resolve, reject) => {
    const el = document.getElementById(id);
    if (el) return resolve(el);

    const observer = new MutationObserver(() => {
      const found = document.getElementById(id);
      if (found) {
        observer.disconnect();
        resolve(found);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error("Timeout: Element not found"));
    }, timeout);
  });
};

export const isAccordionElementOpen = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const state = element.getAttribute("data-state");
    if (state === "open") return true;
  } else {
    return false;
  }
  return false;
};

export const scrollToEl = ({
  parentId,
  id,
  offsetTopMargin = 15,
  offsetLeftMargin = 0,
}: {
  offsetLeftMargin?: number;
  offsetTopMargin?: number;
  parentId?: string;
  id: string;
}) => {
  const parent = parentId ? document.getElementById(parentId) : window;
  const el = document.getElementById(id);
  if (el && parent) {
    parent.scrollTo({
      top: el.offsetTop - offsetTopMargin,
      left: el.offsetLeft - offsetLeftMargin,
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
