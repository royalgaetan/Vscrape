import React, { useEffect, useRef, useState } from "react";
import SimpleTooltip from "@/components/global/simple_tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Bell,
  BellRingIcon,
  ChevronsDownIcon,
  Coins,
  Copy,
  LucideIcon,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { formatLargeNumber } from "@/lib/date_time_utils";
import { NodeTest, OperationItem } from "@/lib/workflow_editor/types/w_types";
import { getNodeTestIcon } from "@/lib/workflow_editor/utils/w_utils";
import OptionbarOperation from "./w_optionbar_single_operation";
import { useWorkflowEditorStore } from "@/stores/workflowStore";
import { VsNode } from "@/lib/workflow_editor/node";
const OptionbarEditor = () => {
  // Store:
  const currentNode = useWorkflowEditorStore((s) => s.currentNode);
  const updateCurrentNode = useWorkflowEditorStore((s) => s.updateCurrentNode);
  const setCurrentOperation = useWorkflowEditorStore(
    (s) => s.setCurrentOperation
  );
  const toggleOptionbar = useWorkflowEditorStore((s) => s.toggleOptionbar);
  const isWorkflowOptionbarOpen = useWorkflowEditorStore(
    (s) => s.isWorkflowOptionbarOpen
  );
  const setNodeIdToActOn = useWorkflowEditorStore((s) => s.setNodeIdToActOn);
  // End Store

  const [operationOrigin, setOperationOrigin] = useState<
    OperationItem | undefined
  >();
  const [displaySingleOperation, setDisplaySingleOperation] = useState(false);

  useEffect(() => {
    // When the Optionbar changes: Display Single Operation return to false
    const unsub = useWorkflowEditorStore.subscribe((state, prev) => {
      if (
        prev.currentNode?.id !== state.currentNode?.id ||
        isWorkflowOptionbarOpen
      ) {
        setDisplaySingleOperation(false);
      }
    });
    return () => unsub();
  }, []);

  const NotificationIcon = useRef<LucideIcon>(
    Math.random() < 0.7 ? Bell : BellRingIcon
  );
  const unitTestArr = ["failed", "success", "running"] as const;
  const unitTestResult = useRef<NodeTest>(
    unitTestArr[Math.round(Math.random() * unitTestArr.length)]
  );
  const creditCost = useRef<number>(Math.round(Math.random() * 120));
  const NotificationIconB = NotificationIcon.current;
  const UnitTestIcon = getNodeTestIcon(unitTestResult.current).icon;
  const unitTestInfo = getNodeTestIcon(unitTestResult.current);

  return !isWorkflowOptionbarOpen ? (
    <></>
  ) : (
    <div className="group/optionBar [--optionbarwidth:18rem] min-w-[var(--optionbarwidth)] max-w-[var(--optionbarwidth)] h-full bg-white border-l flex flex-col items-start justify-start relative">
      <div className="flex flex-1 w-full max-h-full overflow-x-clip overflow-y-scroll scrollbar-hide">
        <div className="h-px w-full relative">
          <div className="min-w-[18rem] max-w-[18rem] bg-white border-r flex flex-col items-start justify-start relative">
            {/* Close Button */}
            <div className="pointer-events-none flex w-[var(--optionbarwidth)] justify-end px-4 items-center bg-transparent z-10 translate-y-4 -mb-1 sticky top-0">
              <SimpleTooltip
                side="bottom"
                align="end"
                tooltipText={"Close the panel"}
              >
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    setCurrentOperation(undefined);
                    setDisplaySingleOperation(false);
                    toggleOptionbar(false, undefined);
                  }}
                  className={cn(
                    "pointer-events-auto bg-gray-100 hover:bg-gray-200 inset-0 p-3 duration-0 rounded-full size-4 flex justify-center items-center"
                  )}
                >
                  <X className="size-3" />
                </Button>
              </SimpleTooltip>
            </div>

            {/* Content */}

            {/* Empty Display */}
            {!currentNode && (
              <div className=" text-muted-foreground w-full text-xs font-semibold flex flex-1 justify-center items-center min-h-[80vh]">
                Select a tool.
              </div>
            )}

            {/* Single Operation Arena */}
            {currentNode && displaySingleOperation && (
              <OptionbarOperation
                nodeOrigin={currentNode}
                operationOrigin={operationOrigin}
                displayBackButton={displaySingleOperation}
                onDelete={(operationId) => {
                  setDisplaySingleOperation(false);
                  const updatedNode = currentNode.removeOperation(operationId);
                  updateCurrentNode(updatedNode);
                }}
                onSave={(operation) => {
                  setDisplaySingleOperation(false);
                  const updatedNode =
                    currentNode.addOrUpdateOperation(operation);
                  updateCurrentNode(updatedNode);
                }}
                onBack={() => {
                  setDisplaySingleOperation(false);
                }}
              />
            )}

            {/* All Node's Operations */}
            {currentNode && !displaySingleOperation && (
              <div className="px-4 w-full">
                {/* Header */}
                <OptionbarHeader nodeOrigin={currentNode} />

                {/* Buttons : Credit Cost, Notification, Unit test, Delete Node */}
                <div className="flex flex-1 w-full mt-2 mb-8 gap-2">
                  {/* Credit Cost */}
                  <SimpleTooltip tooltipText="Node Total Cost" side="bottom">
                    <Button
                      variant={"ghost"}
                      className={cn(
                        "flex truncate !min-w-10 px-2 border border-border/20 text-neutral-500 h-6 transition-all duration-300 justify-start items-center gap-1 hover:bg-neutral-200/40 bg-transparent cursor-pointer rounded-sm"
                      )}
                    >
                      <Coins className="size-4 stroke-neutral-400 inline" />
                      <span className="scale-90 line-clamp-1">
                        {formatLargeNumber(creditCost.current)}
                      </span>
                    </Button>
                  </SimpleTooltip>

                  {/* Notification */}
                  <SimpleTooltip
                    tooltipText={`${
                      NotificationIcon.current === Bell ? "Enable" : "Disable"
                    } Node's Notifications`}
                    side="bottom"
                  >
                    <Button
                      variant={"ghost"}
                      className={cn(
                        "flex truncate min-w-fit px-2 border border-border/20 text-neutral-500 h-6 transition-all duration-300 justify-start items-center gap-1 hover:bg-neutral-200/40 bg-transparent cursor-pointer rounded-sm"
                      )}
                      onClick={(e) => {
                        console.log("Toggle Notification");
                      }}
                    >
                      {/* Icon */}
                      <NotificationIconB
                        className={cn(
                          "!size-3 stroke-[2.5px] translate-y-[1px]",
                          NotificationIcon.current === Bell
                            ? "stroke-neutral-500"
                            : "stroke-yellow-500"
                        )}
                      />
                      <span>
                        {NotificationIcon.current === Bell ? "Off" : "On"}
                      </span>
                    </Button>
                  </SimpleTooltip>

                  {/* Test Node */}
                  <SimpleTooltip tooltipText="Test Node" side="bottom">
                    <Button
                      variant={"ghost"}
                      className={cn(
                        "flex truncate text-left px-2 border border-border/20 text-neutral-500 h-6 transition-all duration-300 justify-start items-center gap-1 hover:bg-neutral-200/40 bg-transparent cursor-pointer rounded-sm"
                      )}
                      onClick={(e) => {
                        console.log("Launch a unit test");
                      }}
                    >
                      {/* Icon */}
                      <UnitTestIcon
                        className={cn(
                          "stroke-neutral-500 !size-3",
                          unitTestInfo.iconClassname
                        )}
                      />
                      <span className="scale-90 truncate w-full">Test</span>
                    </Button>
                  </SimpleTooltip>

                  {/* Duplicate Node */}
                  <SimpleTooltip tooltipText="Duplicate Node" side="bottom">
                    <Button
                      variant={"ghost"}
                      className={cn(
                        "flex truncate px-2 min-w-fit border border-border/20 text-neutral-500 h-6 transition-all duration-300 justify-start items-center gap-1 hover:bg-neutral-200/40 bg-transparent cursor-pointer rounded-sm"
                      )}
                      onClick={() => {
                        // Handle Node Duplication
                        setNodeIdToActOn({
                          nodeId: currentNode.id,
                          operation: "Duplicate",
                        });
                      }}
                    >
                      {/* Icon */}
                      <Copy className="group-hover/deleleNodeBtn:stroke-destructive-foreground !size-3 stroke-[2.5px] translate-y-[1px] stroke-neutral-500" />
                    </Button>
                  </SimpleTooltip>

                  {/* Delete Node */}
                  <SimpleTooltip tooltipText="Delete Node" side="bottom">
                    <Button
                      variant={"ghost"}
                      className={cn(
                        "group/deleleNodeBtn flex w-fit px-2 border border-border/20 text-neutral-500 h-6 duration-0 justify-center items-center gap-1 hover:bg-destructive/80 bg-transparent cursor-pointer rounded-sm"
                      )}
                      onClick={(e) => {
                        // Handle Node Deletion
                        setNodeIdToActOn({
                          nodeId: currentNode.id,
                          operation: "Delete",
                        });
                      }}
                    >
                      {/* Icon */}
                      <Trash2 className="group-hover/deleleNodeBtn:stroke-destructive-foreground !size-3 stroke-[2.5px] translate-y-[1px] stroke-neutral-500" />
                    </Button>
                  </SimpleTooltip>
                </div>

                {/* Node: Operations List (All) */}
                <h5 className="text-base font-semibold text-[#333] line-clamp-1 mb-4">
                  {currentNode.operations.length} Operation
                  {currentNode.operations.length > 1 && "s"}
                </h5>

                {currentNode.operations.length === 0 ? (
                  <div className="flex flex-col w-full">
                    <AddAndOperationButton
                      onClick={() => {
                        setOperationOrigin(undefined);
                        setCurrentOperation(undefined);
                        setDisplaySingleOperation(true);
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col w-full group/operationsList">
                    {currentNode.operations.map((operation, idx) => {
                      const isLast = currentNode.operations.length === idx + 1;
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
                            onClick={() => {
                              setOperationOrigin(operation);
                              setCurrentOperation(operation);
                              setDisplaySingleOperation(true);
                            }}
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
                            <div className="group-hover/optionBar:flex hidden flex-col w-full my-2 mt-5 items-center gap-2">
                              {/* Arrow Flow Indicator */}
                              {/* <ChevronsDownIcon className="stroke-neutral-400 size-5 stroke-[1.8px]" /> */}

                              {/* Add another Operation */}
                              <AddAndOperationButton
                                onClick={() => {
                                  setOperationOrigin(undefined);
                                  setCurrentOperation(undefined);
                                  setDisplaySingleOperation(true);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionbarEditor;

export const FieldLabel = ({
  label,
  Icon,
}: {
  label: string;
  Icon?: LucideIcon;
}) => {
  return (
    <div className="flex flex-1 justify-start items-center gap-2 mb-2">
      <div className="w-fit">
        {Icon && <Icon className="stroke-neutral-700/70 !size-5" />}
      </div>
      <span className="text-base font-semibold text-neutral-700 line-clamp-1">
        {label}
      </span>
    </div>
  );
};

export const OptionbarHeader = ({
  nodeOrigin,
  displayBackButton,
  onBack,
}: {
  nodeOrigin: VsNode;
  displayBackButton?: boolean;
  onBack?: () => void;
}) => {
  const Icon = nodeOrigin?.icon;

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-1 gap-2 items-center">
        {displayBackButton ? (
          <button
            onClick={() => onBack && onBack()}
            className="inset-0 hover:opacity-90 transition-all duration-300 active:scale-[0.97]"
          >
            <ArrowLeft className={"size-5"} stroke={nodeOrigin.iconColor} />
          </button>
        ) : (
          <div className="size-5">
            {Icon && (
              <Icon className={"size-5"} stroke={nodeOrigin.iconColor} />
            )}
            {nodeOrigin.logoPath && (
              <div className="relative h-5 w-5 mb-2">
                <Image
                  src={nodeOrigin.logoPath}
                  alt={`${nodeOrigin.label} logo`}
                  className="select-none object-contain"
                  fill
                />
              </div>
            )}
          </div>
        )}

        <h2 className="text-xl font-semibold text-[#333] line-clamp-1">
          {nodeOrigin.label}
        </h2>
      </div>

      {nodeOrigin.tooltip && (
        <p className="mt-1 text-xs font-normal text-neutral-500 line-clamp-2">
          {nodeOrigin.tooltip}
        </p>
      )}
    </div>
  );
};

const AddAndOperationButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      variant={"ghost"}
      className={cn(
        "group/operationItemButton relative flex flex-1 h-4 !py-[0.3rem] !w-full px-2 transition-all duration-300 justify-center items-center gap-1 hover:bg-white bg-white cursor-pointer rounded-sm hover:text-neutral-500/60 text-neutral-500 active:scale-[0.97]"
      )}
      onClick={(e) => onClick()}
    >
      <Plus className="stroke-neutral-400 size-4 stroke-[1.8px]" /> Add an
      operation
    </Button>
  );
};
