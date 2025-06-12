import { Browser } from "puppeteer";
import { Environment } from "../types/types";

export const createEnvironment = (): Environment => {
  const environment = {};

  let browser: Browser;
  let globalVariables: object;

  //   TODO: logs
  //   TODO: outputs

  return {
    getBrowser: () => browser,
    setBrowser: (newBrowser) => (browser = newBrowser),
    getGlobalVariables: () => globalVariables,
    setGlobalVariables: (vars: object) => (globalVariables = vars),
  };
};
