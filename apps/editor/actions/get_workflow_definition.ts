import { WorkflowDefinition, Schemes } from "@vscrape/engine/src";
import { NodeEditor } from "rete";

export const getWorkflowDefinition = (
  editor?: NodeEditor<Schemes>
): WorkflowDefinition | undefined => {
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
