import React, { useRef, useState } from "react";
import SimpleTooltip from "@/components/global/simple_tooltip";
import { Button } from "@/components/ui/button";
import { useWorkflowEditor } from "@/hooks/useWorkflowEditor";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowLeft,
  Bell,
  BellRingIcon,
  ChevronsDownIcon,
  Coins,
  LucideIcon,
  MoveDown,
  Plus,
  X,
} from "lucide-react";
import Image from "next/image";
import { WorkflowEditorToolItemExtended } from "@/providers/workflowEditorProvider";
import { formatLargeNumber } from "@/lib/date_time_utils";
import { NodeTest } from "@/lib/workflow_editor/types/w_types";
import { getNodeTestIcon } from "@/lib/workflow_editor/utils/w_utils";
import OptionbarOperation from "./w_optionbar_single_operation";
const OptionbarEditor = () => {
  const {
    optionbarItem,
    isOptionbarOpen,
    setCurrentOperation,
    toggleOptionbar,
  } = useWorkflowEditor();

  const [displaySingleOperation, setDisplaySingleOperation] = useState(false);
  const [
    canDisplayBackBtnOnSingleOperation,
    setCanDisplayBackBtnOnSingleOperation,
  ] = useState(false);

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

  return !isOptionbarOpen ? (
    <></>
  ) : (
    <div
      onMouseEnter={() => setCanDisplayBackBtnOnSingleOperation(true)}
      onMouseLeave={() => setCanDisplayBackBtnOnSingleOperation(false)}
      className="group/optionBar [--optionbarwidth:18rem] min-w-[var(--optionbarwidth)] max-w-[var(--optionbarwidth)] h-full bg-white border-l flex flex-col items-start justify-start relative"
    >
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
            {!optionbarItem ? (
              <div className=" text-muted-foreground w-full text-xs font-semibold flex flex-1 justify-center items-center min-h-[80vh]">
                Select a tool.
              </div>
            ) : displaySingleOperation ? (
              // Single Operation Arena
              <OptionbarOperation
                optionbarItem={optionbarItem}
                displayBackButton={canDisplayBackBtnOnSingleOperation}
                onBack={() => {
                  setDisplaySingleOperation(false);
                }}
              />
            ) : (
              // All Node's Operations
              <div className="px-4 w-full">
                {/* Header */}
                <OptionbarHeader optionbarItem={optionbarItem} />

                {/* Buttons : Credit Cost, Notification, Unit test */}
                <div className="flex flex-1 w-full mt-2 mb-8 gap-2">
                  {/* Credit Cost */}
                  <Button
                    variant={"ghost"}
                    className={cn(
                      "flex w-fit px-2 border border-border/20 text-neutral-500 h-6 transition-all duration-300 justify-center items-center gap-1 hover:bg-neutral-200/40 bg-transparent cursor-pointer rounded-sm"
                    )}
                  >
                    <Coins className="size-4 stroke-neutral-400" />
                    <span className="scale-90">
                      {formatLargeNumber(creditCost.current)}
                    </span>
                  </Button>

                  <Button
                    variant={"ghost"}
                    className={cn(
                      "flex w-fit px-2 border border-border/20 text-neutral-500 h-6 transition-all duration-300 justify-center items-center gap-1 hover:bg-neutral-200/40 bg-transparent cursor-pointer rounded-sm"
                    )}
                    onPointerDown={(e) => {
                      e.preventDefault();
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

                  {/* Test Unit */}
                  <Button
                    variant={"ghost"}
                    className={cn(
                      "flex w-fit px-2 border border-border/20 text-neutral-500 h-6 transition-all duration-300 justify-center items-center gap-1 hover:bg-neutral-200/40 bg-transparent cursor-pointer rounded-sm"
                    )}
                    onPointerDown={(e) => {
                      e.preventDefault();
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
                    <span>{unitTestInfo.label}</span>
                  </Button>
                </div>

                {/* Node: Operations List (All) */}
                <h5 className="text-base font-semibold text-[#333] line-clamp-1 mb-4">
                  {optionbarItem.operations.length} Operation
                  {optionbarItem.operations.length > 1 && "s"}
                </h5>

                {optionbarItem.operations.length === 0 ? (
                  <div className="flex flex-col w-full">
                    <AddAndOperationButton
                      onClick={() => {
                        setCurrentOperation(undefined);
                        setDisplaySingleOperation(true);
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col w-full group/operationsList">
                    {optionbarItem.operations.map((operation, idx) => {
                      const isLast =
                        optionbarItem.operations.length === idx + 1;
                      return (
                        <div className="flex flex-col w-full items-center">
                          <Button
                            variant={"outline"}
                            className={cn(
                              "group/operationItemButton relative flex flex-1 h-4 !py-[0.3rem] !w-full px-2 border border-border/50 transition-all duration-300 justify-center items-center gap-1 hover:bg-white bg-white cursor-pointer rounded-sm"
                            )}
                            onClick={() => {
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
                            <div className="group-hover/optionBar:flex hidden flex-col w-full my-2 items-center gap-2">
                              {/* Arrow Flow Indicator */}
                              <ChevronsDownIcon className="stroke-neutral-400 size-5 stroke-[1.8px]" />

                              {/* Add another Operation */}
                              <AddAndOperationButton
                                onClick={() => {
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
  optionbarItem,
  displayBackButton,
  onBack,
}: {
  optionbarItem: WorkflowEditorToolItemExtended;
  displayBackButton?: boolean;
  onBack?: () => void;
}) => {
  const Icon = optionbarItem?.icon;

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-1 gap-2 items-center">
        {displayBackButton ? (
          <button
            onClick={() => onBack && onBack()}
            className="inset-0 hover:opacity-90 transition-all duration-300 active:scale-[0.97]"
          >
            <ArrowLeft className={"size-5"} stroke={optionbarItem.iconColor} />
          </button>
        ) : (
          <div className="size-5">
            {Icon && (
              <Icon className={"size-5"} stroke={optionbarItem.iconColor} />
            )}
            {optionbarItem.logoPath && (
              <div className="relative h-5 w-5 mb-2">
                <Image
                  src={optionbarItem.logoPath}
                  alt={`${optionbarItem.label} logo`}
                  className="select-none object-contain"
                  fill
                />
              </div>
            )}
          </div>
        )}

        <h2 className="text-xl font-semibold text-[#333] line-clamp-1">
          {optionbarItem.label}
        </h2>
      </div>

      {optionbarItem.tooltip && (
        <p className="mt-1 text-xs font-normal text-neutral-500 line-clamp-2">
          {optionbarItem.tooltip}
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
