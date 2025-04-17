import {
  vsAnyRawTypes,
  vsAnyPrimitives,
  vsText,
  vsDateTime,
  vsBoolean,
  vsRange,
  vsEmailURL,
  vsURL,
  vsTel,
  vsNumber,
  vsImage,
  vsVideo,
  vsAudio,
  vsPDF,
  vsJSON,
  vsHTMLDocument,
  vsXML,
  vsWordDocument,
  vsSheet,
} from "./data_types";

export type DateTimePreset = "Today" | "Tomorrow" | "Yesterday" | "Now";
export type Value = { filterValue: string };
export type ValueOrFormula =
  | { filterValue: string; filterFormula?: never }
  | { filterFormula: string; filterValue?: never };

export type vsCriteria<T extends vsAnyPrimitives | vsAnyRawTypes> = Extract<
  | vsStringCriterias
  | vsDateTimeCriterias
  | vsBooleanCriterias
  | vsNumberCriterias
  | vsRawCriterias,
  { filterType: T["type"] }
>;

// Text, Email, URL, Tel Criterias
export type vsStringType =
  | vsText["type"]
  | vsURL["type"]
  | vsEmailURL["type"]
  | vsTel["type"];
export type vsStringCriterias =
  | ({
      filterType: vsStringType;
      filterCriteria: "contains";
    } & ValueOrFormula)
  | ({
      filterType: vsStringType;
      filterCriteria: "does not contain";
    } & ValueOrFormula)
  | ({
      filterType: vsStringType;
      filterCriteria: "is exactly";
    } & ValueOrFormula)
  | ({ filterType: vsStringType; filterCriteria: "is not" } & ValueOrFormula)
  | { filterType: vsStringType; filterCriteria: "is empty" }
  | { filterType: vsStringType; filterCriteria: "is not empty" }
  | ({
      filterType: vsText["type"];
      filterCriteria: "starts with";
    } & ValueOrFormula)
  | ({
      filterType: vsText["type"];
      filterCriteria: "ends with";
    } & ValueOrFormula)
  //   Specific to vsURL
  | { filterType: vsURL["type"]; filterCriteria: "is valid URL" }

  //   Specific to vsEmail
  | { filterType: vsEmailURL["type"]; filterCriteria: "is valid Email" }

  //   Specific to vsTel
  | { filterType: vsTel["type"]; filterCriteria: "is valid Phone Number" };

// DateTime Criterias
export type vsDateTimeCriterias =
  | {
      filterType: vsDateTime;
      filterCriteria: "is";
      filterValue: DateTimePreset | string;
    } // string fallback = ISO string
  | {
      filterType: vsDateTime;
      filterCriteria: "is not";
      filterValue: DateTimePreset | string;
    }
  | ({ filterType: vsDateTime["type"]; filterCriteria: "before" } & Value) // ISO datetime
  | ({ filterType: vsDateTime["type"]; filterCriteria: "after" } & Value)
  | ({
      filterType: vsDateTime["type"];
      filterCriteria: "on or before";
    } & Value)
  | ({ filterType: vsDateTime["type"]; filterCriteria: "on or after" } & Value)
  | {
      filterType: vsDateTime["type"];
      filterCriteria: "is between";
      filterValue: [string, string];
    }
  | {
      filterType: vsDateTime["type"];
      filterCriteria: "is not between";
      filterValue: [string, string];
    }
  | { filterType: vsDateTime["type"]; filterCriteria: "is empty" }
  | { filterType: vsDateTime["type"]; filterCriteria: "is not empty" };

// Boolean Criterias
export type vsBooleanCriterias =
  | { filterType: vsBoolean["type"]; filterCriteria: "is true" }
  | { filterType: vsBoolean["type"]; filterCriteria: "is false" }
  | { filterType: vsBoolean["type"]; filterCriteria: "is empty" }
  | { filterType: vsBoolean["type"]; filterCriteria: "is not empty" };

// Range Criterias
export type vsRangeCriterias =
  | ({ filterType: vsRange["type"]; filterCriteria: "is exactly" } & {
      filterValue: [number, number];
    })
  | ({ filterType: vsRange["type"]; filterCriteria: "overlaps with" } & {
      filterValue: [number, number];
    })
  | ({ filterType: vsRange["type"]; filterCriteria: "contains" } & {
      filterValue: number;
    })
  | { filterType: vsRange["type"]; filterCriteria: "is empty" }
  | { filterType: vsRange["type"]; filterCriteria: "is not empty" };

//   TimeMS Criterias
export type vsTimeMsCriterias =
  | ({
      filterType: "primitive/milliseconds";
      filterCriteria: "is";
    } & ValueOrFormula)
  | ({
      filterType: "primitive/milliseconds";
      filterCriteria: "is not";
    } & ValueOrFormula)
  | ({
      filterType: "primitive/milliseconds";
      filterCriteria: "is greater than";
    } & ValueOrFormula)
  | ({
      filterType: "primitive/milliseconds";
      filterCriteria: "is less than";
    } & ValueOrFormula)
  | { filterType: "primitive/milliseconds"; filterCriteria: "is empty" }
  | { filterType: "primitive/milliseconds"; filterCriteria: "is not empty" };

// Number Criterias
export type vsNumberCriterias =
  | ({ filterType: vsNumber["type"]; filterCriteria: "is" } & ValueOrFormula)
  | ({
      filterType: vsNumber["type"];
      filterCriteria: "is not";
    } & ValueOrFormula)
  | ({
      filterType: vsNumber["type"];
      filterCriteria: "is greater than";
    } & ValueOrFormula)
  | ({
      filterType: vsNumber["type"];
      filterCriteria: "is less than";
    } & ValueOrFormula)
  | ({ filterType: vsNumber["type"]; filterCriteria: "is between" } & {
      filterValue: [number, number];
    })
  | ({ filterType: vsNumber["type"]; filterCriteria: "is not between" } & {
      filterValue: [number, number];
    })
  | { filterType: vsNumber["type"]; filterCriteria: "is empty" }
  | { filterType: vsNumber["type"]; filterCriteria: "is not empty" };

// Raw Criterias
export type vsRawCriterias =
  // 🌐 URL-based filters
  | { filterType: vsAnyRawTypes["type"]; filterCriteria: "has working URL" }
  | { filterType: vsAnyRawTypes["type"]; filterCriteria: "does not have URL" }

  // 📛 Name-based filters
  | ({
      filterType: vsAnyRawTypes["type"];
      filterCriteria: "filename contains";
    } & {
      filterValue: string;
    })
  | ({
      filterType: vsAnyRawTypes["type"];
      filterCriteria: "filename does not contain";
    } & {
      filterValue: string;
    })
  | ({
      filterType: vsAnyRawTypes["type"];
      filterCriteria: "filename is exactly";
    } & {
      filterValue: string;
    })
  | ({
      filterType: vsAnyRawTypes["type"];
      filterCriteria: "filename starts with";
    } & {
      filterValue: string;
    })
  | ({
      filterType: vsAnyRawTypes["type"];
      filterCriteria: "filename ends with";
    } & {
      filterValue: string;
    })

  // 📦 Size-based filters (size in bytes)
  | ({ filterType: vsAnyRawTypes["type"]; filterCriteria: "is larger than" } & {
      filterValue: number;
    })
  | ({
      filterType: vsAnyRawTypes["type"];
      filterCriteria: "is smaller than";
    } & {
      filterValue: number;
    })
  | ({ filterType: vsAnyRawTypes["type"]; filterCriteria: "is exactly" } & {
      filterValue: number;
    })

  // 🧼 Emptiness
  | { filterType: vsAnyRawTypes["type"]; filterCriteria: "is empty" }
  | { filterType: vsAnyRawTypes["type"]; filterCriteria: "is not empty" }

  // ✅ Type-based validation
  | { filterType: vsImage["type"]; filterCriteria: "is valid Image" }
  | { filterType: vsVideo["type"]; filterCriteria: "is valid Video" }
  | { filterType: vsAudio["type"]; filterCriteria: "is valid Audio" }
  | { filterType: vsPDF["type"]; filterCriteria: "is valid PDF" }
  | { filterType: vsJSON["type"]; filterCriteria: "is valid JSON" }
  | {
      filterType: vsHTMLDocument["type"];
      filterCriteria: "is valid HTML Document";
    }
  | { filterType: vsXML["type"]; filterCriteria: "is valid XML" }
  | {
      filterType: vsWordDocument["type"];
      filterCriteria: "is valid Word Document";
    }
  | {
      filterType: vsSheet["type"];
      filterCriteria: "is valid Spreadsheet Document";
    };
