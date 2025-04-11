import { LucideIcon } from "lucide-react";
import { workflowEditorSections } from "../constants";

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

export type WorkflowEditorToolItem = {
  label: string;
  icon?: LucideIcon;
  logoPath?: string;
  tooltip?: string;
  sectionName: keyof typeof workflowEditorSections;
};

// Workflow Editor Types
export type DroppedToolItem = {
  label: string;
  position?: {
    x: number;
    y: number;
  };
};
