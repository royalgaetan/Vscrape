export const formatNumber = (n: number) => Intl.NumberFormat("en-US").format(n);

export const isTrulyEmpty = (text: string) => {
  return text.replace(/\u200B/g, "").trim().length === 0;
};

export const toStringSafe = (value: any): string => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  try {
    return String(value);
  } catch {
    return "";
  }
};

export const removeDiacritics = (str: string): string => {
  return str
    .normalize("NFD") // Normalize the string to decomposed form (NFD).
    .replace(/[\u0300-\u036f]/g, ""); // Remove the diacritical marks (accents).
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

export const maskApiKey = (key: string): string => {
  if (key.length <= 4) return "*".repeat(key.length); // If key is too short, mask it
  const visiblePart = key.slice(0, 4);
  const maskedPart = "*".repeat(key.length - 4);
  return visiblePart + maskedPart;
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
