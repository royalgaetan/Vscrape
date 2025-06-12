"server-only";

import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { ExecutionPlan, orchestrator } from "@vscrape/shared";
import React from "react";

const fakeExecutionPlan: ExecutionPlan = {
  phase1: [JSON.stringify({ node: "Manual", isEntryPoint: true })],
  phase2: [
    JSON.stringify({
      node: "Scrape a page",
      inputs: { browserInstance: "Bwsr", value: "www.vscrape.com" },
    }),
    JSON.stringify({
      node: "Extract Element",
      inputs: { element: "Extract", value: "texxxxxt here!" },
    }),
  ],
};

const ExecuteButton = () => {
  return (
    <Button
      onClick={() => {
        orchestrator({ executionPlan: fakeExecutionPlan, mode: "local" });
      }}
      variant={"default"}
      className="rounded-2xl h-7 text-xs gap-1 px-3 active:scale-[0.97]"
    >
      <Play className="stroke-white" />
      <span className="">Execute</span>
    </Button>
  );
};

export default ExecuteButton;
