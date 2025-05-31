import {
  AtSign,
  CalendarDays,
  CheckSquare2Icon,
  CircleDot,
  Clock,
  EyeOff,
  Hash,
  LucideIcon,
  PanelTopOpen,
  PenLine,
  Phone,
  ToggleRight,
  Upload,
} from "lucide-react";
import { FormFieldBlock } from "../classes/form_field_block";

// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
export class FormFieldTextInput extends FormFieldBlock {
  private _isMultiline?: boolean; // Enable Textarea if true
  constructor({ isMultiline }: { isMultiline?: boolean }) {
    super({
      fieldName: "Text Field",
      fieldLabel: "Text Input",
      fieldPlaceholder: "",
      fieldDescription: "",
      fieldDefaultPlaceholder: `${
        isMultiline ? "Write your message here..." : "Type here..."
      }`,
      type: "primitive/text",
      value: "",
      isOptional: false,
    });
    this._isMultiline = isMultiline;
  }

  // Field IsMultiline: getter + setter
  get isMultiline(): boolean | undefined {
    return this._isMultiline;
  }
  set isMultiline(isMultiline: boolean) {
    this._isMultiline = isMultiline;
    this.notifyAll();
  }
}

export class FormFieldEmailInput extends FormFieldBlock {
  constructor() {
    super({
      fieldName: "Email Field",
      fieldLabel: "Email",
      fieldPlaceholder: "",
      fieldDescription: "",
      fieldDefaultPlaceholder: "e.g. abc@company.com",
      type: "primitive/emailUrl",
      value: "",
      isOptional: false,
    });
  }
}

export class FormFieldPhoneNumber extends FormFieldBlock {
  constructor() {
    super({
      fieldName: "Phone Number Field",
      fieldLabel: "Phone Number",
      fieldPlaceholder: "",
      fieldDescription: "",
      fieldDefaultPlaceholder: "e.g. +1 234 567 890",
      type: "primitive/tel",
      value: "",
      isOptional: false,
    });
  }
}

export class FormFieldNumberInput extends FormFieldBlock {
  constructor() {
    super({
      fieldName: "Number Field",
      fieldLabel: "Number",
      fieldPlaceholder: "",
      fieldDescription: "",
      fieldDefaultPlaceholder: "Enter a number",
      type: "primitive/number",
      value: 0,
      isOptional: true,
    });
  }
}

export class FormFieldSelect extends FormFieldBlock {
  constructor() {
    super({
      fieldName: "Dropdown",
      fieldLabel: "Select an option",
      fieldPlaceholder: undefined,
      fieldDescription: "Choose from a list of options",
      fieldDefaultDescription: "",
      type: "primitive/text",
      fieldValueToPickFrom: ["Option A", "Option B", "Option C"],
      value: "",
      isOptional: true,
    });
  }
}

export class FormFieldRadioButtons extends FormFieldBlock {
  constructor() {
    super({
      fieldName: "Radio Buttons",
      fieldLabel: "Radio Buttons",
      fieldPlaceholder: undefined,
      fieldDescription: "Choose one option",
      fieldDefaultDescription: "",
      type: "primitive/radio",
      fieldValueToPickFrom: ["Option A", "Option B"],
      value: "",
      isOptional: true,
    });
  }
}

export class FormFieldCheckboxes extends FormFieldBlock {
  constructor() {
    super({
      fieldName: "Checkboxes",
      fieldLabel: "Checkboxes",
      fieldPlaceholder: undefined,
      fieldDescription: "Select one or more options",
      fieldDefaultDescription: "",
      type: "primitive/checkbox",
      fieldValueToPickFrom: ["Option A", "Option B", "Option C"],
      value: [""],
      isOptional: true,
    });
  }
}

export class FormFieldDatePicker extends FormFieldBlock {
  constructor() {
    super({
      fieldName: "Date Picker",
      fieldLabel: "Select a date",
      fieldPlaceholder: "",
      fieldDescription: "",
      fieldDefaultPlaceholder: "Pick a date",
      type: "primitive/dateTime",
      value: "",
      isOptional: true,
    });
  }
}

export class FormFieldTimePicker extends FormFieldBlock {
  constructor() {
    super({
      fieldName: "Time Picker",
      fieldLabel: "Select a time",
      fieldPlaceholder: "",
      fieldDescription: "",
      fieldDefaultPlaceholder: "Pick a time",
      type: "primitive/milliseconds",
      value: 0,
      isOptional: true,
    });
  }
}

export class FormFieldYesNoToggle extends FormFieldBlock {
  constructor() {
    super({
      fieldName: "Yes/No Toggle",
      fieldLabel: "Toggle to select",
      fieldPlaceholder: undefined,
      fieldDescription: "Toggle between yes or no",
      fieldDefaultDescription: "",
      type: "primitive/switch",
      value: false,
      isOptional: true,
    });
  }
}

export class FormFieldHidden extends FormFieldBlock {
  constructor() {
    super({
      fieldName: "Hidden Field",
      fieldLabel: "Hidden Field",
      fieldPlaceholder: undefined,
      fieldDescription: undefined,
      isHidden: true,
      type: "primitive/hidden",
      value: "",
    });
  }
}

export class FormFieldFileUpload extends FormFieldBlock {
  private _acceptedExtensions: string[] = [];
  constructor() {
    super({
      fieldName: "File Upload",
      fieldLabel: "Upload a file",
      fieldPlaceholder: "",
      fieldDescription: "",
      fieldDefaultPlaceholder: "Drag and drop your file here",
      type: "image/png",
      value: "",
      isOptional: true,
    });
  }

  // Field Accepted Extensions: getter + setter
  get acceptedExtensions(): string[] {
    return this._acceptedExtensions;
  }
  set acceptedExtensions(extensionsList: string[]) {
    this._acceptedExtensions = extensionsList;
    this.notifyAll();
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
  fieldIcon: LucideIcon;
}[] = [
  {
    fieldName: "Text Field",
    fieldTooltipContent:
      "Let people type a short answer, like a name or title.",
    fieldIcon: PenLine,
  },
  {
    fieldName: "Email Field",
    fieldTooltipContent:
      "Ask for their email address (we’ll check it looks correct).",
    fieldIcon: AtSign,
  },
  {
    fieldName: "Phone Number Field",
    fieldTooltipContent:
      "Collect a phone number so you can call or message them.",
    fieldIcon: Phone,
  },
  {
    fieldName: "Number Field",
    fieldTooltipContent:
      "Only allows numbers — perfect for age, quantity, or budget.",
    fieldIcon: Hash,
  },
  {
    fieldName: "Dropdown",
    fieldTooltipContent: "Let people pick one option from a list you provide.",
    fieldIcon: PanelTopOpen,
  },
  {
    fieldName: "Radio Buttons",
    fieldTooltipContent: "Show all options and let them choose just one.",
    fieldIcon: CircleDot,
  },
  {
    fieldName: "Checkboxes",
    fieldTooltipContent: "Let people select multiple options if needed.",
    fieldIcon: CheckSquare2Icon,
  },
  {
    fieldName: "Date Picker",
    fieldTooltipContent: "Adds a calendar so users can easily choose a date.",
    fieldIcon: CalendarDays,
  },
  {
    fieldName: "Time Picker",
    fieldTooltipContent: "Let users choose a time, like for a call or meeting.",
    fieldIcon: Clock,
  },
  {
    fieldName: "Yes/No Toggle",
    fieldTooltipContent: "A simple switch for yes or no questions.",
    fieldIcon: ToggleRight,
  },
  {
    fieldName: "Hidden Field",
    fieldTooltipContent:
      "Info that gets submitted but isn’t shown to the user like UTM tags or source IDs.",
    fieldIcon: EyeOff,
  },
  {
    fieldName: "File Upload",
    fieldTooltipContent:
      "Let users attach a file — like an image, CV, or document.",
    fieldIcon: Upload,
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
      return new FormFieldFileUpload();
    default:
      return undefined;
  }
};
