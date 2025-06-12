import { formatDistanceToNow } from "date-fns";
import { RunItemType } from "@/lib/types";
import { redirect, useParams } from "next/navigation";
import { Loader2, LucideListCollapse } from "lucide-react";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/lib/string_utils";

export const RunItem = ({ item }: { item: RunItemType }) => {
  const { workflowId, runId } = useParams();

  return (
    <button
      onClick={() => {
        redirect(`/w/${workflowId}/runs/${item.runId}`);
      }}
      className={cn(
        "inset-0 group/runItem w-full my-1 pl-3 pr-2 py-2 hover:bg-neutral-200/40 bg-white cursor-pointer flex justify-start items-start transition-all duration-200",
        runId === item.runId && "bg-neutral-400/40 hover:bg-neutral-400/40"
      )}
    >
      {/* Icon */}
      <div className="w-8 mr-2 pt-1 flex justify-center align-top  group-hover/runItem:opacity-90 relative">
        {item.status === "running" ? (
          <div className="flex flex-1 justify-center items-center size-5">
            <Loader2 className="animate-spin text-neutral-600 stroke-[0.15rem]" />
          </div>
        ) : (
          <div>
            <LucideListCollapse className="size-5 stroke-muted-foreground" />
          </div>
        )}

        {item.status !== "running" && (
          <div
            className={cn(
              "absolute -bottom-1 -right-0 rounded-full w-[0.5rem] h-[0.5rem]",
              item.status === "failed" && "bg-red-500",
              item.status === "success" && "bg-green-500",
              item.status === "paused" && "bg-neutral-500"
            )}
          ></div>
        )}
      </div>

      {/* Title + Subtitle */}
      <div className="w-full flex flex-1 mr-0">
        <div className="flex flex-col w-full group-hover/runItem:opacity-90">
          <div className="flex w-full">
            <div
              className={cn(
                "text-[#333] text-start text-xs font-semibold line-clamp-1"
                // runResult === "failed" && "text-red-500"
              )}
            >
              {item.runId}
            </div>
          </div>
          <div className="flex flex-1">
            <p className="text-xs -ml-1 scale-90 font-normal text-muted-foreground/70">
              {/* Date */}
              {capitalizeFirstLetter(
                formatDistanceToNow(item.startedAt, {
                  addSuffix: true,
                })
              )}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
};
