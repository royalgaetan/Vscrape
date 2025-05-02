import React from "react";
import Image from "next/image";
import { useWorkflowEditor } from "@/hooks/useWorkflowEditor";
import { WorkflowEditorToolItem } from "@/lib/workflow_editor/types/w_types";

const ToolItemLine = ({
  item,
  iconColor,
}: {
  item: WorkflowEditorToolItem;
  iconColor: string;
}) => {
  const Icon = item.icon;
  return (
    <div
      draggable
      role="button"
      tabIndex={2}
      onDragStart={(e: React.DragEvent) => {
        e.dataTransfer.setData("application/workflowEditor", item.label);
        e.dataTransfer.effectAllowed = "move";
      }}
      className="cursor-grabbing rounded-md select-none col-span-1 px-3 h-8 flex gap-2 justify-start items-center bg-neutral-100 hover:bg-neutral-200/80 transition-all duration-100"
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
