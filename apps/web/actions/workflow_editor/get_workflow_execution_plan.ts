import { getWorkflowDefinition } from "./get_workflow_definition";
import { entryPointNodesLabels } from "@/lib/workflow_editor/utils/w_utils";
import { VsNode } from "@/lib/workflow_editor/classes/node";
import { VsConnection } from "@/lib/workflow_editor/classes/connections";
import { ExecutionPlan } from "@/lib/workflow_editor/types/w_types";
import { useWorkflowEditorStore } from "@/stores/workflowStore";

export const getWorkflowExecutionPlan = (): {
  plan: ExecutionPlan;
  errors: Set<string>;
} => {
  let newExecutionPlan: ExecutionPlan = {};
  const planned = new Set<string>();
  const erroned = new Set<string>();
  const excluded = new Set<string>();

  // Store
  const editor = useWorkflowEditorStore.getState().currentEditor.editor;
  // End Store
  const workflowDefinition = getWorkflowDefinition(editor);

  if (!workflowDefinition)
    throw new Error("Cannot Find Valid Nodes or Connections...");

  const nodes = workflowDefinition.nodes;
  const connections = workflowDefinition.connections;

  if (!nodes || !connections)
    throw new Error("Invalid nodes or connections...");

  // Generate Execution Plan from Workflow definition
  // 1st: Add entry point
  const entryPoints = nodes.filter((n) =>
    entryPointNodesLabels().includes(n.label)
  );
  if (entryPoints.length > 1)
    throw new Error("More than one entry point found...");
  if (entryPoints.length !== 1)
    throw new Error("No entry point found, add one...");

  const entryPoint = entryPoints[0];
  // Check for Entry Point errors
  if (!entryPoint.hasValidInputs()) {
    erroned.add(entryPoint.id);
    // throw new Error("Your entry point contains an error...");
  }

  planned.add(entryPoint.id);
  newExecutionPlan = { 1: [entryPoint] };

  // Add Phases + Branches to the Execution Plan with remaining nodes
  for (let i = 2; i <= nodes.length; i++) {
    let _nodesToAdd = [] as VsNode[];
    let _planned = [] as string[]; // Nodes Ids only

    // Loop through all nodes to find unplanned ones
    nodes.map((node) => {
      // Guard clause: check if node or node.id is invalid
      if (!node || typeof node.id !== "string" || node.id.trim() === "") return;
      const currNodeId = node.id;

      //  If Node has Invalid Inputs: add this node to the Editor Errors
      if (!node.hasValidInputs()) erroned.add(currNodeId);

      // If Node is already planned: skip
      if (planned.has(currNodeId)) return;

      // If the node is among excluded ones: skip
      if (excluded.has(currNodeId)) return;

      // If Node has no incoming connections (aka Orphan): skip & exclude all descendants of this node
      if (getIncomingConnections(currNodeId, connections).length === 0) {
        // Add this node among excluded ones
        excluded.add(currNodeId);
        // Exclude all descendants of this node: since their parent (this node) is not connected
        getDescendantsNodeIds(currNodeId, connections).forEach(
          (descendantNodeId) => {
            excluded.add(descendantNodeId);
          }
        );
        return;
      }

      // If Node has "Incoming Nodes" and they aren't planned yet: skip
      const incomingNodeIds = getIncomingNodeIds(currNodeId, connections);
      const incomingNodeIdsUnplanned = incomingNodeIds.filter(
        (nId) => planned.has(nId) === false
      );
      if (incomingNodeIdsUnplanned.length > 0) return;

      // Else Add "this" Node to planned and ExecutionPlan
      _planned.push(currNodeId);
      _nodesToAdd.push(node);
    });

    // Add Nodes to Planned with their Phase
    if (_nodesToAdd.length > 0) {
      _planned.forEach((nId) => planned.add(nId));
      newExecutionPlan[i] = _nodesToAdd;
    }
  }

  console.log(
    `⚡ Generating execution plan...`,
    `\n⛔ Excluded:`,
    excluded,
    `\n🔆 Execution Phases:`,
    newExecutionPlan
  );

  // Return execution plan
  return {
    plan: newExecutionPlan,
    errors: erroned,
  };
};

const getIncomingNodeIds = (
  nodeId: string,
  connections: VsConnection<VsNode>[]
): string[] => {
  const _incomingNodeIds = [] as string[];

  // Get all related connections
  const linkedConnections = connections.filter((c) => c.target === nodeId);

  // Get incoming nodes
  linkedConnections.forEach((conn) => {
    _incomingNodeIds.push(conn.source);
  });

  return _incomingNodeIds;
};

const getIncomingConnections = (
  nodeId: string,
  connections: VsConnection<VsNode>[]
) => {
  // A Node is considered as orphan if it has no incoming connections
  // This apply to all nodes: and Entry Point should be excluded
  return connections.filter((c) => c.target === nodeId);
};

const getOutgoingConnections = (
  nodeId: string,
  connections: VsConnection<VsNode>[]
) => {
  // Get all outgoing connections
  return connections.filter((c) => c.source === nodeId);
};

const getDescendantsNodeIds = (
  nodeId: string,
  connections: VsConnection<VsNode>[]
): string[] => {
  const _descendantsNodeIds = new Set<string>();

  const outgoingConnections = getOutgoingConnections(nodeId, connections);
  const descendantNodeIds = outgoingConnections.map((c) => c.target);
  if (descendantNodeIds.length > 0) {
    descendantNodeIds.forEach((descendantNodeId) => {
      _descendantsNodeIds.add(descendantNodeId);

      // From this descendant: fetch all descendants of this descendant
      const futureDescendants = getDescendantsNodeIds(
        descendantNodeId,
        connections
      );
      if (futureDescendants.length > 0) {
        futureDescendants.forEach((fD) => _descendantsNodeIds.add(fD));
      }
    });
  }
  return [..._descendantsNodeIds];
};
