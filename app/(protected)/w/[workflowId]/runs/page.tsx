import { LucideListCollapse } from "lucide-react";
import React from "react";

const WorkflowRuns = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <LucideListCollapse className="size-12 stroke-emerald-700 mb-2 stroke-[2px]" />
      <span className="text-neutral-800 text-3xl font-semibold">
        Workflow Runs
      </span>
    </div>
  );
};

export default WorkflowRuns;
