"use client";

import { folderType } from "./layout";
import { fakeWorkflows } from "@/lib/fake_data";
import WorkflowList from "./_components/workflow_list";

const WorkflowDefault = () => {
  const defaultFolder: folderType = {
    folderColor: "#ffffff",
    folderName: "All",
    folderPath: "",
  };

  return (
    <div className="mt-0 pt-0">
      <WorkflowList folder={defaultFolder} workflowList={fakeWorkflows} />
    </div>
  );
};

export default WorkflowDefault;
