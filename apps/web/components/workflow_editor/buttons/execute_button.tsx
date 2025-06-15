"server-only";

import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { orchestrator } from "@vscrape/shared";
import React from "react";
import { getWorkflowExecutionPlan } from "@/actions/workflow_editor/get_workflow_execution_plan";
import { toast } from "sonner";

const ExecuteButton = () => {
  return (
    <Button
      onClick={() => {
        try {
          const executionPlan = getWorkflowExecutionPlan();
          orchestrator({ executionPlan: executionPlan, mode: "local" });

          toast.success("Your workflow execution has started...", {
            richColors: true,
          });
        } catch (err) {
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
