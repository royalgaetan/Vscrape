import {
  VsFormInputFieldType,
  VsFormInputFieldTypeUnion,
} from "../types/w_types";
import { vsAnyRawTypes } from "../types/data_types";
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
  Phone,
  ToggleRight,
  Upload,
  User,
} from "lucide-react";

export class FormFieldBlock {
  public id: string;
  public fieldName: string;
  public fieldLabel: string;
  public fieldDescription?: string;
  public fieldPlaceholder?: string;
  public fieldDefaultPlaceholder?: string;
  public fieldDefaultDescription?: string;
  public fieldValueToPickFrom?: string[];
  public isOptional?: boolean;
  public isHidden?: boolean;
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
    this.fieldDefaultPlaceholder = formField.fieldDefaultPlaceholder;
    this.fieldDefaultDescription = formField.fieldDefaultDescription;
    this.fieldValueToPickFrom = formField.fieldValueToPickFrom;
    this.isOptional = formField.isOptional;
    this.isHidden = formField.isHidden;
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
      fieldLabel: "Text",
      fieldPlaceholder: "",
      fieldDescription: "",
      fieldDefaultPlaceholder: `${
        isMultiline ? "Write your message here..." : "Type here..."
      }`,
      type: "primitive/text",
      value: "",
      isOptional: false,
    });
    this.isTextArea = isMultiline;
  }
}

export class FormFieldEmailInput extends FormFieldBlock {
  constructor() {
    super({
      fieldName: "Email Field",
      fieldLabel: "",
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
      fieldDescription: "",
      fieldDefaultDescription: "Choose from a list of options",
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
      fieldDescription: "",
      fieldDefaultDescription: "Choose one option",
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
      fieldDescription: "",
      fieldDefaultDescription: "Select one or more options",
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
      fieldDescription: "",
      fieldDefaultDescription: "Toggle between yes or no",
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
      fieldLabel: "",
      fieldPlaceholder: undefined,
      fieldDescription: undefined,
      isHidden: true,
      type: "primitive/hidden",
      value: "",
    });
  }
}

export class FormFieldFileUpload extends FormFieldBlock {
  public acceptedExtensions: vsAnyRawTypes["type"][] = [];
  constructor({
    fileChoosenType,
    acceptedExtensions,
  }: {
    acceptedExtensions: vsAnyRawTypes["type"][];
    fileChoosenType: vsAnyRawTypes["type"];
  }) {
    super({
      fieldName: "File Upload",
      fieldLabel: "Upload a file",
      fieldPlaceholder: "",
      fieldDescription: "",
      fieldDefaultPlaceholder: "Drag and drop your file here",
      type: fileChoosenType,
      value: "",
      isOptional: true,
    });
    this.acceptedExtensions = acceptedExtensions;
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
    fieldIcon: User,
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
      return new FormFieldFileUpload({
        fileChoosenType: "image/png",
        acceptedExtensions: [],
      });
    default:
      return undefined;
  }
};
