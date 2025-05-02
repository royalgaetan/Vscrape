import {
  workflowEditorSections,
  workflowEditorToolItems,
} from "../constants/w_constants";
import { WorkflowEditorToolItem } from "../types/w_types";

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
