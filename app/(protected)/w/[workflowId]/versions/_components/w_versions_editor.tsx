import React from "react";
import WorflowEditor from "../../editor/_components/w_editor";
import { HistoryIcon } from "lucide-react";

const WVersionEditor = ({
  selectedWorkflow,
}: {
  selectedWorkflow?: string;
}) => {
  return (
    <div className="flex flex-1 justify-center items-center">
      {selectedWorkflow ? (
        <WorflowEditor workflowId={selectedWorkflow} isHistory />
      ) : (
        <div className="flex flex-col justify-center items-center select-none">
          <HistoryIcon className="size-12 stroke-neutral-300 mb-2 stroke-[2px]" />
          <span className="text-neutral-300 text-3xl font-semibold">
            Workflow History
          </span>
        </div>
      )}
    </div>
  );
};

export default WVersionEditor;
