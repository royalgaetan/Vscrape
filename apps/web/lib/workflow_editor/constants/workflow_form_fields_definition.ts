import {
  AtSign,
  CalendarDays,
  CheckSquare2Icon,
  CircleDot,
  Clock,
  EyeOff,
  Hash,
  PanelTopOpen,
  PenLine,
  Phone,
  ToggleRight,
  Upload,
} from "lucide-react";
import { VsFormFieldItemType } from "../types/w_types";

export const workflowFormFieldItems: VsFormFieldItemType[] = [
  // Form Field: TextInput
  {
    fieldName: "Text Field",
    fieldLabel: "Text Input",
    fieldPlaceholder: "",
    fieldDescription: "",
    fieldDefaultPlaceholder: `Type here...`,
    type: "primitive/text",
    value: "",
    isMultiline: false,
    isOptional: false,
    //
    fieldTooltipContent:
      "Let people type a short answer, like a name or title.",
    fieldIcon: PenLine,
  },
  //
  //
  //
  //
  // Form Field: Email Input
  {
    fieldName: "Email Field",
    fieldLabel: "Email",
    fieldPlaceholder: "",
    fieldDescription: "",
    fieldDefaultPlaceholder: "e.g. abc@company.com",
    type: "primitive/emailUrl",
    value: "",
    isOptional: false,
    //
    fieldTooltipContent:
      "Ask for their email address (we’ll check it looks correct).",
    fieldIcon: AtSign,
  },
  //
  //
  //
  //
  // Form Field: Phone Input
  {
    fieldName: "Phone Number Field",
    fieldLabel: "Phone Number",
    fieldPlaceholder: "",
    fieldDescription: "",
    fieldDefaultPlaceholder: "e.g. +1 234 567 890",
    type: "primitive/tel",
    value: "",
    isOptional: false,
    //
    fieldTooltipContent:
      "Collect a phone number so you can call or message them.",
    fieldIcon: Phone,
  },
  //
  //
  //
  //
  // Form Field: Number Input
  {
    fieldName: "Number Field",
    fieldLabel: "Number",
    fieldPlaceholder: "",
    fieldDescription: "",
    fieldDefaultPlaceholder: "Enter a number",
    type: "primitive/number",
    value: 0,
    isOptional: true,
    //
    fieldTooltipContent:
      "Only allows numbers — perfect for age, quantity, or budget.",
    fieldIcon: Hash,
  },
  //
  //
  //
  //

  // Form Field: Select Input
  {
    fieldName: "Dropdown",
    fieldLabel: "Select an option",
    fieldPlaceholder: undefined,
    fieldDescription: "Choose from a list of options",
    fieldDefaultDescription: "",
    type: "primitive/text",
    fieldValueToPickFrom: ["Option A", "Option B", "Option C"],
    value: "",
    isOptional: true,
    //
    fieldTooltipContent: "Let people pick one option from a list you provide.",
    fieldIcon: PanelTopOpen,
  },
  //
  //
  //
  //
  // Form Field: Radio Input
  {
    fieldName: "Radio Buttons",
    fieldLabel: "Radio Buttons",
    fieldPlaceholder: undefined,
    fieldDescription: "Choose one option",
    fieldDefaultDescription: "",
    type: "primitive/radio",
    fieldValueToPickFrom: ["Option A", "Option B"],
    value: "",
    isOptional: true,
    //
    fieldTooltipContent: "Show all options and let them choose just one.",
    fieldIcon: CircleDot,
  },
  //
  //
  //
  //
  // Form Field: Checkbox Input
  {
    fieldName: "Checkboxes",
    fieldLabel: "Checkboxes",
    fieldPlaceholder: undefined,
    fieldDescription: "Select one or more options",
    fieldDefaultDescription: "",
    type: "primitive/checkbox",
    fieldValueToPickFrom: ["Option A", "Option B", "Option C"],
    value: [""],
    isOptional: true,
    //
    fieldTooltipContent: "Let people select multiple options if needed.",
    fieldIcon: CheckSquare2Icon,
  },
  //
  //
  //
  //
  // Form Field: Switch Input
  {
    fieldName: "Switch",
    fieldLabel: "Toggle to select",
    fieldPlaceholder: undefined,
    fieldDescription: "Toggle between make a choice.",
    fieldDefaultDescription: "",
    type: "primitive/switch",
    value: false,
    isOptional: true,
    //
    fieldTooltipContent: "A simple switch for yes or no questions.",
    fieldIcon: ToggleRight,
  },
  //
  //
  //
  //

  // Form Field: DatePicker Input
  {
    fieldName: "Date Picker",
    fieldLabel: "Select a date",
    fieldPlaceholder: "",
    fieldDescription: "",
    fieldDefaultPlaceholder: "Pick a date",
    type: "primitive/dateTime",
    value: "",
    isOptional: true,
    //
    fieldTooltipContent: "Adds a calendar so users can easily choose a date.",
    fieldIcon: CalendarDays,
  },
  //
  //
  //
  //
  // Form Field: TimePicker Input
  {
    fieldName: "Time Picker",
    fieldLabel: "Select a time",
    fieldPlaceholder: "",
    fieldDescription: "",
    fieldDefaultPlaceholder: "Pick a time",
    type: "primitive/milliseconds",
    value: 0,
    isOptional: true,
    //
    fieldTooltipContent: "Let users choose a time, like for a call or meeting.",
    fieldIcon: Clock,
  },
  //
  //
  //
  //

  // Form Field: Hidden Input
  {
    fieldName: "Hidden Field",
    fieldLabel: "Hidden Field",
    fieldPlaceholder: undefined,
    fieldDescription: undefined,
    isHidden: true,
    type: "primitive/hidden",
    value: "",
    //
    fieldTooltipContent:
      "Info that gets submitted but isn’t shown to the user like UTM tags or source IDs.",
    fieldIcon: EyeOff,
  },
  //
  //
  //
  //
  // Form Field: FileUpload Input
  {
    fieldName: "File Upload",
    fieldLabel: "Upload a file",
    fieldPlaceholder: "",
    fieldDescription: "",
    fieldDefaultPlaceholder: "Drag and drop your file here",
    type: "image/png",
    value: "" as any,
    name: "" as any,
    sizeInBytes: 0,
    isOptional: true,
    acceptedFileExtensions: [] as string[],
    //
    fieldTooltipContent:
      "Let users attach a file — like an image, CV, or document.",
    fieldIcon: Upload,
  },
] as const;
