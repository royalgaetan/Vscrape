import {
  CircleCheck,
  CircleDashedIcon,
  CircleX,
  Loader2,
  LucideIcon,
} from "lucide-react";
import {
  workflowEditorNodes,
  workflowEditorSections,
} from "../constants/w_constants";
import { NodeTest, VsNodeType } from "../types/w_types";
import { WORKFLOW_COLORS } from "@/lib/colors_utils";
import { VsNode } from "../classes/node";
import { cloneDeep } from "lodash";

export const isDynamicInputDataOnly = (content: string) => {
  // Check if the provided content is only a data input. E.g. {{ Variables }}
  return content.startsWith("{{") && content.endsWith("}}");
};

export const getVsNodeFromLabel = (label: string): VsNode | null => {
  const node = cloneDeep(
    workflowEditorNodes.find((node) => node.label === label)
  );
  if (!node) return null;
  const vsNode = new VsNode({
    iconColor: getWorkflowSectionColor(node.sectionName),
    ...node,
  } as VsNodeType);
  return vsNode;
};

export const getWorkflowSectionColor = (sectionName: string): string => {
  const section = Object.entries(workflowEditorSections).find(
    (s) => s[0] === sectionName
  );
  if (!section) return WORKFLOW_COLORS.slate;
  return section[1].iconColor;
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
