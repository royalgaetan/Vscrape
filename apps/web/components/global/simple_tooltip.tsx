import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";

export type TooltipSide = "bottom" | "top" | "right" | "left" | undefined;
export type TooltipAlign = "center" | "start" | "end" | undefined;

const SimpleTooltip = ({
  children,
  tooltipText,
  side,
  align,
  enableAsChild,
  className,
}: {
  side?: TooltipSide;
  align?: TooltipAlign;
  children: React.ReactNode;
  tooltipText: string;
  enableAsChild?: boolean;
  className?: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          asChild={enableAsChild ?? true}
          className={cn(enableAsChild === false && "flex flex-1")}
        >
          {children}
        </TooltipTrigger>

        <TooltipContent
          side={side}
          align={align}
          className={cn(
            "bg-neutral-700/95 text-white text-xs w-fit px-3 py-1",
            className
          )}
        >
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SimpleTooltip;
