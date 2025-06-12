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
export type BigCriteriaCategory =
  | "Strings"
  | "DateTimes"
  | "Booleans"
  | "Numbers"
  | "Range"
  | "Raw";
export type DateTimePreset = "Today" | "Tomorrow" | "Yesterday" | "Now";
export type vsCriteria<T extends (vsAnyPrimitives | vsAnyRawTypes)["type"]> =
  Extract<
    | vsStringCriterias
    | vsDateTimeCriterias
    | vsBooleanCriterias
    | vsNumberCriterias
    | vsRangeCriterias
    | vsRawCriterias,
    { filterType: T }
  >;

//
//
//
// -----------------------------------
// String Criterias: Text, Email, URL, Tel
// -----------------------------------
export type vsString = vsText | vsURL | vsEmailURL | vsTel;
export type vsStringCriterias =
  | {
      filterType: vsString["type"];
      filterCriteria: "contains";
      filterValue: [string];
    }
  | {
      filterType: vsString["type"];
      filterCriteria: "does not contain";
      filterValue: [string];
    }
  | {
      filterType: vsString["type"];
      filterCriteria: "is exactly";
      filterValue: [string];
    }
  | {
      filterType: vsString["type"];
      filterCriteria: "is not";
      filterValue: [string];
    }
  | {
      filterType: vsString["type"];
      filterCriteria: "is empty";
      filterValue: [undefined];
    }
  | {
      filterType: vsString["type"];
      filterCriteria: "is not empty";
      filterValue: [undefined];
    }
  | {
      filterType: vsText["type"];
      filterCriteria: "starts with";
      filterValue: [string];
    }
  | {
      filterType: vsText["type"];
      filterCriteria: "ends with";
      filterValue: [string];
    }
  //   Specific to vsURL
  | {
      filterType: vsURL["type"];
      filterCriteria: "is valid URL";
      filterValue: [undefined];
    }

  //   Specific to vsEmail
  | {
      filterType: vsEmailURL["type"];
      filterCriteria: "is valid Email";
      filterValue: [undefined];
    }

  //   Specific to vsTel
  | {
      filterType: vsTel["type"];
      filterCriteria: "is valid Phone Number";
      filterValue: [undefined];
    };

//
//
// -----------------------------------
// DateTime Criterias
// -----------------------------------
export type vsDateTimeCriterias =
  | {
      filterType: vsDateTime;
      filterCriteria: "is";
      filterValue: [DateTimePreset | string];
    } // string fallback = ISO string
  | {
      filterType: vsDateTime;
      filterCriteria: "is not";
      filterValue: [DateTimePreset | string];
    }
  | {
      filterType: vsDateTime["type"];
      filterCriteria: "before";
      filterValue: [string];
    } // ISO datetime
  | {
      filterType: vsDateTime["type"];
      filterCriteria: "after";
      filterValue: [string];
    }
  | {
      filterType: vsDateTime["type"];
      filterCriteria: "on or before";
      filterValue: [string];
    }
  | {
      filterType: vsDateTime["type"];
      filterCriteria: "on or after";
      filterValue: [string];
    }
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
  | {
      filterType: vsDateTime["type"];
      filterCriteria: "is empty";
      filterValue: [undefined];
    }
  | {
      filterType: vsDateTime["type"];
      filterCriteria: "is not empty";
      filterValue: [undefined];
    };

//
//
// -----------------------------------
// Boolean Criterias
// -----------------------------------
export type vsBooleanCriterias =
  | {
      filterType: vsBoolean["type"];
      filterCriteria: "is true";
      filterValue: [undefined];
    }
  | {
      filterType: vsBoolean["type"];
      filterCriteria: "is false";
      filterValue: [undefined];
    }
  | {
      filterType: vsBoolean["type"];
      filterCriteria: "is empty";
      filterValue: [undefined];
    }
  | {
      filterType: vsBoolean["type"];
      filterCriteria: "is not empty";
      filterValue: [undefined];
    };

//
//
// -----------------------------------
// Range Criterias
// -----------------------------------
export type vsRangeCriterias =
  | {
      filterType: vsRange["type"];
      filterCriteria: "is exactly";
      filterValue: [number, number];
    }
  | {
      filterType: vsRange["type"];
      filterCriteria: "overlaps with";
      filterValue: [number, number];
    }
  | {
      filterType: vsRange["type"];
      filterCriteria: "contains";
      filterValue: [number];
    }
  | {
      filterType: vsRange["type"];
      filterCriteria: "is empty";
      filterValue: [undefined];
    }
  | {
      filterType: vsRange["type"];
      filterCriteria: "is not empty";
      filterValue: [undefined];
    };

//
//
// -----------------------------------
// TimeMS Criterias
// -----------------------------------
export type vsTimeMsCriterias =
  | {
      filterType: "primitive/milliseconds";
      filterCriteria: "is";
      filterValue: [number];
    }
  | {
      filterType: "primitive/milliseconds";
      filterCriteria: "is not";
      filterValue: [number];
    }
  | {
      filterType: "primitive/milliseconds";
      filterCriteria: "is greater than";
      filterValue: [number];
    }
  | {
      filterType: "primitive/milliseconds";
      filterCriteria: "is less than";
      filterValue: [number];
    }
  | {
      filterType: "primitive/milliseconds";
      filterCriteria: "is empty";
      filterValue: [undefined];
    }
  | {
      filterType: "primitive/milliseconds";
      filterCriteria: "is not empty";
      filterValue: [undefined];
    };

//
//
// -----------------------------------
// Number Criterias
// -----------------------------------
export type vsNumberCriterias =
  | {
      filterType: vsNumber["type"];
      filterCriteria: "is";
      filterValue: [number];
    }
  | {
      filterType: vsNumber["type"];
      filterCriteria: "is not";
      filterValue: [number];
    }
  | {
      filterType: vsNumber["type"];
      filterCriteria: "is greater than";
      filterValue: [number];
    }
  | {
      filterType: vsNumber["type"];
      filterCriteria: "is less than";
      filterValue: [number];
    }
  | {
      filterType: vsNumber["type"];
      filterCriteria: "is between";
      filterValue: [number, number];
    }
  | {
      filterType: vsNumber["type"];
      filterCriteria: "is not between";
      filterValue: [number, number];
    }
  | {
      filterType: vsNumber["type"];
      filterCriteria: "is empty";
      filterValue: [undefined];
    }
  | {
      filterType: vsNumber["type"];
      filterCriteria: "is not empty";
      filterValue: [undefined];
    };
//
//
// -----------------------------------
// Raw Criterias
// -----------------------------------
export type vsRawCriterias =
  // 🌐 URL-based filters
  | {
      filterType: vsAnyRawTypes["type"];
      filterCriteria: "has working URL";
      filterValue: [undefined];
    }
  | {
      filterType: vsAnyRawTypes["type"];
      filterCriteria: "does not have URL";
      filterValue: [undefined];
    }

  // 📛 Name-based filters
  | {
      filterType: vsAnyRawTypes["type"];
      filterCriteria: "filename contains";
      filterValue: [string];
    }
  | {
      filterType: vsAnyRawTypes["type"];
      filterCriteria: "filename does not contain";
      filterValue: [string];
    }
  | {
      filterType: vsAnyRawTypes["type"];
      filterCriteria: "filename is exactly";
      filterValue: [string];
    }
  | {
      filterType: vsAnyRawTypes["type"];
      filterCriteria: "filename starts with";
      filterValue: [string];
    }
  | {
      filterType: vsAnyRawTypes["type"];
      filterCriteria: "filename ends with";
      filterValue: [string];
    }

  // 📦 Size-based filters (size in bytes)
  | {
      filterType: vsAnyRawTypes["type"];
      filterCriteria: "is larger than";
      filterValue: [number];
    }
  | {
      filterType: vsAnyRawTypes["type"];
      filterCriteria: "is smaller than";
      filterValue: [number];
    }
  | {
      filterType: vsAnyRawTypes["type"];
      filterCriteria: "is exactly";
      filterValue: [number];
    }

  // 🧼 Emptiness
  | {
      filterType: vsAnyRawTypes["type"];
      filterCriteria: "is empty";
      filterValue: [undefined];
    }
  | {
      filterType: vsAnyRawTypes["type"];
      filterCriteria: "is not empty";
      filterValue: [undefined];
    }

  // ✅ Type-based validation
  | {
      filterType: vsImage["type"];
      filterCriteria: "is valid Image";
      filterValue: [undefined];
    }
  | {
      filterType: vsVideo["type"];
      filterCriteria: "is valid Video";
      filterValue: [undefined];
    }
  | {
      filterType: vsAudio["type"];
      filterCriteria: "is valid Audio";
      filterValue: [undefined];
    }
  | {
      filterType: vsPDF["type"];
      filterCriteria: "is valid PDF";
      filterValue: [undefined];
    }
  | {
      filterType: vsJSON["type"];
      filterCriteria: "is valid JSON";
      filterValue: [undefined];
    }
  | {
      filterType: vsHTMLDocument["type"];
      filterCriteria: "is valid HTML Document";
      filterValue: [undefined];
    }
  | {
      filterType: vsXML["type"];
      filterCriteria: "is valid XML";
      filterValue: [undefined];
    }
  | {
      filterType: vsWordDocument["type"];
      filterCriteria: "is valid Word Document";
      filterValue: [undefined];
    }
  | {
      filterType: vsSheet["type"];
      filterCriteria: "is valid Spreadsheet Document";
      filterValue: [undefined];
    };
