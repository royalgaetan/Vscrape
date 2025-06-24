import { Schemes } from "@/app/(protected)/w/[workflowId]/editor/_components/w_editor";
import { WorkflowDefinition } from "@/lib/workflow_editor/types/w_types";
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
