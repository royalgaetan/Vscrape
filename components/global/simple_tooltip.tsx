import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const SimpleTooltip = ({
  children,
  tooltipText,
  side,
  align,
}: {
  children: React.ReactNode;
  tooltipText: string;
  side?: "bottom" | "top" | "right" | "left";
  align?: "center" | "start" | "end";
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>

        <TooltipContent
          side={side}
          align={align}
          className="bg-neutral-700/95 text-white text-xs w-fit px-3 py-1"
        >
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SimpleTooltip;
