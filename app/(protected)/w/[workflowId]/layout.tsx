"use client";
import React from "react";
import WFooter from "./_components/w_footer";
import WHeader from "./_components/w_header";
import { WorkflowEditorProvider } from "@/providers/workflowEditorProvider";

const WLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WorkflowEditorProvider>
      <div className="flex flex-col h-[100vh] w-[100vw] overflow-clip">
        {/* Header */}
        <WHeader />

        {/* Content */}
        <div className="flex flex-1 max-h-[88vh] h-[88vh]">{children}</div>

        {/* Footer */}
        <WFooter />
      </div>
    </WorkflowEditorProvider>
  );
};

export default WLayout;
