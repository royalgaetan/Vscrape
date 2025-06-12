import SettingItemTable from "@/app/(protected)/_settings/_components/settings_item_table";
import JSONPreviewDialog from "@/components/dialogs/json_preview_dialog";
import { SidebarIcon } from "@/components/global/app_sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDurationFromMs } from "@/lib/date_time_utils";
import { capitalizeFirstLetter, formatNumber } from "@/lib/string_utils";
import { cn } from "@/lib/utils";
import {
  PhaseInput,
  PhaseItemType,
  PhaseLog,
  PhaseOutput,
  RunResultsType,
} from "@/lib/workflow_editor/types/w_types";
import {
  Check,
  CircleDashedIcon,
  Clock,
  Coins,
  Loader2,
  LucideIcon,
  Maximize2,
  Pause,
  Workflow,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactJson from "react-json-view";

export const getPhaseStatusInfo = (
  status: RunResultsType
): { icon: LucideIcon; label: string; iconClassname?: string } => {
  switch (status) {
    case "failed":
      return {
        icon: X,
        label: "Failed",
      };
    case "success":
      return {
        icon: Check,
        label: "Completed",
      };
    case "paused":
      return {
        icon: Pause,
        label: "Paused",
        iconClassname: "stroke-none fill-neutral-600",
      };
    case "running":
      return {
        icon: Loader2,
        label: "Running",
        iconClassname: "animate-spin text-neutral-500",
      };

    default:
      return {
        icon: CircleDashedIcon,
        label: "",
      };
  }
};

const PhaseDetail = ({ phase }: { phase: PhaseItemType | undefined }) => {
  const [isLoadingPhaseLogs, setLoadingPhaseLogs] = useState(false);
  const [phaseLogsData, setPhaseLogsData] = useState<PhaseLog[]>([]);

  useEffect(() => {
    getPhaseLogsData();
  }, [phase]);

  const getPhaseLogsData = async () => {
    if (!phase) return;
    setLoadingPhaseLogs(true);
    setPhaseLogsData([]);
    setTimeout(() => {
      setPhaseLogsData(phase.logs);
      setLoadingPhaseLogs(false);
    }, 700);
  };

  return (
    <div className="flex flex-1">
      {!phase && (
        <div className="flex flex-1 w-full h-full justify-center items-center">
          <div className="flex flex-col justify-center items-center text-center">
            <p className="text-neutral-400 font-normal text-xs">
              Choose a phase to view details.
            </p>
          </div>
        </div>
      )}

      {phase && (
        <div className="flex flex-col w-full justify-start items-start gap-1 px-4 py-3 overflow-auto scrollbar-hide">
          {/* Phase Title */}
          <h4 className="font-medium mt-4 flex items-center gap-2">
            <Workflow className="size-5 stroke-neutral-800 " />{" "}
            <span>{phase.title}</span>
          </h4>

          {/* Phase Details */}
          <div className="flex w-full gap-2 mt-1 mb-4">
            <PhaseDetailBadge Icon={Coins} label={phase.creditConsumed} />
            <PhaseDetailBadge
              Icon={Clock}
              label={formatDurationFromMs(phase.durationMs)}
            />
            <PhaseDetailBadge
              Icon={getPhaseStatusInfo(phase.status).icon}
              label={getPhaseStatusInfo(phase.status).label}
              iconClassName={getPhaseStatusInfo(phase.status).iconClassname}
            />
          </div>
          <Separator />

          {/* Phase: Data Input */}
          <div className="flex flex-col justify-start items-start w-full">
            <h4 className="font-medium mt-4 flex items-center gap-2">Inputs</h4>
            <p className="text-neutral-400 text-xs">
              Initial inputs used in this phase
            </p>
            <div className="w-full mt-2 mb-7">
              {phase.dataInputs.map((input) => {
                return (
                  <ThroughputItemLine key={input.value} throughput={input} />
                );
              })}
            </div>
            <Separator />
          </div>

          {/* Phase: Data Output */}
          <div className="flex flex-col justify-start items-start w-full">
            <h4 className="font-medium mt-4 flex items-center gap-2">
              Outputs
            </h4>
            <p className="text-neutral-400 text-xs">
              Generated results for this phase
            </p>
            <div className="w-full mt-2 mb-7">
              {phase.dataOutputs.map((output) => {
                return (
                  <ThroughputItemLine key={output.value} throughput={output} />
                );
              })}
            </div>
            <Separator />
          </div>

          {/* Phase Logs */}
          <div className="flex flex-col justify-start items-start w-full">
            <h4 className="font-medium mt-4 flex items-center gap-2">Logs</h4>
            <div className="flex flex-1 justify-center items-center w-full">
              <SettingItemTable
                dataType="phaseLogs"
                isLoading={isLoadingPhaseLogs}
                tableCaption="All logs for this phase have been loaded."
                data={phaseLogsData}
                onRefresh={() => getPhaseLogsData()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhaseDetail;

const PhaseDetailBadge = ({
  Icon,
  label,
  iconClassName,
}: {
  Icon: LucideIcon;
  label: React.ReactNode;
  iconClassName?: string;
}) => {
  return (
    <Badge className="border hover:border border-border h-6 bg-transparent hover:bg-border/10 flex gap-1 justify-center items-center cursor-pointer py-1 px-2 shadow-none">
      <Icon className={cn("size-3 stroke-foreground", iconClassName)} />
      <span className="text-xs text-foreground">{label}</span>
    </Badge>
  );
};

const ThroughputItemLine = ({
  throughput,
}: {
  throughput: PhaseInput | PhaseOutput;
}) => {
  return (
    <div className="flex flex-1 py-1 px-2 my-1 gap-3 rounded-sm hover:bg-neutral-200/30 bg-transparent group/throughputItemLine duration-150 transition-all">
      {/* Label */}
      <div className="w-32 cursor-pointer text-xs items-center font-medium text-muted-foreground/90">
        <div className="w-full line-clamp-1">{throughput.label}</div>
      </div>

      {/* Value */}
      <div className="cursor-pointer flex flex-1 overflow-clip justify-end text-xs font-normal text-neutral-600">
        <div className="mr-1 max-w-[15vw]">
          {/* Null Values */}
          {(throughput.type === "null" || throughput.value === null) && "N/A"}
          {/* String Values */}
          {typeof throughput.value === "string" &&
            throughput.type === "string" &&
            throughput.value}
          {/* Number Values */}
          {typeof throughput.value === "number" &&
            throughput.type === "number" &&
            formatNumber(throughput.value)}
          {/* Boolean Values */}
          {typeof throughput.value === "boolean" &&
            throughput.type === "boolean" &&
            capitalizeFirstLetter(throughput.value.toString())}
          {/* JSON Values */}
          {throughput.type === "JSON" && throughput.value !== null && (
            <div className="group/jsonContainer relative">
              <div className="max-h-[20vh] max-w-[20vw] overflow-auto scrollbar-hide">
                <ReactJson enableClipboard={false} src={throughput.value} />
              </div>

              {/* Preview JSON: Expand */}
              <JSONPreviewDialog jsonValue={throughput.value}>
                <Button
                  variant={"ghost"}
                  className={cn(
                    "absolute bottom-0 right-0 hidden group-hover/jsonContainer:flex w-8 transition-all duration-300 h-8 justify-center items-center gap-2 hover:bg-neutral-200 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm"
                  )}
                >
                  {/* Icon */}
                  <SidebarIcon
                    defaultIcon={Maximize2}
                    isExpandable={false}
                    type="icon"
                    isSelected={undefined}
                  />
                </Button>
              </JSONPreviewDialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
