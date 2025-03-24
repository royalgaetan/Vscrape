"use client";

import { fakeWorkflows, folders } from "@/lib/fake_data";
import { redirect, useParams } from "next/navigation";
import React from "react";
import WorkflowList from "../../_components/workflow_list";

const page = () => {
  const { folderId } = useParams();

  const folder = folders.find((f) => f.folderPath === folderId);
  // If no folder has been found : 'from url params'
  if (!folder) redirect("/workflows");

  return (
    <div className="mt-0 pt-0">
      <WorkflowList
        folder={folder}
        workflowList={fakeWorkflows.filter(
          (w) => w.folder.folderPath === folder.folderPath
        )}
      />
    </div>
  );
};

export default page;
