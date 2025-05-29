import { BehaviorSubject } from "rxjs";
import {
  VsFormInputFieldType,
  VsFormInputFieldTypeUnion,
} from "../types/w_types";
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

export class FormFieldBlock {
  protected stream: BehaviorSubject<FormFieldBlock>;

  private _id: string;
  private _fieldName: string;
  private _fieldLabel: string;
  private _fieldDescription?: string;
  private _fieldPlaceholder?: string;
  private _fieldDefaultPlaceholder?: string;
  private _fieldDefaultDescription?: string;
  private _fieldValueToPickFrom?: string[];
  private _isOptional?: boolean;
  private _isHidden?: boolean;
  private _fieldValue: any;
  private _fieldType: VsFormInputFieldTypeUnion["type"];

  constructor(formField: Omit<VsFormInputFieldType, "id">) {
    this._id = crypto.randomUUID();
    this._fieldName = formField.fieldName;
    this._fieldLabel = formField.fieldLabel;
    this._fieldType = formField.type;
    this._fieldValue = formField.value;
    this._fieldDescription = formField.fieldDescription;
    this._fieldPlaceholder = formField.fieldPlaceholder;
    this._fieldDefaultPlaceholder = formField.fieldDefaultPlaceholder;
    this._fieldDefaultDescription = formField.fieldDefaultDescription;
    this._fieldValueToPickFrom = formField.fieldValueToPickFrom;
    this._isOptional = formField.isOptional;
    this._isHidden = formField.isHidden;

    this.stream = new BehaviorSubject<FormFieldBlock>(this);
  }

  // Return the latest class instance's data in readonly
  stream$() {
    return this.stream.asObservable();
  }

  get id() {
    return this._id;
  }

  get fieldName() {
    return this._fieldName;
  }

  set fieldLabel(value: string) {
    this._fieldLabel = value;
    // Notify all subscribers
    this.stream.next(this);
  }

  get fieldLabel() {
    return this._fieldLabel;
  }

  get fieldType() {
    return this._fieldType;
  }

  set fieldDescription(value: string) {
    this._fieldDescription = value;
    // Notify all subscribers
    this.stream.next(this);
  }
  get fieldDescription(): string | undefined {
    return this._fieldDescription;
  }

  get fieldDefaultDescription(): string | undefined {
    return this._fieldDefaultDescription;
  }

  set fieldPlaceholder(value: string) {
    this._fieldPlaceholder = value;
    // Notify all subscribers
    this.stream.next(this);
  }
  get fieldPlaceholder(): string | undefined {
    return this._fieldPlaceholder;
  }
  get fieldDefaultPlaceholder(): string | undefined {
    return this._fieldDefaultPlaceholder;
  }

  set fieldValueToPickFrom(value: string[]) {
    this._fieldValueToPickFrom = value;
    // Notify all subscribers
    this.stream.next(this);
  }

  get fieldValueToPickFrom(): string[] | undefined {
    return this._fieldValueToPickFrom;
  }

  set isOptional(value: boolean) {
    this._isOptional = value;
    // Notify all subscribers
    this.stream.next(this);
  }

  get isOptional(): boolean | undefined {
    return this._isOptional;
  }

  set isHidden(value: boolean) {
    this._isHidden = value;
    // Notify all subscribers
    this.stream.next(this);
  }

  get isHidden(): boolean | undefined {
    return this._isHidden;
  }

  set fieldValue(value: any) {
    this._fieldValue = value;
    // Notify all subscribers
    this.stream.next(this);
  }

  get fieldValue(): any {
    return this._fieldValue;
  }
}
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------

export class FormFieldTextInput extends FormFieldBlock {
  public _isTextArea?: boolean;
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
    this._isTextArea = isMultiline;
  }

  set isMultiline(isMultiline: boolean) {
    this._isTextArea = isMultiline;
    this.stream.next(this);
  }
  get isMultiline(): boolean | undefined {
    return this._isTextArea;
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
  public _acceptedExtensions: string[] = [];
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

  set acceptedExtensions(extensionsList: string[]) {
    this._acceptedExtensions = extensionsList;
    this.stream.next(this);
  }

  get acceptedExtensions(): string[] {
    return this._acceptedExtensions;
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
