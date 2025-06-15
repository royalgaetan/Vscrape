import { ExecutionPlan } from "@vscrape/shared";
import { getWorkflowDefinition } from "./get_workflow_definition";
import { entryPointNodesLabels } from "@/lib/workflow_editor/utils/w_utils";

// const fakeExecutionPlan: ExecutionPlan = {
//   phase1: [JSON.stringify({ node: "Manual", isEntryPoint: true })],
//   phase2: [
//     JSON.stringify({
//       node: "Scrape a page",
//       inputs: { browserInstance: "Bwsr", value: "www.vscrape.com" },
//     }),
//     JSON.stringify({
//       node: "Extract Element",
//       inputs: { element: "Extract", value: "texxxxxt here!" },
//     }),
//   ],
// };

export const getWorkflowExecutionPlan = (): ExecutionPlan => {
  let newExecutionPlan: ExecutionPlan = {};
  const planned = new Set();

  const workflowDefinitionRaw = getWorkflowDefinition();
  if (!workflowDefinitionRaw)
    throw new Error("Cannot find valid nodes or connections");

  const workflowDefinition = JSON.parse(workflowDefinitionRaw);

  const nodes = Object.entries(workflowDefinition).filter(
    ([k, v]) => k === "nodes"
  )[0][1];
  const connections = Object.entries(workflowDefinition).filter(
    ([k, v]) => k === "connections"
  )[0][1];
  if (!nodes || !connections)
    throw new Error("Invalid nodes or connections...");

  console.log("Exc. \nNode:", nodes, "\nConn", connections);
  // Generate Execution Plan from Workflow definition
  // 1st: Add entry point
  const entryPoints = Object.values(nodes).filter((n: any) =>
    entryPointNodesLabels.includes(n.label)
  );
  if (entryPoints.length > 1)
    throw new Error("More than one entry point found...");
  if (entryPoints.length !== 1)
    throw new Error("No entry point found, add one...");

  const entryPoint = entryPoints[0];

  planned.add(entryPoint.id);
  newExecutionPlan = { 1: entryPoint };

  // Add Remaining Nodes inside corresponding phase
  for (
    let i = 1;
    i < Object.values(nodes).length &&
    planned.size !== Object.values(nodes).length;
    i++
  ) {
    const currNodeId = Object.values(nodes)[i].id;

    // If Node has invalid Id: skip
    if (!currNodeId) continue;

    // If Node is already planned: skip
    if (planned.has(currNodeId)) continue;

    // If Node has "Incoming Nodes" and they aren't planned yet: skip
    const incomingNodeIds = getIncomingNodeIds(currNodeId, connections);
    if (incomingNodeIds.every((incomingNodeId) => planned.has(incomingNodeId)))
      continue;

    // Else Add Node to planned
    planned.add(currNodeId);
    console.log(
      `Exc. \nVisiting: ${currNodeId}`,
      `\nincomingNodeIds`,
      incomingNodeIds
    );
  }
  console.log(`Exc. \nPlanned: ${planned.size}`, planned);

  // Return execution plan
  return newExecutionPlan;
};

const getIncomingNodeIds = (nodeId: string, connections: object): string[] => {
  const _incomingNodeIds = [] as string[];

  // Get all related connections
  const linkedConnections = Object.values(connections).filter(
    (c: any) => c.target === nodeId
  );

  // Get incoming nodes
  linkedConnections.forEach((conn) => {
    _incomingNodeIds.push(conn.source);
  });

  return _incomingNodeIds;
};
