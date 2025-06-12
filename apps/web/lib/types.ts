import { LucideIcon } from "lucide-react";
import React from "react";

// General Type

// Makes all properties in T nullable
export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

// Remove readonly from T:
export type DeepWritable<T> = { -readonly [P in keyof T]: DeepWritable<T[P]> };

// -------------------------------------------------------------------------

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
