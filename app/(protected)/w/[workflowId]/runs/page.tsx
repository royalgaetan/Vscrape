"use client";
import { LucideListCollapse } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

const WorkflowRuns = () => {
  const pathname = usePathname();
  const pathnameArr = pathname.split("/");
  const pathnameLast = pathnameArr[pathnameArr.length - 1];

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      {pathnameLast === "runs" && (
        <div className="flex flex-col justify-center items-center select-none">
          <LucideListCollapse className="size-12 stroke-neutral-300 mb-2 stroke-[2px]" />
          <span className="text-neutral-300 text-3xl font-semibold">
            Workflow Runs
          </span>
        </div>
      )}
    </div>
  );
};

export default WorkflowRuns;
