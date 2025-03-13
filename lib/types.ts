import { LucideIcon } from "lucide-react";
import { appFeatures } from "./constants";

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
