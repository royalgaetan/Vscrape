import { Badge } from "@/components/ui/badge";
import { PhaseItemType } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  CheckCircle2Icon,
  CircleXIcon,
  Loader2,
  PauseCircleIcon,
} from "lucide-react";

const PhaseItemLine = ({
  phase,
  position,
  isSelected,
  onClick,
}: {
  phase: PhaseItemType;
  position: number;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={() => onClick()}
      className={cn(
        "inset-0 rounded-lg flex flex-1 min-w-full justify-start items-center h-8 pr-2 pl-2 py-2 hover:bg-neutral-200/40 bg-transparent cursor-pointer transition-all duration-200",
        isSelected && "bg-neutral-300/40 hover:bg-neutral-300/40"
      )}
    >
      {/* Number */}
      <Badge variant={"outline"} className="mr-1 text-xs scale-[0.80]">
        {position}
      </Badge>

      {/* Title */}
      <div className="text-xs font-medium line-clamp-1 w-full text-start">
        {phase.title}
      </div>

      {/* Phase status */}
      <div className="w-5 ml-2">
        {phase.status === "running" && (
          <Loader2 className="animate-spin stroke-neutral-500 size-4" />
        )}
        {phase.status === "success" && (
          <CheckCircle2Icon className="stroke-green-500 size-4" />
        )}
        {phase.status === "failed" && (
          <CircleXIcon className="stroke-red-500 size-4" />
        )}
        {phase.status === "paused" && (
          <PauseCircleIcon className=" stroke-neutral-500 size-4" />
        )}
      </div>
    </button>
  );
};

export default PhaseItemLine;
