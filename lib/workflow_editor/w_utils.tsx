import { string } from "zod";
import { workflowEditorSections, workflowEditorToolItems } from "../constants";
import { WorkflowEditorToolItem } from "./w_types";

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
