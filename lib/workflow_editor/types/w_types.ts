import { LucideIcon } from "lucide-react";
import {
  vsAnyPrimitives,
  vsAnyRawTypes,
  vsCheckbox,
  vsDateTime,
  vsEmailURL,
  vsHidden,
  vsNumber,
  vsRadio,
  vsStructuredData,
  vsSwitch,
  vsTel,
  vsText,
  vsTimeMs,
} from "./data_types";
import { vsCriteria } from "./data_types_criteria";
import {
  workflowEditorNodes,
  workflowEditorSections,
} from "../constants/w_constants";
import { Nullable } from "@/lib/types";
import { OperationItem } from "../classes/operation_item";
import { VsFormInputField } from "../classes/form_field_item";

export type WorkflowEditorNode = {
  label: string;
  iconColor: string;
  icon?: LucideIcon;
  logoPath?: string;
  tooltip?: string;
  isDisabled?: boolean;
  isSpecialNode?: boolean;
  sectionName: keyof typeof workflowEditorSections;
} & (NodeWithOperationBlocks | NodeWithFormFieldBlocks);
export type NodeBlockStringType = "operation" | "formField";

export type NodeWithOperationBlocks = {
  blockType: "operation";
  blocks: OperationItem[];
};

export type NodeWithFormFieldBlocks = {
  blockType: "formField";
  blocks: VsFormInputField[];
};

export type OperationItemType = {
  id: string;
  operationName: string;
  operationDescription: string;
  nodeName: (typeof workflowEditorNodes)[number]["label"];
  params?: (OperationParamItem | OperationParamItem[])[];
  inputs?: {
    // An Input key here can be: previousOperationData OR previousNodeData OR variables
    previousOperationData?: OperationThroughput;
    previousNodeData?: OperationThroughput;
    variables?: OperationThroughput;
  };
  inputFilters?: OperationFilterType<
    (vsAnyPrimitives | vsAnyRawTypes)["type"]
  >[]; // Many filters can be applied to many (incoming) inputs
  outputs?: OperationThroughput; // An Output here can be: of any type
  skipDuplicate?: boolean;
  loopThrough?: "All items" | number | boolean;
};

export type VsFormInputFieldType = {
  id: string;
  fieldName: string;
  fieldDescription: string;
  fieldPlaceholder: string;
  fieldValueToPickFrom?: string[];
  isOptional?: boolean;
} & VsFormInputFieldTypeUnion;
type VsFormInputFieldTypeUnion =
  | vsText
  | vsEmailURL
  | vsTel
  | vsNumber
  | vsRadio
  | vsSwitch
  | vsCheckbox
  | vsDateTime
  | vsTimeMs
  | vsHidden
  | vsAnyRawTypes;

export type OperationThroughput = vsStructuredData;

export type OperationParamItem = {
  paramName: string;
  paramInputPlaceholder?: string;
  paramDescription: string;
  valuesToPickFrom?: number[] | string[] | boolean[];
  isOptional?: boolean;
} & (vsAnyRawTypes | vsAnyPrimitives);

// Workflow Editor Types
export type nodeDropPosition = { x: number; y: number } | "center";
export type DroppedToolItem = {
  label: string;
  position?: nodeDropPosition;
};

// --------------------------------------------------------
export type SharedOutputSelectedItem = {
  fullPath: string;
  type: (vsAnyPrimitives | vsAnyRawTypes)["type"];
};

export type TokenInputType = {
  inputTokenID?: string;
  inputTokenValue?: string;
};

export type ExtendedOperationFilterType = OperationFilterType<
  (vsAnyPrimitives | vsAnyRawTypes)["type"]
>;

export type OperationFilterType<
  T extends (vsAnyPrimitives | vsAnyRawTypes)["type"]
> = {
  inputID: any;
  keyId: string;
} & Nullable<vsCriteria<T>>;
export type RecordArray = { key: string; value: any }[];
export type OperationValuesToPickFromType = number[] | string[] | boolean[];
export type OperationMoreOptionType =
  | "filters"
  | "loopThrough"
  | "skipDuplicate";

export type PreviousInputDataType = {
  label: string;
  tooltip: string;
  dataTransfer: string;
};

export type RunResultsType = "failed" | "success" | "paused" | "running";

export type RunItemType = {
  runId: string;
  startedAt: Date;
  creditConsumed: number;
  status: RunResultsType;
  isInternalTest: boolean;
};

export type PhaseItemType = {
  title: string;
  status: RunResultsType;
  durationMs: number;
  startedAt: Date;
  creditConsumed: number;
  dataInputs: PhaseInput[];
  dataOutputs: PhaseOutput[];
  logs: PhaseLog[];
};

export type PhaseInput = {
  label: string;
  type: "JSON" | boolean | string | number | null;
  value: any;
};

export type PhaseOutput = {
  label: string;
  type: "boolean" | "string" | "number" | "null" | "JSON";
  value: any;
};

export type PhaseLogLevel = "Info" | "Alert" | "Success" | "Failed";
export type PhaseLog = {
  time: Date;
  level: PhaseLogLevel;
  message: string;
};

export type NodeTest = "failed" | "success" | "running";
