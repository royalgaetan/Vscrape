import { useWorkflowEditorStore } from "@/stores/workflowStore";
import React from "react";
import AddOperationButton from "./add_operation_button";
import { OperationItem } from "@/lib/workflow_editor/classes/operation_item";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronsDownIcon, Coins } from "lucide-react";
import { formatLargeNumber } from "@/lib/date_time_utils";

const OperationsList = ({
  onAddOperation,
  onOperationSelect,
}: {
  onAddOperation: () => void;
  onOperationSelect: (operation: OperationItem) => void;
}) => {
  // Store:
  const currentNode = useWorkflowEditorStore((s) => s.currentNode);
  // End Store

  if (!currentNode) {
    return <div></div>;
  }

  return (
    // Here Blocks represents: Operations
    <div>
      <h5 className="text-base font-semibold text-[#333] line-clamp-1 mb-4">
        {currentNode.blocks.length} Operation
        {currentNode.blocks.length > 1 && "s"}
      </h5>

      {currentNode.blocks.length === 0 ? (
        <div className="flex flex-col w-full">
          <AddOperationButton onClick={onAddOperation} />
        </div>
      ) : (
        <div className="flex flex-col w-full group/operationsList">
          {currentNode.blocks.map((block, idx) => {
            const operation = block as OperationItem;
            const isLast = currentNode.blocks.length === idx + 1;
            return (
              <div
                key={`${currentNode.sectionName}_${operation.operationName}_${idx}`}
                className="flex flex-col w-full items-center"
              >
                <Button
                  variant={"outline"}
                  className={cn(
                    "group/operationItemButton relative flex flex-1 h-4 !py-[0.3rem] !w-full px-2 border border-border/50 transition-all duration-300 justify-center items-center gap-1 hover:bg-white bg-white cursor-pointer rounded-sm"
                  )}
                  onClick={() => onOperationSelect(operation)}
                >
                  <div className="w-full line-clamp-1 group-hover/operationItemButton:text-neutral-500/80 text-neutral-500">
                    {operation.operationName}
                  </div>
                  <div className="group-hover/operationItemButton:flex hidden text-neutral-500 absolute gap-1 justify-center items-center top-0 right-0 bg-white h-[97%] rounded-r-sm pl-1 pr-3">
                    <Coins className="size-3 stroke-neutral-400" />
                    <span className="scale-90 text-xs">
                      {formatLargeNumber(29)}
                    </span>
                  </div>
                </Button>
                {!isLast && (
                  <div className="flex my-2">
                    {/* Arrow Flow Indicator */}
                    <ChevronsDownIcon className="stroke-neutral-400 size-5 stroke-[1.8px]" />
                  </div>
                )}
                {isLast && (
                  <div className="group-hover/workflowPanel:flex hidden flex-col w-full my-2 mt-5 items-center gap-2">
                    {/* Arrow Flow Indicator */}
                    {/* <ChevronsDownIcon className="stroke-neutral-400 size-5 stroke-[1.8px]" /> */}

                    {/* Add another Operation */}
                    <AddOperationButton onClick={onAddOperation} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OperationsList;
