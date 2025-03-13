import { LucideIcon } from "lucide-react";
import { appFeatures } from "./constants";
import React from "react";

export type sidebarPathType = {
  name: string;
  path: string;
  icon: LucideIcon;
  type: "expandable" | "icon-only" | "main";
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
