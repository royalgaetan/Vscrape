"use client";
import React, { useState } from "react";
import WVersionsSidebar from "./_components/w_sidebar_versions";
import WVersionEditor from "./_components/w_versions_editor";

const WorkflowVersions = () => {
  const [selectedWorkflowVersion, setselectedWorkflowVersion] =
    useState<string>();

  return (
    <div className="flex flex-1">
      <WVersionsSidebar
        selectedWorkflow={selectedWorkflowVersion}
        onVersionSelected={(versionId) => setselectedWorkflowVersion(versionId)}
      />
      <WVersionEditor selectedWorkflow={selectedWorkflowVersion} />
    </div>
  );
};

export default WorkflowVersions;
