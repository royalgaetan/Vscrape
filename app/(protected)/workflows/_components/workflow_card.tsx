import { SidebarIcon } from "@/components/global/app_sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  AlarmClockCheck,
  CoinsIcon,
  Edit3Icon,
  EyeOff,
  FileEditIcon,
  Hammer,
  LucideGlobe,
  MoreHorizontal,
  Play,
  Squircle,
  WebhookIcon,
  X,
  Zap,
} from "lucide-react";
import React, { useState } from "react";
import { folderType } from "../layout";
import { formatNumber } from "@/lib/string_utils";

export type WorkflowTriggerMode = "Manual" | "Scheduled" | "Webhook";
export type WorkflowState = "Draft" | "Published" | "Unpublished";

export type WorkflowCardType = {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  creditCost: number;
  triggerMode: WorkflowTriggerMode;
  state: WorkflowState;
  folder: folderType;
  isPinned?: boolean;
  isActive: boolean;
  hasError: boolean;
};

export const getTriggerModeIcon = (mode: WorkflowTriggerMode) => {
  switch (mode) {
    case "Manual":
      return Hammer;
    case "Scheduled":
      return AlarmClockCheck;
    case "Webhook":
      return WebhookIcon;
    default:
      return Zap;
  }
};
export const getTriggerModeText = (mode: WorkflowTriggerMode) => {
  switch (mode) {
    case "Manual":
      return "Manual";
    case "Scheduled":
      return "Run every 5 minutes, only on Tuesday";
    case "Webhook":
      return 'Waiting for webhook: "order.created"';
    default:
      return "";
  }
};
export const getWorkflowStateIcon = (state: WorkflowState) => {
  switch (state) {
    case "Draft":
      return FileEditIcon;
    case "Unpublished":
      return EyeOff;
    case "Published":
      return LucideGlobe;
    default:
      return Zap;
  }
};

const WorkflowCard = ({
  workflow,
  onClick,
  isSelected,
}: {
  workflow: WorkflowCardType;
  onClick?: () => void;
  isSelected?: boolean;
}) => {
  const [isWorkflowActive, setWorkflowActive] = useState(workflow.isActive);
  const TriggerModeIcon = getTriggerModeIcon(workflow.triggerMode);

  return (
    <div
      className={cn(
        "cursor-pointer group mb-3 w-full gap-1 p-0 bg-transparent hover:bg-neutral-100/45 border-neutral-200 border rounded-2xl overflow-clip",
        isSelected && "border-neutral-400 border-[2.7px] bg-neutral-100/45",
        workflow.hasError &&
          !isSelected &&
          "border-red-100 hover:border-red-300/80 hover:bg-red-100/60 bg-red-100/30",
        workflow.hasError &&
          isSelected &&
          "border-red-300/80 hover:border-red-300/80 hover:bg-red-100/60 bg-red-100/60"
      )}
    >
      <div className="flex flex-1 gap-3 w-full px-4 py-4 h-[5.5rem]">
        {/* Icon */}
        <button
          onClick={() => {
            onClick && onClick();
          }}
          className="h-9 w-9 rounded-full bg-primary/80 flex justify-center items-center relative"
          //   style={{ backgroundColor: WORKFLOW_COLORS[workflow.folderColor] }}
        >
          <TriggerModeIcon className="stroke-white size-5" />

          {/* Last test: Error Indicator */}
          {workflow.hasError && (
            <div className="absolute border-[3px] border-red-100/100 -bottom-1 -right-1 bg-primary rounded-full bg-red-500 p-[4.2px] w-5 h-4 flex align-middle justify-center items-center">
              <X className="stroke-white stroke-[4px] size-2 translate-x-[0.8px]" />
            </div>
          )}
        </button>

        {/* Details */}
        <button
          onClick={() => {
            onClick && onClick();
          }}
          className="flex flex-1"
        >
          <div className="flex flex-col gap-1 items-start justify-center h-fit w-[60%]">
            {/* Detail Line 1 */}
            <div className="flex">
              {/* Name */}
              <h6 className="font-semibold text-sm text-gray-900 line-clamp-1">
                {workflow.title}
              </h6>
              {/* Credit Cost */}
              <Badge
                className={cn(
                  "hidden group-hover:flex bg-transparent hover:bg-transparent border border-gray-200 rounded-2xl text-gray-600 h-5 min-w-fit text-xs cursor-pointer py-0 px-2 ml-1 shadow-none",
                  isSelected && "flex"
                )}
              >
                {formatNumber(workflow.creditCost)}{" "}
                <CoinsIcon className="size-3 ml-1" />
              </Badge>
            </div>

            {/* Detail Line 2 */}
            <div className="flex w-full gap-1 justify-start items-start">
              {/* Trigger Mode */}
              <TriggerModeIcon
                className="size-4 stroke-netext-neutral-500"
                // stroke={WORKFLOW_COLORS[workflow.folderColor]}
              />
              <p
                className="text-xs font-medium text-neutral-500 line-clamp-1 max-w-full"
                // style={{ color: WORKFLOW_COLORS[workflow.folderColor] }}
              >
                {getTriggerModeText(workflow.triggerMode)}
              </p>
            </div>

            {/* Detail Line 3 */}
            <div className="flex w-fit group/folderDetails gap-1 justify-start items-start">
              <div className="flex gap-1 items-center min-w-[50%]">
                <Squircle
                  className="size-3 stroke-none"
                  fill={workflow.folder.folderColor}
                />
                <span
                  className="text-xs font-medium text-neutral-500 line-clamp-1"
                  //   style={{ color: WORKFLOW_COLORS[workflow.folderColor] }}
                >
                  {workflow.folder.folderName}
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* CTAs */}
        <div className="flex ">
          {/* Turn On/Off */}
          <div
            className={cn(
              "mr-2 hidden group-hover:flex w-8 transition-all duration-300 h-8 justify-center items-center gap-2 bg-transparent text-neutral-500 cursor-pointer",
              isSelected && "flex"
            )}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Switch
              id="workflow_state"
              checked={isWorkflowActive}
              onCheckedChange={(isChecked) => {
                setWorkflowActive(isChecked);
              }}
              className="data-[state=unchecked]:bg-neutral-300 data-[state=checked]:bg-neutral-500"
            />
          </div>

          {/* Run */}
          <Button
            variant={"ghost"}
            className={cn(
              "hidden group-hover:flex w-8 transition-all duration-300 h-8 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm",
              isSelected && "flex"
            )}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {/* Icon */}
            <SidebarIcon
              defaultIcon={Play}
              isExpandable={false}
              type="icon"
              isSelected={undefined}
            />
          </Button>

          {/* Edit */}
          <Button
            variant={"ghost"}
            className={cn(
              "hidden group-hover:flex w-8 transition-all duration-300 h-8 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm",
              isSelected && "flex"
            )}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {/* Icon */}
            <SidebarIcon
              defaultIcon={Edit3Icon}
              isExpandable={false}
              type="icon"
              isSelected={undefined}
            />
          </Button>

          {/* More */}
          <Button
            variant={"ghost"}
            className={cn(
              "hidden group-hover:flex w-8 transition-all duration-300 h-8 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm",
              isSelected && "flex"
            )}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {/* Icon */}
            <SidebarIcon
              defaultIcon={MoreHorizontal}
              isExpandable={false}
              type="icon"
              isSelected={undefined}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowCard;
