import React from "react";
import DashboardHeader from "./dashboard_header";
import SettingItemButton from "../../_settings/_components/settings_item_button";
import WorkflowCard from "../../workflows/_components/workflow_card";
import { fakeWorkflows } from "@/lib/fake_data";

const DashboardPinned = () => {
  return (
    <div className="mt-4 mb-28">
      {/* Header */}
      <DashboardHeader
        headerText={"Pinned"}
        buttons={
          <div className="w-min flex gap-2">
            <SettingItemButton text="Pin a workflow" onClick={() => {}} />
          </div>
        }
      />

      {/* Pinned Workflows */}
      <div className="mt-2 h-auto w-full">
        {fakeWorkflows.length === 0 ? (
          <div className=" text-muted-foreground text-xs font-semibold flex justify-center items-center h-36">
            No workflow pinned yet.
          </div> // Display "Not found" if no matches are found
        ) : (
          fakeWorkflows
            .filter((w) => w.isPinned)
            .map((workflow) => (
              <WorkflowCard key={workflow.title} workflow={workflow} />
            ))
        )}
      </div>
    </div>
  );
};

export default DashboardPinned;
