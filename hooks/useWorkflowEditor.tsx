import { WorkflowEditorContext } from "@/providers/workflowEditorProvider";
import { useContext } from "react";

export const useWorkflowEditor = () => {
  const context = useContext(WorkflowEditorContext);

  if (!context) {
    throw new Error(
      "useWorkflowEditor must be used within an WorkflowEditorProvider"
    );
  }

  return context;
};
