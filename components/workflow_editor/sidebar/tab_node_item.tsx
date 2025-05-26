import React from "react";
import Image from "next/image";
import { WorkflowEditorNode } from "@/lib/workflow_editor/types/w_types";
import { cn } from "@/lib/utils";

const TabNodeItem = ({ node }: { node: WorkflowEditorNode }) => {
  const Icon = node.icon;
  return (
    <div
      draggable={!node.isDisabled}
      role="button"
      tabIndex={2}
      onDragStart={(e: React.DragEvent) => {
        if (node.isDisabled) return;
        e.dataTransfer.setData("application/workflowEditor", node.label);
        e.dataTransfer.effectAllowed = "move";
      }}
      className={cn(
        "cursor-grabbing rounded-md select-none col-span-1 px-3 h-8 flex gap-2 justify-start items-center bg-neutral-100 hover:bg-neutral-200/80 transition-all duration-100",
        node.isDisabled && "pointer-events-none opacity-50"
      )}
    >
      {/* Icon */}
      <div className="size-4">
        {Icon && <Icon className={"size-4"} stroke={node.iconColor} />}
        {node.logoPath && (
          <div className="relative h-4 w-4 mb-2">
            <Image
              src={node.logoPath}
              alt={`${node.label} logo`}
              className="select-none object-contain"
              fill
            />
          </div>
        )}
      </div>

      {/* Label */}
      <div className="truncate text-xs text-neutral-600">{node.label}</div>
    </div>
  );
};

export default TabNodeItem;
