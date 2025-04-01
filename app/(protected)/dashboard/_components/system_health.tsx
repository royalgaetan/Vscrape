import React from "react";
import { inboxItems } from "@/lib/fake_data";
import TextSeparator from "@/components/global/text_separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  Activity,
  BadgeInfo,
  Check,
  Cpu,
  History,
  InfoIcon,
  ListCollapseIcon,
  Loader2,
  LucideIcon,
  Play,
} from "lucide-react";
import { capitalizeFirstLetter } from "@/lib/string_utils";

export type SystemHealthStatus = "error" | "alert" | "running" | "success";

const SystemHealth = () => {
  return (
    <div className="w-full max-w-md p-4 pl-5 rounded-3xl border bg-primary/10 border-gray-200">
      <h2 className="text-base font-semibold text-gray-800 mb-4 mt-2 gap-2 flex justify-start items-center">
        <InfoIcon className="stroke-gray-800 size-5" />
        <span>Status Overview</span>
      </h2>

      <div className="ml-1 flex flex-1 justify-start items-center gap-4">
        {/* Queue Status */}
        <SystemHealthItem
          onClick={() => {}}
          Icon={ListCollapseIcon}
          systemHealthStatus="error"
          statusText={"2"}
          tooltipContent="Queue Status"
        />

        {/* Last Run Status */}
        <SystemHealthItem
          Icon={Play}
          onClick={() => {}}
          systemHealthStatus="running"
          tooltipContent="Last Run Status"
        />

        {/* Background Job Status */}
        <SystemHealthItem
          Icon={History}
          onClick={() => {}}
          systemHealthStatus="alert"
          statusText={"+9"}
          tooltipContent="Background Job Status"
        />

        {/* AI Engine State */}
        <SystemHealthItem
          Icon={Cpu}
          onClick={() => {}}
          systemHealthStatus="success"
          tooltipContent="AI Engine State"
        />
      </div>
    </div>
  );
};

export default SystemHealth;

export const SystemHealthItem = ({
  Icon,
  systemHealthStatus,
  statusText,
  tooltipContent,
  onClick,
}: {
  Icon: LucideIcon;
  systemHealthStatus?: SystemHealthStatus;
  statusText?: string;
  tooltipContent?: string;
  onClick: () => void;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button onClick={() => onClick()} className={cn("relative")}>
            {/* <span className="text-sm text-gray-600">{text}</span> */}
            <div
              className={cn(
                "rounded-full h-10 w-10 flex justify-center items-center border border-gray-900/20 bg-white"
              )}
            >
              <Icon className="size-5 stroke-gray-900/90" />
            </div>
            {/* Indicator */}
            {systemHealthStatus && (
              <div
                className={cn(
                  "absolute border-2 border-white -bottom-1 -right-1 bg-primary rounded-full p-1 w-5 h-4 flex align-middle justify-center items-center",
                  systemHealthStatus === "error" && "bg-red-500 border-none",
                  systemHealthStatus === "success" &&
                    "bg-green-500 border-none",
                  systemHealthStatus === "running" &&
                    "bg-white  border-gray-900/20",
                  systemHealthStatus === "alert" && "bg-yellow-400  border-none"
                )}
              >
                {systemHealthStatus === "error" && (
                  <span className="text-white font-semibold text-xs scale-75">
                    {statusText}
                  </span>
                )}
                {systemHealthStatus === "alert" && (
                  <span className="text-white font-semibold text-xs scale-75">
                    {statusText}
                  </span>
                )}
                {systemHealthStatus === "success" && (
                  <Check className="stroke-white stroke-[4px]" />
                )}
                {systemHealthStatus === "running" && (
                  <Loader2 className="animate-spin text-neutral-500" />
                )}
              </div>
            )}
          </button>
        </TooltipTrigger>
        {tooltipContent && (
          <TooltipContent className="bg-neutral-700/95 text-white text-xs w-fit px-2 py-1">
            <p className="mb-1">{tooltipContent}</p>
            {systemHealthStatus && (
              <p className="text-gray-100">
                {capitalizeFirstLetter(systemHealthStatus.toString())}{" "}
                {statusText && ` : ${statusText}`}
              </p>
            )}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};
