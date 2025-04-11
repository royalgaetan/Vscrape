import { generateHexRandomString } from "@/lib/numbers_utils";
import {
  RunResultsType,
  WorkflowEditorToolItem,
} from "@/lib/workflow_editor/w_types";
import {
  getWorkflowSectionFromName,
  getWorkflowToolItemFromLabel,
} from "@/lib/workflow_editor/w_utils";
import React, { useRef } from "react";
import { ClassicScheme, RenderEmit } from "rete-react-plugin";
import Image from "next/image";
import {
  Bell,
  BellRingIcon,
  CircleCheck,
  CircleDashedIcon,
  CircleX,
  Coins,
  GripVertical,
  Loader2,
  LucideIcon,
  Plus,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { SidebarIcon } from "../global/app_sidebar";
import { Badge } from "../ui/badge";
import { formatLargeNumber } from "@/lib/date_time_utils";
import { getPhaseStatusInfo } from "@/app/(protected)/w/[workflowId]/runs/_components/w_phase_details";

type NodeTest = "failed" | "success" | "running";
export const getNodeTestIcon = (
  status: NodeTest
): { icon: LucideIcon; label: string; iconClassname?: string } => {
  switch (status) {
    case "failed":
      return {
        icon: CircleX,
        label: "Failed",
        iconClassname: "stroke-red-400",
      };
    case "success":
      return {
        icon: CircleCheck,
        label: "Completed",
        iconClassname: "stroke-green-600",
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
        label: "—",
      };
  }
};

type Props<S extends ClassicScheme> = {
  data: S["Node"];
  emit: RenderEmit<S>;
};

const CustomNode = <S extends ClassicScheme>(props?: Props<S>): JSX.Element => {
  const arrayLength = useRef<number>(Math.round(Math.random() * 10));
  const creditCost = useRef<number>(Math.round(Math.random() * 120));
  const randomId = useRef<string>(generateHexRandomString(7));

  const NotificationIcon = useRef<LucideIcon>(
    Math.random() < 0.7 ? Bell : BellRingIcon
  );
  const NotificationIconB = NotificationIcon.current;
  const unitTestArr = ["failed", "success", "running"] as const;
  const unitTestResult = useRef<NodeTest>(
    unitTestArr[Math.round(Math.random() * unitTestArr.length)]
  );
  const UnitTestIcon = getNodeTestIcon(unitTestResult.current).icon;
  const unitTestInfo = getNodeTestIcon(unitTestResult.current);

  const toolItem = useRef<WorkflowEditorToolItem | null>(
    getWorkflowToolItemFromLabel(props?.data.label ?? "")
  );
  const Icon = toolItem.current?.icon as LucideIcon;
  const sectionInfo = useRef(
    getWorkflowSectionFromName(toolItem.current?.sectionName ?? "")
  );

  return (
    <div className="flex group w-72 gap-4 bg-white border border-border p-3 select-none rounded-xl">
      {/* Icon & Logo */}
      <div className="justify-center items-center size-11">
        {Icon && (
          <div
            className={cn("flex size-9 rounded-sm justify-center items-center")}
            style={{ backgroundColor: sectionInfo.current?.[1].iconColor }}
          >
            <Icon className={"size-5"} stroke={"white"} />
          </div>
        )}
        {toolItem.current?.logoPath && (
          <div className="relative h-8 w-8 mb-0">
            <Image
              src={toolItem.current?.logoPath}
              alt={`${toolItem.current?.label} logo`}
              className="select-none object-contain"
              fill
            />
          </div>
        )}
      </div>

      {/* Content: SectionName */}
      <div className="flex flex-1 overflow-clip">
        <div className="flex flex-col w-full">
          {/* Header */}
          <div className="flex flex-1 w-full gap-1 items-center">
            {/* Section Name */}
            <div>
              <h6 className="w-full line-clamp-1 font-bold text-neutral-900 text-base">
                {toolItem.current?.label} Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Culpa magnam fuga unde. Doloribus
                ipsa saepe eius molestiae non delectus pariatur recusandae
                inventore, aut et fugit incidunt quos itaque, laboriosam
                deserunt!
              </h6>
            </div>

            {/* CTA Buttons */}
            <div className="flex h-full justify-center items-start">
              {/* CreditCost */}
              <Badge
                variant={"outline"}
                className="-mr-2 hidden group-hover:flex gap-1 text-xs font-medium border-none h-8 text-neutral-400 rounded-sm cursor-pointer hover:bg-transparent bg-transparent"
              >
                <Coins className="size-4 stroke-neutral-400" />
                <span className="scale-90">
                  {formatLargeNumber(creditCost.current)}
                </span>
              </Badge>

              {/* Grab Button */}
              <Button
                variant={"ghost"}
                className={cn(
                  "flex w-8 transition-all duration-300 h-8 justify-center items-center gap-2 hover:bg-transparent bg-transparent text-neutral-500 cursor-grab mb-[0.9px] px-3 rounded-sm"
                )}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {/* Icon */}
                <GripVertical className="stroke-neutral-400" />
              </Button>
            </div>
          </div>

          {/* Operations List */}
          <div className="flex flex-col w-full gap-1">
            {[
              "Video/Audio Upload",
              "Create Video Transcript",
              "Save Transcript",
              "Summarize Transcript",
              "Get lastest informations about the scripts",
            ].map((item) => (
              <p className="w-full line-clamp-1 text-xs" key={item}>
                {item}
              </p>
            ))}
          </div>

          {/* Buttons: Add Operation, Notification, Test Unit */}
          <div className="flex max-w-52 h-5 mt-2 gap-0 items-center justify-start overflow-clip">
            {/* Operation button */}
            <Button
              variant={"ghost"}
              className={cn(
                "scale-[0.8] hidden group-hover:flex w-fit bg-orange-300 px-2 border border-border/20 text-neutral-500 h-6 transition-all duration-300 justify-center items-center gap-0 hover:bg-neutral-200/40 bg-transparent cursor-pointer rounded-sm"
              )}
              onPointerDown={(e) => {
                e.preventDefault();
                console.log("Add an Operation");
              }}
            >
              {/* Icon */}
              <Plus className="stroke-neutral-500 !size-3" />
              <span>Add</span>
            </Button>

            {/* Notification */}
            <Button
              variant={"ghost"}
              className={cn(
                "scale-[0.8] -translate-x-[6px] hidden group-hover:flex w-fit px-2 border border-border/20 text-neutral-500 h-6 transition-all duration-300 justify-center items-center gap-1 hover:bg-neutral-200/40 bg-transparent cursor-pointer rounded-sm"
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
              <span>{NotificationIcon.current === Bell ? "Off" : "On"}</span>
            </Button>

            {/* Test Unit */}
            <Button
              variant={"ghost"}
              className={cn(
                "scale-[0.8] translate-x-[-10px] hidden group-hover:flex w-fit px-2 border border-border/20 text-neutral-500 h-6 transition-all duration-300 justify-center items-center gap-1 hover:bg-neutral-200/40 bg-transparent cursor-pointer rounded-sm"
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
        </div>
      </div>
    </div>
  );
};
export default CustomNode;
