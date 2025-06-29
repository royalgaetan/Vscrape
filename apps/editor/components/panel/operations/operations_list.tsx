import React from "react";
import AddOperationButton from "./add_operation_button";
import {
  useWorkflowEditorStore,
  OperationBlock,
  OperationItem,
} from "@vscrape/engine/src";
import { cn, Button, formatLargeNumber } from "@vscrape/ui";
import { ChevronsDownIcon, Coins } from "lucide-react";

const OperationsList = ({
  onAddOperationItem,
  onOperationItemSelect,
}: {
  onAddOperationItem: () => void;
  onOperationItemSelect: (operationItem: OperationItem) => void;
}) => {
  // Store:
  const currentNode = useWorkflowEditorStore((s) => s.currentNode);
  const currentEditor = useWorkflowEditorStore((s) => s.currentEditor);
  // End Store

  if (!currentNode || !(currentNode.block instanceof OperationBlock)) {
    return <div></div>;
  }

  return (
    // Here Blocks represents: Operations
    <div>
      <h5 className="text-base font-semibold text-[#333] line-clamp-1 mb-4">
        {currentNode.block.items.length} Operation
        {currentNode.block.items.length > 1 && "s"}
      </h5>

      {currentNode.block.items.length === 0 ? (
        <div className="flex flex-col w-full">
          <AddOperationButton onClick={onAddOperationItem} />
        </div>
      ) : (
        <div className="flex flex-col w-full group/operationsList">
          {currentNode.block.items.map((operation, idx, arr) => {
            const isLast = arr.length === idx + 1;
            return (
              <div
                key={operation.id}
                className="flex flex-col w-full items-center"
              >
                <Button
                  variant={"outline"}
                  className={cn(
                    "group/operationItemButton relative flex flex-1 h-4 !py-[0.3rem] !w-full px-2 ring-2 ring-transparent border border-border/50 transition-all duration-300 justify-center items-center gap-1 hover:bg-white bg-white cursor-pointer rounded-sm",
                    currentEditor.errors?.has(operation.id) &&
                      "border-destructive/90 ring-destructive/40"
                  )}
                  onClick={() => onOperationItemSelect(operation)}
                >
                  <div className="w-full line-clamp-1 group-hover/operationItemButton:text-neutral-500/80 text-neutral-500">
                    {operation.operationItemName}
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
                  <div className="group-hover/workflowPanel:flex hidden flex-col w-full my-2 mt-6 items-center gap-2">
                    {/* Arrow Flow Indicator */}
                    {/* <ChevronsDownIcon className="stroke-neutral-400 size-5 stroke-[1.8px]" /> */}

                    {/* Add another Operation */}
                    <AddOperationButton onClick={onAddOperationItem} />
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
