import { Browser } from "puppeteer";

export type OrchestratorMode = "local" | "server";

export type Environment = {
  getBrowser: () => Browser;
  setBrowser: (browser: Browser) => void;

  getGlobalVariables: () => object;
  setGlobalVariables: (obj: object) => void;
};
