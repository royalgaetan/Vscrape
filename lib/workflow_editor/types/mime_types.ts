import { humanize } from "@/lib/string_utils";

export const describeMIME = (mime: string): string => {
  if (Object.values(ImageMIMETypes).join(" ").includes(mime)) return "Image";
  if (Object.values(VideoMIMETypes).join(" ").includes(mime)) return "Video";
  if (Object.values(AudioMIMETypes).join(" ").includes(mime)) return "Audio";

  const docEntry = Object.entries(DocumentMIMETypes).find(
    ([, val]) => val === mime
  );
  if (docEntry) {
    const ext = docEntry[0].replace(".", "").toUpperCase();
    return ext === "TXT" ? "Text File" : ext;
  }

  const primitiveEntry = Object.entries(vsPrimitiveMIMETypes).find(
    ([, val]) => val === mime
  );
  if (primitiveEntry) {
    return humanize(primitiveEntry[0]);
  }

  return "Unknown";
};

export const isImageMimeType = (
  value: unknown
): value is (typeof ImageMIMETypes)[keyof typeof ImageMIMETypes] => {
  return (
    typeof value === "string" &&
    Object.values(ImageMIMETypes).includes(value as any)
  );
};

export const isAudioMimeType = (
  value: unknown
): value is (typeof AudioMIMETypes)[keyof typeof AudioMIMETypes] => {
  return (
    typeof value === "string" &&
    Object.values(AudioMIMETypes).includes(value as any)
  );
};
export const isVideoMimeType = (
  value: unknown
): value is (typeof VideoMIMETypes)[keyof typeof VideoMIMETypes] => {
  return (
    typeof value === "string" &&
    Object.values(VideoMIMETypes).includes(value as any)
  );
};
export const isDocumentMimeType = (
  value: unknown
): value is (typeof DocumentMIMETypes)[keyof typeof DocumentMIMETypes] => {
  return (
    typeof value === "string" &&
    Object.values(DocumentMIMETypes).includes(value as any)
  );
};

export const vsPrimitiveMIMETypes = {
  text: "primitive/text",
  array: "primitive/array",
  boolean: "primitive/boolean",
  number: "primitive/number",
  emailURL: "primitive/emailUrl",
  URL: "primitive/url",
  tel: "primitive/tel",
  range: "primitive/range",
  dateTime: "primitive/dateTime",
  timeMs: "primitive/milliseconds",
  switch: "primitive/switch",
  radio: "primitive/radio",
  customSwitch: "primitive/customSwitch",
  record: "primitive/record",
} as const;

export const ImageMIMETypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".bmp": "image/bmp",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".tiff": "image/tiff",
  ".tif": "image/tiff",
  ".ico": "image/x-icon",
  ".heic": "image/heic",
  ".avif": "image/avif",
  ".psd": "image/vnd.adobe.photoshop",
} as const;

export const VideoMIMETypes = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ogg": "video/ogg",
  ".ogv": "video/ogg",
  ".mov": "video/quicktime",
  ".avi": "video/x-msvideo",
  ".wmv": "video/x-ms-wmv",
  ".mkv": "video/x-matroska",
  ".flv": "video/x-flv",
  ".3gp": "video/3gpp",
  ".ts": "video/mp2t",
  ".m4v": "video/x-m4v",
} as const;

export const AudioMIMETypes = {
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".oga": "audio/ogg",
  ".aac": "audio/aac",
  ".flac": "audio/flac",
  ".m4a": "audio/mp4",
  ".webm": "audio/webm",
  ".opus": "audio/opus",
  ".mid": "audio/midi",
  ".midi": "audio/midi",
  ".aiff": "audio/aiff",
  ".amr": "audio/amr",
} as const;

export const DocumentMIMETypes = {
  ".txt": "text/plain",
  ".md": "text/markdown",
  ".html": "text/html",
  ".htm": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".csv": "text/csv",
  ".tsv": "text/tab-separated-values",
  ".xml": "application/xml",
  ".yaml": "text/yaml",
  ".yml": "text/yaml",
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx":
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".rtf": "application/rtf",
  ".epub": "application/epub+zip",
  ".odt": "application/vnd.oasis.opendocument.text",
  ".ods": "application/vnd.oasis.opendocument.spreadsheet",
  ".zip": "application/zip",
  ".7z": "application/x-7z-compressed",
  ".tar": "application/x-tar",
  ".rar": "application/vnd.rar",
} as const;
