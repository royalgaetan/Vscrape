import SimpleTooltip from "@/components/global/simple_tooltip";
import { Button } from "@/components/ui/button";
import { formatLargeNumber } from "@/lib/date_time_utils";
import { cn } from "@/lib/utils";
import { NodeTest } from "@/lib/workflow_editor/types/w_types";
import { getNodeTestIcon } from "@/lib/workflow_editor/utils/w_utils";
import { useWorkflowEditorStore } from "@/stores/workflowStore";
import {
  Bell,
  BellRingIcon,
  Coins,
  Copy,
  LucideIcon,
  Trash2,
} from "lucide-react";
import React, { useRef } from "react";

const NodeActionButtons = () => {
  // Store
  const currentNode = useWorkflowEditorStore((s) => s.currentNode);
  const setNodeIdToActOn = useWorkflowEditorStore((s) => s.setNodeIdToActOn);
  //   End Store

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

  return (
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
          <span>{NotificationIcon.current === Bell ? "Off" : "On"}</span>
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
            if (!currentNode) return;
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
            if (!currentNode) return;
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
  );
};

export default NodeActionButtons;
