"use client";
import React from "react";

export type folderType = {
  folderName: string;
  folderColor: string;
  folderPath: string;
};

const WorkflowLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full flex justify-center pl-5">
      <div className="flex flex-col gap-0 w-[75vw] h-full pr-7 pl-4 pb-10 overflow-x-clip items-start justify-start">
        {/* Header */}
        <div className="mb-3">
          <h2 className="font-bold text-3xl mb-[0.5px] text-[#333]">
            Workflows
          </h2>
          <p className="text-muted-foreground/80 font-normal text-sm">
            Manage your workflows
          </p>
        </div>

        {/* Content */}
        <div className="w-full m-0">
          {/* Tabs Content: All folders content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default WorkflowLayout;
