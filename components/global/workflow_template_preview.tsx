import { cn } from "@/lib/utils";
import { Shapes } from "lucide-react";
import React from "react";

export const WorkflowTemplatePreview = ({
  containerClassName,
  containerWidth,
  containerHeight,
}: {
  containerClassName?: string;
  containerHeight?: number | string;
  containerWidth?: number | string;
}) => {
  return (
    <div
      style={{
        height: containerHeight ?? "100%",
        width: containerWidth ?? "100%",
      }}
      className={cn(
        "justify-center items-center flex flex-1 my-3 bg-neutral-100",
        containerClassName
      )}
    >
      <div className="flex flex-col justify-center items-center animate-pulse">
        <Shapes className="size-16 stroke-neutral-400 mb-2 stroke-[1px]" />
        <span className="text-muted-foreground text-xs font-normal">
          Workflow Template Preview...
        </span>
      </div>
    </div>
  );
};
