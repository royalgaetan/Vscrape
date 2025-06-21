import { Environment, OrchestratorMode } from "../types/types";
import { createEnvironment } from "./environment";

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

const orchestrator = async ({
  executionPlan,
  mode,
}: {
  executionPlan: any;
  mode: OrchestratorMode;
}): Promise<boolean> => {
  console.log(
    "Orchestrator Launched",
    `\nMode: ${mode}`
    // `\nWith: ${JSON.stringify(executionPlan)}`
  );

  // Setup Environment
  const environment: Environment = createEnvironment();

  const phasesPlanned = new Set();

  // export type ExecutionPlan = Record<string, string[]>;
  // Get entry point
  const entryPoint = Object.entries(executionPlan)[0];

  // if(!entryPoint.)

  // Phases Executions
  // Execute each phase in the ExecutionPlan and update the environment accordingly

  // Finialise execution
  const success = Math.random() < 0.7;
  return await success;
};

export default orchestrator;
