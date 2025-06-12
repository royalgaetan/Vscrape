import React from "react";
import WRunsSidebar from "./_components/w_sidebar_runs";

const WorkflowRunsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1">
      <WRunsSidebar />
      {children}
    </div>
  );
};

export default WorkflowRunsLayout;
