import {
  VsFormInputFieldType,
  VsFormInputFieldTypeUnion,
} from "../types/w_types";
import { vsAnyRawTypes } from "../types/data_types";

export class FormFieldBlock {
  public id: string;
  public fieldName: string;
  public fieldLabel: string;
  public fieldDescription: string;
  public fieldPlaceholder: string;
  public fieldValueToPickFrom?: string[];
  public isOptional?: boolean;
  public fieldValue: any;
  public fieldType: VsFormInputFieldTypeUnion["type"];

  constructor(formField: Omit<VsFormInputFieldType, "id">) {
    this.id = crypto.randomUUID();
    this.fieldName = formField.fieldName;
    this.fieldLabel = formField.fieldLabel;
    this.fieldType = formField.type;
    this.fieldValue = formField.value;
    this.fieldDescription = formField.fieldDescription;
    this.fieldPlaceholder = formField.fieldPlaceholder;
    this.fieldValueToPickFrom = formField.fieldValueToPickFrom;
    this.isOptional = formField.isOptional;
  }
}
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------

export class FormFieldTextInput extends FormFieldBlock {
  public isTextArea?: boolean;
  constructor({ isMultiline }: { isMultiline?: boolean }) {
    super({
      fieldName: "Text Field",
      fieldLabel: "Text Field",
      fieldPlaceholder: `${
        isMultiline ? "Write your message here..." : "Type here..."
      }`,
      fieldDescription: `${
        isMultiline ? "Multi-line text input" : "Single-line text input"
      }`,
      type: "primitive/text",
      value: "",
    });
    this.isTextArea = isMultiline;
  }
}

export class FormFieldEmailInput extends FormFieldBlock {
  constructor() {
    super({
      fieldName: "Email Field",
      fieldLabel: "Email Field",
      fieldPlaceholder: "e.g. abc@company.com",
      fieldDescription: "Enter your email address",
      type: "primitive/emailUrl",
      value: "",
    });
  }
}

export class FormFieldPhoneNumber extends FormFieldBlock {
  constructor() {
    super({
      fieldName: "Phone Number Field",
      fieldLabel: "Phone Number Field",
      fieldPlaceholder: "e.g. +1 234 567 890",
      fieldDescription: "Enter your phone number",
      type: "primitive/tel",
      value: "",
    });
  }
}

export class FormFieldNumberInput extends FormFieldBlock {
  constructor() {
    super({
      fieldName: "Number Field",
      fieldLabel: "Number Field",
      fieldPlaceholder: "Enter a number",
      fieldDescription: "Numeric input only",
      type: "primitive/number",
      value: 0,
    });
  }
}

export class FormFieldSelect extends FormFieldBlock {
  constructor() {
    super({
      fieldName: "Dropdown",
      fieldLabel: "Dropdown",
      fieldPlaceholder: "Select an option",
      fieldDescription: "Choose from a list of options",
      type: "primitive/text",
      fieldValueToPickFrom: ["Option A", "Option B", "Option C"],
      value: "",
    });
  }
}

export class FormFieldRadioButtons extends FormFieldBlock {
  constructor() {
    super({
      fieldName: "Radio Buttons",
      fieldLabel: "Radio Buttons",
      fieldPlaceholder: "",
      fieldDescription: "Choose one option",
      type: "primitive/radio",
      fieldValueToPickFrom: ["Option A", "Option B"],
      value: "",
    });
  }
}

export class FormFieldCheckboxes extends FormFieldBlock {
  constructor() {
    super({
      fieldName: "Checkboxes",
      fieldLabel: "Checkboxes",
      fieldPlaceholder: "",
      fieldDescription: "Select one or more options",
      type: "primitive/checkbox",
      fieldValueToPickFrom: ["Option A", "Option B", "Option C"],
      value: [""],
    });
  }
}

export class FormFieldDatePicker extends FormFieldBlock {
  constructor() {
    super({
      fieldName: "Date Picker",
      fieldLabel: "Date Picker",
      fieldPlaceholder: "Pick a date",
      fieldDescription: "Choose a date from calendar",
      type: "primitive/dateTime",
      value: "",
    });
  }
}

export class FormFieldTimePicker extends FormFieldBlock {
  constructor() {
    super({
      fieldName: "Time Picker",
      fieldLabel: "Time Picker",
      fieldPlaceholder: "Pick a time",
      fieldDescription: "Select a specific time",
      type: "primitive/milliseconds",
      value: 0,
    });
  }
}

export class FormFieldYesNoToggle extends FormFieldBlock {
  constructor() {
    super({
      fieldName: "Yes/No Toggle",
      fieldLabel: "Yes/No Toggle",
      fieldPlaceholder: "",
      fieldDescription: "Toggle between yes or no",
      type: "primitive/switch",
      value: false,
    });
  }
}

export class FormFieldHidden extends FormFieldBlock {
  constructor() {
    super({
      fieldName: "Hidden Field",
      fieldLabel: "Hidden Field",
      fieldPlaceholder: "",
      fieldDescription: "Invisible field for metadata",
      type: "primitive/hidden",
      value: "",
    });
  }
}

export class FormFieldFileUpload extends FormFieldBlock {
  public fileLimit?: number;
  constructor({
    fileType,
    limit,
  }: {
    fileType: vsAnyRawTypes["type"];
    limit?: number;
  }) {
    super({
      fieldName: "File Upload",
      fieldLabel: "File Upload",
      fieldPlaceholder: "",
      fieldDescription: "Upload files or images",
      type: fileType,
      value: "",
    });
    this.fileLimit = limit;
  }
}

// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------

export type PossibleFieldBlockType =
  | FormFieldTextInput
  | FormFieldEmailInput
  | FormFieldPhoneNumber
  | FormFieldNumberInput
  | FormFieldSelect
  | FormFieldRadioButtons
  | FormFieldCheckboxes
  | FormFieldDatePicker
  | FormFieldTimePicker
  | FormFieldYesNoToggle
  | FormFieldHidden
  | FormFieldFileUpload;

export const workflowFormFieldBlocks: {
  fieldName: string;
  fieldTooltipContent: string;
}[] = [
  {
    fieldName: "Text Field",
    fieldTooltipContent:
      "Let people type a short answer, like a name or title.",
  },
  {
    fieldName: "Email Field",
    fieldTooltipContent:
      "Ask for their email address (we’ll check it looks correct).",
  },
  {
    fieldName: "Phone Number Field",
    fieldTooltipContent:
      "Collect a phone number so you can call or message them.",
  },
  {
    fieldName: "Number Field",
    fieldTooltipContent:
      "Only allows numbers — perfect for age, quantity, or budget.",
  },
  {
    fieldName: "Dropdown",
    fieldTooltipContent: "Let people pick one option from a list you provide.",
  },
  {
    fieldName: "Radio Buttons",
    fieldTooltipContent: "Show all options and let them choose just one.",
  },
  {
    fieldName: "Checkboxes",
    fieldTooltipContent: "Let people select multiple options if needed.",
  },
  {
    fieldName: "Date Picker",
    fieldTooltipContent: "Adds a calendar so users can easily choose a date.",
  },
  {
    fieldName: "Time Picker",
    fieldTooltipContent: "Let users choose a time, like for a call or meeting.",
  },
  {
    fieldName: "Yes/No Toggle",
    fieldTooltipContent: "A simple switch for yes or no questions.",
  },
  {
    fieldName: "Hidden Field",
    fieldTooltipContent:
      "Info that gets submitted but isn’t shown to the user like UTM tags or source IDs.",
  },
  {
    fieldName: "File Upload",
    fieldTooltipContent:
      "Let users attach a file — like an image, CV, or document.",
  },
] as const;

export const getFormFieldBlockByName = (fieldName: string) => {
  switch (fieldName) {
    case "Text Field":
      return new FormFieldTextInput({});
    case "Email Field":
      return new FormFieldEmailInput();
    case "Phone Number Field":
      return new FormFieldPhoneNumber();
    case "Number Field":
      return new FormFieldNumberInput();
    case "Dropdown":
      return new FormFieldSelect();
    case "Radio Buttons":
      return new FormFieldRadioButtons();
    case "Checkboxes":
      return new FormFieldCheckboxes();
    case "Date Picker":
      return new FormFieldDatePicker();
    case "Time Picker":
      return new FormFieldTimePicker();
    case "Yes/No Toggle":
      return new FormFieldYesNoToggle();
    case "Hidden Field":
      return new FormFieldHidden();
    case "File Upload":
      return new FormFieldFileUpload({ fileType: "image/png" });
    default:
      return undefined;
  }
};
