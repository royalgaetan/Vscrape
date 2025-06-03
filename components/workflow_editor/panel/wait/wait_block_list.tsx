import { useWorkflowEditorStore } from "@/stores/workflowStore";
import React, { useEffect, useState } from "react";
import { AlarmCheckIcon } from "lucide-react";
import { WaitBlock } from "@/lib/workflow_editor/classes/wait_block";
import { millisecondsToDuration } from "@/lib/date_time_utils";
import DurationPicker from "@/components/global/duration_picker";
import { formatDuration } from "date-fns";

const WaitBlockList = ({
  onSave,
}: {
  onSave: (waitBlock: WaitBlock | undefined) => void;
}) => {
  // Store:
  const currentNode = useWorkflowEditorStore((s) => s.currentNode);
  // End Store
  const [waitBlockDurationMs, setWaitBlockDurationMs] = useState(
    currentNode ? (currentNode.blocks as WaitBlock).durationMs : undefined
  );

  useEffect(() => {
    if (!currentNode) return;
    const sub = currentNode.stream$().subscribe((newData) => {
      setWaitBlockDurationMs((newData.blocks as WaitBlock).durationMs);
    });

    return () => sub.unsubscribe();
  }, []);

  if (!currentNode || !waitBlockDurationMs) {
    return <div></div>;
  }

  return (
    // Here Blocks represents: Wait
    <DurationPicker
      initialDurationMs={waitBlockDurationMs}
      onSelect={(timePicked) => {
        if (
          typeof timePicked !== "number" ||
          !(currentNode.blocks instanceof WaitBlock)
        )
          return;
        currentNode.blocks.durationMs = timePicked;
        onSave(currentNode.blocks);
      }}
    >
      <div className="flex flex-col gap-6 mt-[3rem] cursor-pointer hover:opacity-70 transition-all duration-300 origin-center active:scale-[0.99]">
        {/* Icon */}
        <div className="flex flex-1 justify-center items-center">
          <AlarmCheckIcon className="size-28 stroke-neutral-300 stroke-[1.3px]" />
        </div>

        {/* Duration Input */}
        <div className="flex flex-col w-full items-center">
          <div className="text-xs text-muted-foreground">Will wait for</div>
          <div className="mt-2 text-center font-semibold text-neutral-700 text-base break-words w-[80%]">
            {formatDuration(millisecondsToDuration(waitBlockDurationMs))}
          </div>
        </div>
      </div>
    </DurationPicker>
  );
};

export default WaitBlockList;
