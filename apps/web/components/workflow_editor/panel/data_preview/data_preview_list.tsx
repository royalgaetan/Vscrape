import { useWorkflowEditorStore } from "@/stores/workflowStore";
import React, { useEffect, useState } from "react";
import {
  OperationBlock,
  OperationItem,
} from "@/lib/workflow_editor/classes/operation_block";
import AddFieldBlockButton from "../form_fields/add_field_block_button";
import SimpleTooltip from "@/components/global/simple_tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PenLineIcon, Trash2 } from "lucide-react";
import { cloneDeep } from "lodash";
import { insertOrRemoveIdsFromCurrentEditorErrors } from "@/lib/workflow_editor/utils/w_utils";

const DataPreviewList = ({
  onPreviewItemEdit,
  onPreviewItemDelete,
}: {
  onPreviewItemEdit: (previewItem?: OperationItem) => void;
  onPreviewItemDelete: (previewItemId: string) => void;
}) => {
  // Store:
  const currentNode = useWorkflowEditorStore((s) => s.currentNode);
  const currentEditor = useWorkflowEditorStore((s) => s.currentEditor);
  // End Store
  const [nodeBlock, setNodeBlock] = useState(
    currentNode ? (currentNode.block as OperationBlock) : undefined
  );

  useEffect(() => {
    if (!nodeBlock) return;
    const sub = nodeBlock.stream$().subscribe((newData) => {
      setNodeBlock(cloneDeep(newData));
    });

    return () => sub.unsubscribe();
  }, []);

  if (!currentNode || !(nodeBlock instanceof OperationBlock)) {
    return <div></div>;
  }

  return (
    // Here Blocks represents: Operation Items (or PreviewItem)
    <div>
      <h5 className="text-base font-semibold text-[#333] line-clamp-1 mb-4">
        Data Preview
      </h5>

      <div className="flex flex-col">
        {nodeBlock.items.length > 0 ? (
          <div>
            {nodeBlock.items.map((previewItem) => {
              return (
                <div
                  key={previewItem.id}
                  className={cn(
                    "relative flex flex-1 min-h-36 justify-center items-center w-full mb-10 group/dataPreviewItem border border-border ring-0 hover:ring-2 ring-border overflow-clip rounded-md bg-neutral-100/20 transition-all duration-150",
                    currentEditor.errors?.has(previewItem.id) &&
                      "ring-2 border-destructive/90 ring-destructive/40"
                  )}
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
                        onClick={() => onPreviewItemEdit(previewItem)}
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
                          insertOrRemoveIdsFromCurrentEditorErrors({
                            fromId: previewItem.id,
                            initialNodeId: currentNode.id,
                            action: "remove",
                          });
                          onPreviewItemDelete(previewItem.id);
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
              onClick={() => onPreviewItemEdit()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DataPreviewList;
