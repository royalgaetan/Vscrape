import { NodeBlockType, useWorkflowEditorStore } from "@/stores/workflowStore";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlarmCheckIcon,
  AlarmClockPlusIcon,
  ChevronDown,
  ChevronUp,
  PenLineIcon,
  Trash2,
} from "lucide-react";
import { PossibleFieldBlockType as FieldBlockType } from "@/lib/workflow_editor/constants/workflow_form_fields_definition";
import SimpleTooltip from "@/components/global/simple_tooltip";
import construe from "cronstrue";
import { CronBlock } from "@/lib/workflow_editor/classes/cron_block";
import { cn } from "@/lib/utils";
import { fakeUsers } from "@/lib/fake_data";

const CronBlockList = ({
  onCronEdit,
  onCronDelete,
}: {
  onCronEdit: (cronBlock: CronBlock | undefined) => void;
  onCronDelete: (cronBlockId: string) => void;
}) => {
  // Store:
  const currentNode = useWorkflowEditorStore((s) => s.currentNode);
  // End Store
  const [cronBlock, setCronBlock] = useState(
    currentNode ? (currentNode.blocks as CronBlock) : undefined
  );

  useEffect(() => {
    if (!currentNode) return;
    const sub = currentNode.stream$().subscribe((newData) => {
      setCronBlock(newData.blocks as CronBlock);
    });

    return () => sub.unsubscribe();
  }, []);

  if (!currentNode) {
    return <div></div>;
  }

  return (
    // Here Blocks represents: Cron
    <div>
      {!cronBlock || !(cronBlock instanceof CronBlock) ? (
        // Empty
        <div className="flex flex-1 ">
          <Button
            variant={"ghost"}
            className={cn(
              "flex flex-1 h-8 border border-dashed !py-[0.3rem] !w-full px-2 transition-all duration-300 justify-center items-center gap-1 hover:bg-white bg-white cursor-pointer rounded-sm hover:text-neutral-500/60 text-neutral-500 active:scale-[0.97]"
            )}
            onClick={() => onCronEdit(undefined)}
          >
            <AlarmClockPlusIcon className="stroke-neutral-400 size-4 stroke-[1.8px]" />
            Add a schedule
          </Button>
        </div>
      ) : (
        // /Content
        <div
          key={cronBlock.id}
          className="relative group/cronBlock flex flex-col w-full px-3 py-4 border border-border overflow-clip rounded-md bg-neutral-100/20 transition-all duration-200"
        >
          {/* Background Icon */}
          <div className="absolute bottom-0 pointer-events-none z-[9]">
            <AlarmCheckIcon className="size-20 -rotate-[32deg] translate-x-[11rem] -translate-y-5 stroke-neutral-200/50 " />
          </div>

          {/* Detail */}
          <div className="flex flex-col relative z-10">
            <div className="w-full text-base font-semibold text-[#333] line-clamp-1 mb-1">
              Scheduled
            </div>
            <p className="w-full line-clamp-1 text-muted-foreground text-xs font-light mb-[2px]">
              Will Trigger the workflow :
            </p>
            <p className="w-full text-wrap text-neutral-500 text-xs">
              {construe.toString(cronBlock.cronExp, {
                use24HourTimeFormat: true,
              })}
            </p>
          </div>

          {/* Action Buttons: Edit | Delete | Move Up | Move Down */}
          <div className="!h-4 relative z-10">
            <div className="group-hover/cronBlock:visible invisible flex flex-1 gap-1 justify-end items-center pt-1">
              {/* Edit */}
              <SimpleTooltip tooltipText="Edit Cron">
                <Button
                  variant={"ghost"}
                  className={cn(
                    "!h-5 px-2 flex items-center justify-center hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer rounded-sm transition-all duration-300"
                  )}
                  onClick={() => {
                    onCronEdit(cronBlock);
                  }}
                >
                  <PenLineIcon className="!size-3" /> Edit
                </Button>
              </SimpleTooltip>

              {/* Delete */}
              <SimpleTooltip tooltipText="Delete Cron">
                <Button
                  variant={"ghost"}
                  className={cn(
                    "!h-5 px-2 flex items-center justify-center hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer rounded-sm transition-all duration-300"
                  )}
                  onClick={() => onCronDelete(cronBlock.id)}
                >
                  <Trash2 className="!size-3" /> Delete
                </Button>
              </SimpleTooltip>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CronBlockList;
