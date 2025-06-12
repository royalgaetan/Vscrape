import { useWorkflowEditorStore } from "@/stores/workflowStore";
import React, { useEffect, useState } from "react";
import { OperationBlock } from "@/lib/workflow_editor/classes/operation_block";
import AddFieldBlockButton from "../form_fields/add_field_block_button";
import SimpleTooltip from "@/components/global/simple_tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PenLineIcon, Trash2 } from "lucide-react";

const DataPreviewList = ({
  onPreviewEdit,
}: {
  onPreviewEdit: (operationBlock?: OperationBlock) => void;
}) => {
  // Store:
  const currentNode = useWorkflowEditorStore((s) => s.currentNode);
  // End Store
  const [nodeBlocks, setNodeBlocks] = useState(
    currentNode ? (currentNode.blocks as OperationBlock[]) : undefined
  );

  useEffect(() => {
    if (!currentNode) return;
    const sub = currentNode.stream$().subscribe((newData) => {
      setNodeBlocks(newData.blocks as OperationBlock[]);
    });

    return () => sub.unsubscribe();
  }, []);

  if (!currentNode) {
    return <div></div>;
  }

  return (
    // Here Blocks represents: Form Fields
    <div>
      <h5 className="text-base font-semibold text-[#333] line-clamp-1 mb-4">
        Data Preview
      </h5>

      <div className="flex flex-col">
        {Array.isArray(nodeBlocks) && nodeBlocks.length > 0 ? (
          <div>
            {nodeBlocks.map((previewOperation) => {
              return (
                <div
                  key={previewOperation.id}
                  className="relative flex flex-1 min-h-36 justify-center items-center w-full mb-10 group/dataPreviewItem border border-border ring-0 hover:ring-2 ring-border overflow-clip rounded-md bg-neutral-100/20 transition-all duration-150"
                >
                  {/* Action Buttons: Edit | Delete */}
                  <div className="absolute top-1 right-1 group-hover/dataPreviewItem:flex hidden flex-1 gap-1 justify-start items-center pt-1">
                    {/* Edit */}
                    <SimpleTooltip tooltipText="Edit Previewer">
                      <Button
                        variant={"ghost"}
                        className={cn(
                          "!h-6 p-2 flex items-center justify-center hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer rounded-sm transition-all duration-300"
                        )}
                        onClick={() => onPreviewEdit(previewOperation)}
                      >
                        <PenLineIcon className="!size-3" /> Edit
                      </Button>
                    </SimpleTooltip>

                    {/* Delete */}
                    <SimpleTooltip tooltipText="Delete Previewer">
                      <Button
                        variant={"ghost"}
                        className={cn(
                          "!h-6 p-2 flex items-center justify-center hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer rounded-sm transition-all duration-300"
                        )}
                        onClick={() => {
                          currentNode.removeBlock(previewOperation.id);
                        }}
                      >
                        <Trash2 className="!size-3" /> Delete
                      </Button>
                    </SimpleTooltip>
                  </div>

                  {/* Previewer */}
                  <div className="flex text-sm font-medium text-neutral-700 select-none">
                    {currentNode.label.includes("PDF Viewer") && (
                      <div> PDF Viewer</div>
                    )}
                    {currentNode.label.includes("Docs Viewer") && (
                      <div> Docs Viewer</div>
                    )}
                    {currentNode.label.includes("Spreadsheet Viewer") && (
                      <div> Spreadsheet Viewer</div>
                    )}
                    {currentNode.label.includes("Image Preview") && (
                      <div> Image Preview</div>
                    )}
                    {currentNode.label.includes("Media Player") && (
                      <div> Media Player</div>
                    )}
                    {currentNode.label.includes("Code Preview") && (
                      <div> Code Preview</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col w-full mb-3 items-center gap-2">
            {/* Add Preview */}
            <AddFieldBlockButton
              contentText="Add a file to preview"
              onClick={() => onPreviewEdit()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DataPreviewList;
