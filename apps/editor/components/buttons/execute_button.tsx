"server-only";

import { Button } from "@vscrape/ui";
import { Play } from "lucide-react";
import { orchestrator } from "@vscrape/engine/src";
import React from "react";
import { toast } from "sonner";
import { getWorkflowExecutionPlan } from "../../actions/get_workflow_execution_plan";

const ExecuteButton = () => {
  return (
    <Button
      onClick={() => {
        try {
          const executionPlan = getWorkflowExecutionPlan();
          if (executionPlan.errors.size > 0) {
            throw new Error("The workflow contains errors...");
          }
          // Call Orchestrator
          orchestrator({
            executionPlan: executionPlan.plan,
            mode: "local",
          });

          toast.success("Your workflow execution has started...", {
            richColors: true,
          });
        } catch (err) {
          console.log("ExecutionPlan.errors:", err);
          toast.error(
            err instanceof Error
              ? err.message
              : "Cannot execute your workflow. Try again!",
            {
              richColors: true,
            }
          );
        }
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
