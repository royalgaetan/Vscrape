export const toCleanUrl = (input: string): string => {
  return input
    .toLowerCase() // lowercase everything
    .trim() // remove leading/trailing spaces
    .replace(/[^a-z0-9\s-]/g, "") // remove non-alphanumeric except space and hyphen
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // collapse multiple hyphens
};

export const formatNumber = (n: number) => Intl.NumberFormat("en-US").format(n);

export const twoDigits = (n: any) => String(n).padStart(2, "0");

export const isTrulyEmpty = (text: string) => {
  return text.replace(/\u200B/g, "").trim().length === 0;
};

export const flattenNodeToString = (node: Node): string => {
  if (node.nodeType === Node.ELEMENT_NODE) {
    return (node as HTMLElement).outerHTML;
  } else if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent || "";
  } else {
    return "";
  }
};

export const toCleanHTML = (content: any) =>
  toStringSafe(content)
    .replace(/\u00A0/g, " ")
    .replace(/\u200B/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const extractSingleTokenType = (
  content: string
): string | null | undefined => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = toCleanHTML(content);

  const tokenChips = tempDiv.querySelectorAll(".token-chip");
  if (tokenChips.length === 1) {
    const el = tokenChips[0];
    const type = el.getAttribute("data-type");
    if (type) {
      if (isPureVariableOnly(tempDiv.innerHTML)) return type;
      else return null;
    } else {
      if (isPureVariableOnly(tempDiv.innerHTML)) return undefined;
      else return null;
    }
  }

  return null;
};

export const stripMustacheBraces = (input: string): string => {
  return input
    .trim()
    .replace(/^{{[\s\u200B]*/g, "") // start: allow spaces or zero-width
    .replace(/[\s\u200B]*}}/g, "") // end: allow spaces or zero-width
    .replace(/[\u200B\u200C\u200D\uFEFF]/g, ""); // remove invisible characters
};

export const isPureVariableOnly = (html: string): boolean => {
  const container = document.createElement("div");
  container.innerHTML = html;

  const cleanedText = toCleanHTML(container.textContent);

  const matches = cleanedText.match(/{{\s*[^{}]*?\s*}}/g) || [];

  return matches.length === 1 && cleanedText === matches[0].trim();
};

export const extractTextFromHTML = (html: string) => {
  // Create a temporary dom element
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  //  Get text content only (strips tags and decodes entities like &nbsp;)
  const rawText = tempDiv.textContent || "";

  // Normalize whitespace: replace multiple spaces/non-breaking spaces with a single space
  return rawText
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

export const humanizeKey = (key: string) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

export const humanize = (text: string): string => {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase → space-separated
    .replace(/^./, (s) => s.toUpperCase()); // capitalize first letter
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
