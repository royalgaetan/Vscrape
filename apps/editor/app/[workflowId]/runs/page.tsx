"use client";
import { LucideListCollapse } from "lucide-react";
import React from "react";

const WorkflowRuns = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="flex flex-col justify-center items-center select-none">
        <LucideListCollapse className="size-12 stroke-neutral-300 mb-2 stroke-[2px]" />
        <span className="text-neutral-300 text-3xl font-semibold">
          Workflow Runs
        </span>
      </div>
    </div>
  );
};

export default WorkflowRuns;
