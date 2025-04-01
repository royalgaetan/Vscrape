import { Badge } from "@/components/ui/badge";
import { PhaseItemType } from "@/lib/types";
import { Clock, Coins, LucideIcon, Workflow } from "lucide-react";
import React from "react";

const PhaseDetail = ({ phase }: { phase: PhaseItemType | undefined }) => {
  return (
    <div className="flex flex-1">
      {!phase && (
        <div className="flex flex-1 w-full h-full justify-center items-center">
          <div className="flex flex-col justify-center items-center text-center">
            <p className="text-neutral-400 font-normal text-xs">
              Choose a phase to view details.
            </p>
          </div>
        </div>
      )}

      {phase && (
        <div className="flex flex-col justify-start items-start gap-1 px-4 py-3">
          {/* Phase Title */}
          <h4 className="font-medium mt-4 flex items-center gap-2">
            <Workflow className="size-5 stroke-neutral-800 " />{" "}
            <span>{phase.title}</span>
          </h4>

          {/* Phase Details */}
          <div className="flex w-full gap-2">
            <PhaseDetailBadge Icon={Coins} label={phase.creditConsumed} />
            <PhaseDetailBadge Icon={Clock} label={phase.creditConsumed} />
          </div>

          {/* Phase: Data Input */}

          {/* Phase: Data Output */}

          {/* Phase Logs */}
        </div>
      )}
    </div>
  );
};

export default PhaseDetail;

const PhaseDetailBadge = ({
  Icon,
  label,
}: {
  Icon: LucideIcon;
  label: React.ReactNode;
}) => {
  return (
    <Badge className="border hover:border border-border h-6 bg-transparent hover:bg-border/10 flex gap-1 justify-center items-center cursor-pointer py-1 px-2 shadow-none">
      <Icon className="size-3 stroke-foreground" />
      <span className="text-xs text-foreground">{label}</span>
    </Badge>
  );
};
