"use client";
import React from "react";
import WorflowEditor from "./_components/w_editor";
import WEditorSidebar from "./_components/w_sidebar_editor";
import { useParams } from "next/navigation";
import { DraftingCompass } from "lucide-react";
import OptionbarEditor from "./_components/w_optionbar_editor";

const WorkflowEditor = () => {
  const { workflowId } = useParams();
  return (
    <div className="flex justify-center items-center h-full w-full">
      <WEditorSidebar />
      {workflowId && typeof workflowId === "string" ? (
        <WorflowEditor workflowId={workflowId} />
      ) : (
        <div className="flex flex-col justify-center items-center select-none">
          <DraftingCompass className="size-12 stroke-neutral-300 mb-2 stroke-[2px]" />
          <span className="text-neutral-300 text-3xl font-semibold">
            No Workflow.
          </span>
        </div>
      )}
      <OptionbarEditor />
    </div>
  );
};

export default WorkflowEditor;
