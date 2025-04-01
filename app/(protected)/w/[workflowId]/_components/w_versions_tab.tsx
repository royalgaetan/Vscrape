import { trashItemType } from "@/app/(protected)/_trash/trash";
import { SidebarIcon } from "@/components/global/app_sidebar";
import { Button } from "@/components/ui/button";
import { trashItems } from "@/lib/fake_data";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Eye, HistoryIcon, UndoDot } from "lucide-react";
import React from "react";

const WVersionsTab = () => {
  return (
    <div className="h-px">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-[#333] px-4 mb-3 mt-4">
        Old Versions
      </h2>

      <div className="h-max w-full overflow-x-clip overflow-y-auto pb-5">
        {trashItems.length === 0 ? (
          <div className=" text-muted-foreground text-xs font-semibold flex flex-1 justify-center items-center h-44">
            No old version found.
          </div> // Display "Not found" if no matches are found
        ) : (
          trashItems.map((item) => {
            return <VersionItem key={item.title} item={item} />;
          })
        )}
      </div>
    </div>
  );
};

export default WVersionsTab;

const VersionItem = ({ item }: { item: trashItemType }) => {
  return (
    <div className="group/versionItem w-full my-1 pl-3 pr-2 py-1 hover:bg-neutral-200/40  bg-white cursor-pointer flex justify-start items-start transition-all duration-200">
      {/* Icon */}
      <div className="w-8 mr-2 pt-1 flex justify-center align-top  group-hover/versionItem:opacity-90">
        <HistoryIcon className="size-5 stroke-muted-foreground" />
      </div>

      {/* Title + Subtitle */}
      <div className="w-full flex flex-1 mr-0">
        <div className="flex flex-col w-full group-hover/versionItem:opacity-90">
          <h6 className="text-[#333] text-xs font-semibold line-clamp-1">
            {item.title}
          </h6>
          <div className="flex flex-1">
            <p className="text-xs -ml-1 scale-90 font-normal text-muted-foreground/70">
              {capitalizeFirstLetter(
                formatDistanceToNow(new Date("2025-03-30T10:00:23"), {
                  addSuffix: true,
                })
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons: CTA */}
      <div className=" flex w-fit">
        {/* Preview */}
        <Button
          variant={"ghost"}
          className={cn(
            "hidden group-hover/versionItem:flex w-8 transition-all duration-300 h-8 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm"
          )}
        >
          {/* Icon */}
          <SidebarIcon
            defaultIcon={Eye}
            isExpandable={false}
            type="icon"
            isSelected={undefined}
          />
        </Button>

        {/* Revert */}
        <Button
          variant={"ghost"}
          className={cn(
            "hidden group-hover/versionItem:flex w-8 transition-all duration-300 h-8 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm"
          )}
        >
          {/* Icon */}
          <SidebarIcon
            defaultIcon={UndoDot}
            isExpandable={false}
            type="icon"
            isSelected={undefined}
          />
        </Button>
      </div>
    </div>
  );
};
