import {
  BigCriteriaCategory,
  vsBooleanCriterias,
  vsCriteria,
  vsDateTimeCriterias,
  vsNumberCriterias,
  vsRangeCriterias,
  vsRawCriterias,
  vsTimeMsCriterias,
} from "../types/data_types_criteria";
import { vsAnyPrimitives, vsAnyRawTypes } from "../types/data_types";
import {
  DocumentMIMETypes,
  isAudioMimeType,
  isDocumentMimeType,
  isImageMimeType,
  isVideoMimeType,
} from "../types/mime_types";

type T = (vsAnyPrimitives | vsAnyRawTypes)["type"];
export const getTypeBigCategory = (
  type?: T
): BigCriteriaCategory | undefined => {
  if (
    type === "primitive/text" ||
    type === "primitive/url" ||
    type === "primitive/emailUrl" ||
    type === "primitive/tel"
  ) {
    return "Strings";
  } else if (type === "primitive/dateTime") {
    return "DateTimes";
  } else if (type === "primitive/boolean" || type === "primitive/switch") {
    return "Booleans";
  } else if (type === "primitive/range") {
    return "Range";
  } else if (type === "primitive/milliseconds" || type === "primitive/number") {
    return "Numbers";
  } else if (
    isImageMimeType(type) ||
    isVideoMimeType(type) ||
    isAudioMimeType(type) ||
    isDocumentMimeType(type)
  ) {
    return "Raw";
  } else {
    return undefined;
  }
};

export const getCriteriaSelection = ({
  filterType,
}: {
  filterType?: T;
}): vsCriteria<T>["filterCriteria"][] => {
  let allCriterias = [] as vsCriteria<T>["filterCriteria"][];

  // Add Strings Criterias
  if (getTypeBigCategory(filterType) === "Strings") {
    allCriterias = allCriterias.concat([
      "contains",
      "does not contain",
      "starts with",
      "ends with",
      "is exactly",
      "is not",
      "is empty",
      "is not empty",
    ]);

    // Specific: URL
    if (filterType === "primitive/url") {
      allCriterias = allCriterias.concat(["is valid URL"] as const);
    }
    // Specific: EmailURL
    if (filterType === "primitive/emailUrl") {
      allCriterias = allCriterias.concat(["is valid Email"] as const);
    }

    // Specific: Tel
    if (filterType === "primitive/tel") {
      allCriterias = allCriterias.concat(["is valid Phone Number"] as const);
    }
  }

  // Add DateTime Criterias
  else if (getTypeBigCategory(filterType) === "DateTimes") {
    allCriterias = allCriterias.concat([
      "is",
      "is not",
      "before",
      "after",
      "on or before",
      "on or after",
      "is between",
      "is not between",
      "is empty",
      "is not empty",
    ] as vsDateTimeCriterias["filterCriteria"][]);
  }

  // Add Booleans Criterias
  else if (getTypeBigCategory(filterType) === "Booleans") {
    allCriterias = allCriterias.concat([
      "is true",
      "is false",
      "is empty",
      "is not empty",
    ] as vsBooleanCriterias["filterCriteria"][]);
  }

  // Add Range Criterias
  else if (getTypeBigCategory(filterType) === "Range") {
    allCriterias = allCriterias.concat([
      "is exactly",
      "overlaps with",
      "contains",
      "is empty",
      "is not empty",
    ] as vsRangeCriterias["filterCriteria"][]);
  }

  // Add TimeMs Criterias
  else if (
    getTypeBigCategory(filterType) === "Numbers" &&
    filterType === "primitive/milliseconds"
  ) {
    allCriterias = allCriterias.concat([
      "is",
      "is not",
      "is greater than",
      "is less than",
      "is empty",
      "is not empty",
    ] as vsTimeMsCriterias["filterCriteria"][]);
  }
  // Add Numbers Criterias
  else if (getTypeBigCategory(filterType) === "Numbers") {
    allCriterias = allCriterias.concat([
      "is",
      "is not",
      "is greater than",
      "is less than",
      "is between",
      "is not between",
      "is empty",
      "is not empty",
    ] as vsNumberCriterias["filterCriteria"][]);
  }

  // Add Raw Criterias
  else if (getTypeBigCategory(filterType) === "Raw") {
    allCriterias = allCriterias.concat([
      "has working URL",
      "does not have URL",
      "filename contains",
      "filename is exactly",
      "filename starts with",
      "filename ends with",
      "is larger than",
      "is smaller than",
      "is exactly",
      "is empty",
      "is not empty",
    ] as vsRawCriterias["filterCriteria"][]);

    // Specific: Image
    if (isImageMimeType(filterType)) {
      allCriterias = allCriterias.concat(["is valid Image"] as const);
    }
    // Specific: Video
    if (isVideoMimeType(filterType)) {
      allCriterias = allCriterias.concat(["is valid Video"] as const);
    }
    // Specific: Audio
    if (isAudioMimeType(filterType)) {
      allCriterias = allCriterias.concat(["is valid Audio"] as const);
    }
    // Specific: PDF
    if (filterType === DocumentMIMETypes[".pdf"]) {
      allCriterias = allCriterias.concat(["is valid PDF"] as const);
    }
    // Specific: JSON
    if (filterType === DocumentMIMETypes[".json"]) {
      allCriterias = allCriterias.concat(["is valid JSON"] as const);
    }
    // Specific: HTML Document
    if (filterType === DocumentMIMETypes[".html"]) {
      allCriterias = allCriterias.concat(["is valid HTML Document"] as const);
    }

    // Specific: XML
    if (filterType === DocumentMIMETypes[".xml"]) {
      allCriterias = allCriterias.concat(["is valid XML"] as const);
    }

    // Specific: Word Document
    if (
      filterType === DocumentMIMETypes[".doc"] ||
      filterType === DocumentMIMETypes[".docx"]
    ) {
      allCriterias = allCriterias.concat(["is valid Word Document"] as const);
    }

    // Specific: Sheet
    if (
      filterType === DocumentMIMETypes[".xls"] ||
      filterType === DocumentMIMETypes[".xlsx"] ||
      filterType === DocumentMIMETypes[".csv"]
    ) {
      allCriterias = allCriterias.concat([
        "is valid Spreadsheet Document",
      ] as const);
    }
  }
  return [...new Set(allCriterias)] as vsCriteria<T>["filterCriteria"][];
};

export type GetFilterValueInput = "text" | "number" | "date" | "undefined";
export type GetFilterValueInputs = [
  GetFilterValueInput,
  ...GetFilterValueInput[]
];

export const getFilterValueInputs = ({
  filterType,
  filterCriteria,
}: {
  filterType: T;
  filterCriteria: string | null;
}): GetFilterValueInputs => {
  let inputSchema = ["text"] as GetFilterValueInputs;

  // Strings
  if (getTypeBigCategory(filterType) === "Strings") {
    inputSchema = ["text"];

    // Specific
    if (
      filterCriteria?.includes("empty") ||
      filterCriteria?.includes("is valid")
    ) {
      inputSchema = ["undefined"];
    }
  }

  // DateTimes
  else if (getTypeBigCategory(filterType) === "DateTimes") {
    inputSchema = ["date"];
    // Specifics
    if (filterCriteria?.includes("between")) {
      inputSchema = ["date", "date"];
    }
    if (filterCriteria?.includes("empty")) {
      inputSchema = ["undefined"];
    }
  }

  // Booleans
  else if (getTypeBigCategory(filterType) === "Booleans") {
    inputSchema = ["undefined"];
  }

  // Range
  else if (filterType === "primitive/range") {
    inputSchema = ["number", "number"];
    // Specifics
    if (filterCriteria === "contains") {
      inputSchema = ["number"];
    }
    if (filterCriteria?.includes("empty")) {
      inputSchema = ["undefined"];
    }
  }

  // TimeMS
  else if (filterType === "primitive/milliseconds") {
    inputSchema = ["number"];
    // Specifics
    if (filterCriteria?.includes("empty")) {
      inputSchema = ["undefined"];
    }
  }

  // Numbers
  else if (filterType === "primitive/number") {
    inputSchema = ["number"];
    // Specifics
    if (filterCriteria?.includes("between")) {
      inputSchema = ["number", "number"];
    }
    if (filterCriteria?.includes("empty")) {
      inputSchema = ["undefined"];
    }
  }

  // Raw
  else if (getTypeBigCategory(filterType) === "Raw") {
    inputSchema = ["undefined"];
    // Specifics
    if (
      filterCriteria?.includes("er than") ||
      filterCriteria === "is exactly"
    ) {
      inputSchema = ["number"];
    }
    if (filterCriteria?.includes("filename ")) {
      inputSchema = ["text"];
    }
  }

  return inputSchema;
};
