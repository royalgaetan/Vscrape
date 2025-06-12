import { Browser } from "puppeteer";

// For: ExecutionPlan = { Phase1: [NodeA_task1, NodeA_task2], Phase2: [NodeB_task1, NodeC_task1], etc... }
export type ExecutionPlan = Record<string, string[]>;

export type OrchestratorMode = "local" | "server";

export type Environment = {
  getBrowser: () => Browser;
  setBrowser: (browser: Browser) => void;

  getGlobalVariables: () => object;
  setGlobalVariables: (obj: object) => void;
};
