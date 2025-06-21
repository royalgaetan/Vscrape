import SimpleTooltip from "@/components/global/simple_tooltip";
import { getPreviousInputData } from "@/lib/workflow_editor/utils/w_utils";
import { useWorkflowEditorStore } from "@/stores/workflowStore";
import React from "react";

const SharedOutputButtons = ({
  nodeId,
  blockId,
  itemId,
}: {
  nodeId: string;
  blockId?: string;
  itemId?: string;
}) => {
  // Store
  const currentEditor = useWorkflowEditorStore((s) => s.currentEditor);
  // End Store
  const previousInputs = getPreviousInputData({
    nodeId,
    itemId: itemId ?? "",
    currentEditor,
  });

  return (
    <>
      {previousInputs.length > 0 && (
        <div className="flex flex-1 gap-1 justify-start items-center py-1 px-1 border-t">
          {previousInputs.map((inputData) => (
            <SimpleTooltip
              key={inputData.label}
              tooltipText={inputData.tooltip}
            >
              <div
                role="button"
                tabIndex={2}
                draggable
                onDragStart={(e: React.DragEvent) => {
                  e.dataTransfer.setData(
                    "application/workflowEditor_inputdata",
                    inputData.dataTransfer
                  );
                  e.dataTransfer.effectAllowed = "move";
                }}
                className="w-1/3 h-5 px-1 py-0 line-clamp-1 text-center content-center border-none rounded-sm bg-primary/20 text-primary/80 cursor-grab text-xs font-medium"
              >
                {inputData.label}
              </div>
            </SimpleTooltip>
          ))}
        </div>
      )}
    </>
  );
};

export default SharedOutputButtons;
