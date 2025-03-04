import { LucideIcon } from "lucide-react";

export type sidebarPathType = {
  name: string;
  path: string;
  icon: LucideIcon;
  type: "expandable" | "icon-only" | "main";
};
