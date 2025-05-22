import React from "react";
import Image from "next/image";
import { WorkflowEditorNode } from "@/lib/workflow_editor/types/w_types";
import { cn } from "@/lib/utils";

const ToolItemLine = ({
  item,
  iconColor,
}: {
  item: WorkflowEditorNode;
  iconColor: string;
}) => {
  const Icon = item.icon;
  return (
    <div
      draggable={!item.isDisabled}
      role="button"
      tabIndex={2}
      onDragStart={(e: React.DragEvent) => {
        if (item.isDisabled) return;
        e.dataTransfer.setData("application/workflowEditor", item.label);
        e.dataTransfer.effectAllowed = "move";
      }}
      className={cn(
        "cursor-grabbing rounded-md select-none col-span-1 px-3 h-8 flex gap-2 justify-start items-center bg-neutral-100 hover:bg-neutral-200/80 transition-all duration-100",
        item.isDisabled && "pointer-events-none opacity-50"
      )}
    >
      {/* Icon */}
      <div className="size-4">
        {Icon && <Icon className={"size-4"} stroke={iconColor} />}
        {item.logoPath && (
          <div className="relative h-4 w-4 mb-2">
            <Image
              src={item.logoPath}
              alt={`${item.label} logo`}
              className="select-none object-contain"
              fill
            />
          </div>
        )}
      </div>

      {/* Label */}
      <div className="truncate text-xs text-neutral-600">{item.label}</div>
    </div>
  );
};

export default ToolItemLine;
