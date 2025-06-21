import { WorkflowDefinition } from "@/lib/workflow_editor/types/w_types";
import { useWorkflowEditorStore } from "@/stores/workflowStore";

export const getWorkflowDefinition = (): WorkflowDefinition | undefined => {
  // Store
  const editor = useWorkflowEditorStore.getState().currentEditor.editor;

  // End Store
  if (!editor) return;
  const nodes = editor.getNodes();
  const connections = editor.getConnections();

  if (!nodes || nodes.length < 1) return;

  const wDefinition: WorkflowDefinition = {
    nodes: nodes,
    connections: connections,
  };

  return wDefinition;
};
