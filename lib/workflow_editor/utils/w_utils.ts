import {
  CircleCheck,
  CircleDashedIcon,
  CircleX,
  Loader2,
  LucideIcon,
} from "lucide-react";
import {
  workflowEditorSections,
  workflowEditorToolItems,
} from "../constants/w_constants";
import { NodeTest, WorkflowEditorToolItem } from "../types/w_types";

export const isDynamicInputDataOnly = (content: string) => {
  // Check if the provided content is only a data input. E.g. {{ Variables }}
  return content.startsWith("{{") && content.endsWith("}}");
};

export const getWorkflowToolItemFromLabel = (
  label: string
): WorkflowEditorToolItem | null => {
  const item = workflowEditorToolItems.find((item) => item.label === label);
  if (!item) return null;
  return item;
};

export const getWorkflowSectionFromName = (sectionName: string) => {
  const section = Object.entries(workflowEditorSections).find(
    (s) => s[0] === sectionName
  );
  if (!section) return null;
  return section;
};

export const getNodeTestIcon = (
  status: NodeTest
): { icon: LucideIcon; label: string; iconClassname?: string } => {
  switch (status) {
    case "failed":
      return {
        icon: CircleX,
        label: "Failed",
        iconClassname: "stroke-red-400",
      };
    case "success":
      return {
        icon: CircleCheck,
        label: "Completed",
        iconClassname: "stroke-green-600",
      };
    case "running":
      return {
        icon: Loader2,
        label: "Running",
        iconClassname: "animate-spin text-neutral-500",
      };

    default:
      return {
        icon: CircleDashedIcon,
        label: "—",
      };
  }
};
