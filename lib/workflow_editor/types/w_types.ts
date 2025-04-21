import { LucideIcon } from "lucide-react";
import { vsAnyPrimitives, vsAnyRawTypes, vsStructuredData } from "./data_types";
import { vsCriteria } from "./data_types_criteria";
import {
  workflowEditorSections,
  workflowEditorToolItems,
} from "../constants/w_constants";
import { Nullable } from "@/lib/types";

export type OperationItem = {
  operationName: string;
  toolItemName: (typeof workflowEditorToolItems)[number]["label"];
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
  loopThrough?: "All items" | number;
};

export type OperationThroughput = vsStructuredData;

export type OperationParamItem = {
  paramName: string;
  paramInputPlaceholder?: string;
  paramDescription: string;
  valuesToPickFrom?: number[] | string[] | boolean[];
} & (vsAnyRawTypes | vsAnyPrimitives);

export type WorkflowEditorToolItem = {
  label: string;
  icon?: LucideIcon;
  logoPath?: string;
  tooltip?: string;
  sectionName: keyof typeof workflowEditorSections;
  operations: OperationItem[];
};

// Workflow Editor Types
export type DroppedToolItem = {
  label: string;
  position?: {
    x: number;
    y: number;
  };
};

// --------------------------------------------------------
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
