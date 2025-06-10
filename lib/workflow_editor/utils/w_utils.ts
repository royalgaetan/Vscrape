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
import { NodeEditor } from "rete";
import { structures } from "rete-structures";
import { Schemes } from "@/app/(protected)/w/[workflowId]/editor/_components/w_editor";

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

export const buildAdjacency = (
  editor: NodeEditor<Schemes>
): Map<string, Set<string>> => {
  const graph = structures(editor);
  const adj = new Map<string, Set<string>>();

  editor.getNodes().forEach((n) => adj.set(n.id, new Set()));

  graph.connections().forEach((conn) => {
    const { source, target } = conn;
    adj.get(source)?.add(target);
  });

  return adj;
};

export const hasCycleInAdjacency = (adj: Map<string, Set<string>>): boolean => {
  const White = 0,
    Grey = 1,
    Black = 2;
  const colors = new Map<string, number>();
  adj.forEach((_, id) => colors.set(id, White));

  const dfs = (node: string): boolean => {
    colors.set(node, Grey);
    for (const neighbor of adj.get(node)!) {
      const c = colors.get(neighbor);
      if (c === Grey) return true; // Found a back edge → cycle
      if (c === White && dfs(neighbor)) return true;
    }
    colors.set(node, Black);
    return false;
  };

  for (const id of adj.keys()) {
    if (colors.get(id) === White && dfs(id)) {
      return true;
    }
  }

  return false;
};

export const entryPointNodesLabels = workflowEditorNodes
  .filter((w) => w.sectionName === "Entry Point")
  .map((w) => w.label);

export const hasAlreadyEntryPoint = (editor: NodeEditor<Schemes>): boolean => {
  const found = editor
    .getNodes()
    .filter((n) => entryPointNodesLabels.includes(n.label));

  console.log("🐔 entryPointsLabels", entryPointNodesLabels);
  console.log(
    "🍌 found",
    found.length,
    found.map((a) => a.label)
  );
  if (found.length >= 1) return true;
  else return false;
};
