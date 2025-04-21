// This document contains all Types used by the Data flowing inside the Workflow Editor
// Add the prefix "vs" in front of each type; "vs" stands for VScrape (2 first letters)
import {
  AudioMIMETypes,
  DocumentMIMETypes,
  ImageMIMETypes,
  VideoMIMETypes,
  vsPrimitiveMIMETypes,
} from "./mime_types";

// Basic Types
export type vsText = {
  value: string;
  type: (typeof vsPrimitiveMIMETypes)["text"];
};
export type vsArray<T = unknown> = {
  value: Array<T>;
  type: (typeof vsPrimitiveMIMETypes)["array"];
};
export type vsBoolean = {
  value: boolean;
  type: (typeof vsPrimitiveMIMETypes)["boolean"];
};
export type vsNumber = {
  value: number;
  type: (typeof vsPrimitiveMIMETypes)["number"];
};

// Extended Types
export type vsEmailURL = {
  value: string;
  type: (typeof vsPrimitiveMIMETypes)["emailURL"];
};
export type vsURL = {
  value: string;
  type: (typeof vsPrimitiveMIMETypes)["URL"];
};
export type vsTel = {
  value: string;
  type: (typeof vsPrimitiveMIMETypes)["tel"];
};
export type vsRange = {
  value: [number, number];
  type: (typeof vsPrimitiveMIMETypes)["range"];
};
export type vsDateTime = {
  value: string; // ISO format
  type: (typeof vsPrimitiveMIMETypes)["dateTime"];
};
export type vsTimeMs = {
  value: number;
  type: (typeof vsPrimitiveMIMETypes)["timeMs"];
};
export type vsSwitch = {
  value: boolean;
  type: (typeof vsPrimitiveMIMETypes)["switch"];
};
export type vsCustomSwitch = {
  value: string;
  type: (typeof vsPrimitiveMIMETypes)["customSwitch"];
};
export type vsRecord = {
  value: { key: string; value: any }[];
  type: (typeof vsPrimitiveMIMETypes)["record"];
};

export type vsAnyPrimitives =
  | vsText
  | vsArray
  | vsBoolean
  | vsNumber
  | vsEmailURL
  | vsURL
  | vsTel
  | vsRange
  | vsDateTime
  | vsTimeMs
  | vsSwitch
  | vsCustomSwitch
  | vsRecord;

// Raw
export type vsImage = {
  name: string;
  type: (typeof ImageMIMETypes)[keyof typeof ImageMIMETypes];
  sizeInBytes: number;
  url?: string;
  blob?: Blob;
};

export type vsVideo = {
  name: string;
  type: (typeof VideoMIMETypes)[keyof typeof VideoMIMETypes];
  sizeInBytes: number;
  url?: string;
  blob?: Blob;
};

export type vsAudio = {
  name: string;
  type: (typeof AudioMIMETypes)[keyof typeof AudioMIMETypes];
  sizeInBytes: number;
  url?: string;
  blob?: Blob;
};

export type vsPDF = {
  name: string;
  type: (typeof DocumentMIMETypes)[".pdf"];
  sizeInBytes: number;
  url?: string;
  blob?: Blob;
};

export type vsJSON = {
  name: string;
  type: (typeof DocumentMIMETypes)[".json"];
  sizeInBytes: number;
  url?: string;
  blob?: Blob;
};

export type vsHTMLDocument = {
  name: string;
  type:
    | (typeof DocumentMIMETypes)[".html"]
    | (typeof DocumentMIMETypes)[".htm"];
  sizeInBytes: number;
  url?: string;
  blob?: Blob;
};

export type vsXML = {
  name: string;
  type: (typeof DocumentMIMETypes)[".xml"];
  sizeInBytes: number;
  url?: string;
  blob?: Blob;
};

export type vsWordDocument = {
  name: string;
  type:
    | (typeof DocumentMIMETypes)[".doc"]
    | (typeof DocumentMIMETypes)[".docx"];
  sizeInBytes: number;
  url?: string;
  blob?: Blob;
};

export type vsSheet = {
  name: string;
  type:
    | (typeof DocumentMIMETypes)[".xls"]
    | (typeof DocumentMIMETypes)[".xlsx"]
    | (typeof DocumentMIMETypes)[".csv"];
  sizeInBytes: number;
  url?: string;
  blob?: Blob;
};

export type vsPlainText = {
  name: string;
  type: (typeof DocumentMIMETypes)[".txt"];
  sizeInBytes: number;
  url?: string;
  blob?: Blob;
};

export type vsAnyRawTypes =
  | vsImage
  | vsVideo
  | vsAudio
  | vsPDF
  | vsJSON
  | vsHTMLDocument
  | vsXML
  | vsWordDocument
  | vsSheet
  | vsPlainText;

// Complex:
export type vsFormData = {
  [key: string]: vsAnyPrimitives | vsAnyRawTypes;
};

export type vsAPIResponse<T = unknown> = {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code?: string;
    message: string;
    details?: any;
  };
};
export type vsStructuredData = {
  [key: string]:
    | vsAnyPrimitives
    | vsAnyPrimitives[]
    | vsAnyRawTypes
    | vsAnyRawTypes[]
    | vsStructuredData
    | vsStructuredData[];
};

export type vsChatBotMessage = {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  timestamp: string; // ISO date
  metadata?: Record<string, any>;
};

export type vsEmail = {
  id: string;
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  html?: string;
  attachments?: (vsImage | vsAudio | vsVideo | vsPDF)[];
  timestamp: string; // ISO date
};

export type vsSMS = {
  id: string;
  from: string; // usually a phone number or shortcode
  to: string;
  body: string;
  timestamp: string; // ISO date
  provider?: "twilio" | "nexmo" | "plivo" | "custom";
};

export type vsVoicemail = {
  id: string;
  from: string;
  to: string;
  audio: vsAudio;
  transcript?: string;
  durationInSec: number;
  timestamp: string; // ISO date
};

// Others
export type vsCronJob = {
  id: string;
  name: string;
  expression: string; // e.g. "0 0 * * *"
  timezone?: string; // e.g. "UTC", "Europe/Paris"
  nextRun?: string; // optional ISO timestamp of next scheduled run
  enabled: boolean;
};
