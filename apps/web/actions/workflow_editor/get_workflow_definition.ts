import { useWorkflowEditorStore } from "@/stores/workflowStore";

export const getWorkflowDefinition = (): string | undefined => {
  // Store
  const editor = useWorkflowEditorStore.getState().currentEditor.editor;
  // End Store
  if (!editor) return;
  const nodes = editor.getNodes();
  const connections = editor.getConnections();

  if (!nodes || nodes.length < 1) return;

  const json = {
    nodes: nodes.map((n) => n.toObject()),
    connections: connections.map((c) => c.toObject()),
  };

  return JSON.stringify(json);
};
