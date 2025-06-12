import { Environment, ExecutionPlan, OrchestratorMode } from "../types/types";
import { createEnvironment } from "./environment";

const orchestrator = async ({
  executionPlan,
  mode,
}: {
  executionPlan: ExecutionPlan;
  mode: OrchestratorMode;
}): Promise<boolean> => {
  console.log(
    "Orchestrator Launched",
    `\nMode: ${mode}`,
    `\nWith: ${executionPlan}`
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
