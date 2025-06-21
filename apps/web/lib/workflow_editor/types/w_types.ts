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
import { OperationBlock } from "../classes/operation_block";
import { CronBlock } from "../classes/cron_block";
import { ManualBlock } from "../classes/manual_block";
import { WebhookBlock } from "../classes/webhook_block";
import { WaitBlock } from "../classes/wait_block";
import { SetVariablesBlock } from "../classes/setVariables_block";
import { FormBlock } from "../classes/form_field_block";
import { VsNode } from "../classes/node";
import { VsConnection } from "../classes/connections";

export type VsNodeType = {
  id?: string;
  label: string;
  iconColor: string;
  icon?: LucideIcon;
  logoPath?: string;
  tooltip?: string;
  isDisabled?: boolean;
  sectionName: keyof typeof workflowEditorSections;
} & (
  | NodeWithOperationBlock
  | NodeWithFormFieldBlock
  | NodeWithCronBlock
  | NodeWithManualBlock
  | NodeWithWebhookBlock
  | NodeWithWaitBlock
  | NodeWithSetVarialbesBlock
  | NodeWithBranchBlock
  | NodeWithPreviewBlock
);
export const nodeBlockTypeNames = [
  "operation",
  "formField",
  "cron",
  "manual",
  "webhook",
  "wait",
  "setVariables",
  "branch",
  "preview",
] as const;

export type NodeWithOperationBlock = {
  blockType: (typeof nodeBlockTypeNames)["0"];
  block: OperationBlock;
};

export type NodeWithFormFieldBlock = {
  blockType: (typeof nodeBlockTypeNames)["1"];
  block: FormBlock;
};

export type NodeWithCronBlock = {
  blockType: (typeof nodeBlockTypeNames)["2"];
  block: CronBlock | undefined;
};

export type NodeWithManualBlock = {
  blockType: (typeof nodeBlockTypeNames)["3"];
  block: ManualBlock;
};

export type NodeWithWebhookBlock = {
  blockType: (typeof nodeBlockTypeNames)["4"];
  block: WebhookBlock;
};

export type NodeWithWaitBlock = {
  blockType: (typeof nodeBlockTypeNames)["5"];
  block: WaitBlock;
};
export type NodeWithSetVarialbesBlock = {
  blockType: (typeof nodeBlockTypeNames)["6"];
  block: SetVariablesBlock;
};
export type NodeWithBranchBlock = {
  blockType: (typeof nodeBlockTypeNames)["7"];
  block: OperationBlock; // as BranchBlock
};
export type NodeWithPreviewBlock = {
  blockType: (typeof nodeBlockTypeNames)["8"];
  block: OperationBlock; // as PreviewBlock
};

// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------

export type VsOperationItemType = {
  id?: string;
  //
  operationItemName: string;
  operationItemDescription: string;
  nodeName: (typeof workflowEditorNodes)[number]["label"];
  itemParams?: (OperationItemParam | OperationItemParam[])[];
  itemOutputData?: OutputDataType; // An Output here can be: of any type
  skipDuplicate?: boolean;
  isDisabled?: boolean;
  loopThrough?: "All items" | number | boolean;
};

export type VsFormFieldItemType = {
  id?: string;
  fieldTooltipContent: string;
  fieldIcon: LucideIcon;
  //
  fieldName: string;
  fieldLabel: string;
  fieldDescription?: string;
  fieldPlaceholder?: string;
  fieldDefaultPlaceholder?: string;
  fieldDefaultDescription?: string;
  fieldValueToPickFrom?: string[];
  isOptional?: boolean;
  isHidden?: boolean;
  isMultiline?: boolean;
  acceptedFileExtensions?: string[];
} & VsFormInputFieldTypeUnion;
export type VsFormInputFieldTypeUnion =
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

export type VsCronBlockType = {
  id?: string;
  configMinute: string;
  configHour: string;
  configDayOfMonth: string;
  configMonth: string;
  configDayOfWeek: string;
  configTimezone?: string;
  configStartDate?: Date;
  configEndDate?: Date;
};

// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------

export type OutputDataType = vsStructuredData;

export type OperationItemParam = {
  id?: string;
  paramName: string;
  paramInputPlaceholder?: string;
  paramDescription: string;
  valuesToPickFrom?: number[] | string[] | boolean[];
  isOptional?: boolean;
} & (vsAnyRawTypes | vsAnyPrimitives);

export type SingleVariableAssignation = { varName: string; varValue: any };

// Workflow Editor Types
export type nodeDropPosition = { x: number; y: number } | "center";
export type DroppedToolItem = {
  label: string;
  position?: nodeDropPosition;
};
export type MoveBlockDirection = "Up" | "Down";

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
  T extends (vsAnyPrimitives | vsAnyRawTypes)["type"],
> = {
  inputID: any;
  keyId: string;
} & Nullable<vsCriteria<T>>;

export type RecordArray = { key: any; value: any }[];
export type OperationValuesToPickFromType = number[] | string[] | boolean[];
export type OperationMoreOptionType =
  | "filters"
  | "loopThrough"
  | "skipDuplicate";

export type PreviousInputDataType = {
  label: string;
  tooltip: string;
  dataTransfer: string;
  data?: OutputDataType;
};

// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------

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

// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------

// For: ExecutionPlan = { Phase1: [NodeA_task1, NodeA_task2], Phase2: [NodeB_task1, NodeC_task1], etc... }
export type ExecutionPlan = Record<number, VsNode[]>;

export type WorkflowDefinition = {
  nodes: VsNode[];
  connections: VsConnection<VsNode>[];
};
