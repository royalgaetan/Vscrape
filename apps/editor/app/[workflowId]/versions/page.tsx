"use client";
import React, { useState } from "react";
import WVersionsSidebar from "./_components/w_sidebar_versions";
import { HistoryIcon } from "lucide-react";
import WorflowEditor from "../editor/_components/w_editor_wrapper";

const WorkflowVersions = () => {
  const [selectedWorkflowVersion, setSelectedWorkflowVersion] =
    useState<string>();

  return (
    <div className="flex flex-1">
      {/* Sidebar */}
      <WVersionsSidebar
        selectedWorkflow={selectedWorkflowVersion}
        onVersionSelected={(versionId) => setSelectedWorkflowVersion(versionId)}
      />

      {/* Editor */}
      <div className="flex flex-1 justify-center items-center">
        {selectedWorkflowVersion ? (
          <WorflowEditor workflowId={selectedWorkflowVersion} isHistory />
        ) : (
          <div className="flex flex-col justify-center items-center select-none">
            <HistoryIcon className="size-12 stroke-neutral-300 mb-2 stroke-[2px]" />
            <span className="text-neutral-300 text-3xl font-semibold">
              Workflow History
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowVersions;
