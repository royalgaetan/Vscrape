import { Schemes } from "@/app/(protected)/w/[workflowId]/editor/_components/w_editor";
import { NodeEditor } from "rete";

export const getWorkflowDefinition = (
  editor: NodeEditor<Schemes>
): string | undefined => {
  const nodes = editor.getNodes();
  const connections = editor.getConnections();

  if (!nodes || nodes.length < 1) return;

  const json = {
    nodes: nodes.map((n) => n.toJSON()),
    // connections: connections.map((c) => c.toJSON),
  };

  console.log("Def.", json);

  return JSON.stringify(json);
};
