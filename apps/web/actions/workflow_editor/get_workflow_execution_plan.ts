import { getWorkflowDefinition } from "./get_workflow_definition";
import { entryPointNodesLabels } from "@/lib/workflow_editor/utils/w_utils";
import { VsNode } from "@/lib/workflow_editor/classes/node";
import { VsConnection } from "@/lib/workflow_editor/classes/connections";
import { ExecutionPlan } from "@/lib/workflow_editor/types/w_types";

export const getWorkflowExecutionPlan = (): ExecutionPlan => {
  let newExecutionPlan: ExecutionPlan = {};
  const planned = new Set();
  let hasError = false;

  const workflowDefinition = getWorkflowDefinition();

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
  if (!entryPoint.hasValidInputs())
    throw new Error("Your entry point contains an error...");

  planned.add(entryPoint.id);
  newExecutionPlan = { 1: [entryPoint] };

  // Add Phases + Branches to the Execution Plan with remaining nodes
  for (let i = 1; i < nodes.length && planned.size !== nodes.length; i++) {
    let _nodesToAdd = [] as VsNode[];
    let _planned = [] as string[]; // Nodes Ids only
    const _hasError = [] as boolean[];

    // Loop through all nodes to find unplanned ones
    nodes.map((node) => {
      // Guard clause: check if node or node.id is invalid
      if (!node || typeof node.id !== "string" || node.id.trim() === "") return;
      const currNodeId = node.id;

      // If Node is already planned: skip
      if (planned.has(currNodeId)) return;

      // If Node has no connection (aka Orphan): skip
      if (!hasConnections(currNodeId, connections)) return;

      // If Node has "Incoming Nodes" and they aren't planned yet: skip
      const incomingNodeIds = getIncomingNodeIds(currNodeId, connections);
      const incomingNodeIdsUnplanned = incomingNodeIds.filter(
        (nId) => planned.has(nId) === false
      );
      if (incomingNodeIdsUnplanned.length > 0) return;

      //  If Node has Invalid Inputs: break the loop
      if (!node.hasValidInputs()) _hasError.push(true);

      // Else Add "this" Node to planned and ExecutionPlan
      _planned.push(currNodeId);
      _nodesToAdd.push(node);
    });

    // Check if at any stage there's "Input Error" inside one or more node
    console.log("_hasError", _hasError);
    if (_hasError.some((err) => err === true)) {
      hasError = true;
      break;
    }

    // Add Nodes to Planned with their Phase
    if (_nodesToAdd.length > 0) {
      _planned.forEach((nId) => planned.add(nId));
      newExecutionPlan[i] = _nodesToAdd;
    }
  }

  if (hasError) {
    throw new Error("An error occured while generating the execution plan...");
  } else {
    console.log(
      `⚡ Generating execution plan...\n`,
      `🔆 Execution Phases:`,
      newExecutionPlan
    );

    // Return execution plan
    return newExecutionPlan;
  }
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

const hasConnections = (
  nodeId: string,
  connections: VsConnection<VsNode>[]
): boolean => {
  // Get all related connections
  const linkedConnections = connections.filter(
    (c) => c.target === nodeId || c.source === nodeId
  );
  return linkedConnections.length > 0;
};
