import { CronBlock, useWorkflowEditorStore } from "@vscrape/engine/src";
import React, { useEffect, useState } from "react";
import { cn, SimpleTooltip, Button } from "@vscrape/ui";
import {
  AlarmCheckIcon,
  AlarmClockPlusIcon,
  PenLineIcon,
  Trash2,
} from "lucide-react";
import construe from "cronstrue";

const CronBlockList = ({
  onCronEdit,
  onCronDelete,
}: {
  onCronEdit: (cronBlock: CronBlock | undefined) => void;
  onCronDelete: () => void;
}) => {
  // Store:
  const currentNode = useWorkflowEditorStore((s) => s.currentNode);
  const currentEditor = useWorkflowEditorStore((s) => s.currentEditor);
  // End Store
  const [cronBlock, setCronBlock] = useState(
    currentNode ? (currentNode.block as CronBlock) : undefined
  );

  useEffect(() => {
    if (!currentNode) return;
    const sub = currentNode.stream$().subscribe((newData: any) => {
      setCronBlock(newData.block as CronBlock);
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
          className={cn(
            "relative group/cronBlock flex flex-col w-full px-3 py-4 ring-2 ring-transparent border border-border overflow-clip rounded-md bg-neutral-100/20 transition-all duration-200",
            currentEditor.errors?.has(cronBlock.id) &&
              "border-destructive/90 ring-destructive/40"
          )}
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
                  onClick={() => onCronDelete()}
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
