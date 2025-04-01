import { LucideIcon } from "lucide-react";
import React from "react";

export type sidebarPathType = {
  name: string;
  path: string;
  icon: LucideIcon;
  type: "expandable" | "icon-only" | "main";
};

export type userProfile = {
  name: string;
  avatar: string | undefined;
};

export type ChatBubbleFrom = "user" | "model";

export type ChatReply = {
  from: ChatBubbleFrom;
  content: React.ReactNode;
  createdAt: Date;
};

export type knowledgeBase = {
  name: string;
  id: string;
};

export type planNames = "Free" | "Plus" | "Business";

export type PlanType = {
  name: planNames;
  membershipPrice: string;
  isCurrent: boolean;
  description: string;
};

export type AppsConnectionType = {
  appLogoPath: string;
  appName: string;
  description: string;
};

export type ApiKeyType = {
  icon: React.ReactNode;
  name: string;
  key: string;
  status: "Active" | "Revoked";
  lastUsedAt?: Date;
  action: React.ReactNode;
};

export type WebhookType = {
  icon: React.ReactNode;
  name: string;
  endpointUrl: string;
  status: "Active" | "Disabled";
  eventTriggers: string[];
  action: React.ReactNode;
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
  type: boolean | string | number | null | "JSON";
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
