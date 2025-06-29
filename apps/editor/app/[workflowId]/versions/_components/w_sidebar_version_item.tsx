import {
  Button,
  trashItemType,
  SidebarIcon,
  capitalizeFirstLetter,
  cn,
} from "@vscrape/ui";
import { formatDistanceToNow } from "date-fns";
import { Eye, HistoryIcon, UndoDot } from "lucide-react";

const VersionItem = ({
  item,
  isSelected,
}: {
  item: trashItemType;
  isSelected?: boolean;
}) => {
  return (
    <div
      className={cn(
        "group/versionItem my-1 pl-3 pr-2 py-1 h-11 hover:bg-neutral-200/40  bg-white cursor-pointer flex flex-1 justify-start items-center transition-all duration-200",
        isSelected && "bg-neutral-200/40 hover:bg-neutral-200/40"
      )}
    >
      {/* Icon */}
      <div className="min-w-7 max-w-7 mr-2 pt-1 flex justify-center align-top  group-hover/versionItem:opacity-90">
        <HistoryIcon className="size-5 stroke-muted-foreground" />
      </div>

      {/* Title + Subtitle */}
      <div className="flex flex-1 group-hover/trashItem:opacity-90 justify-start">
        <div className="flex flex-col items-start justify-start">
          <h6 className="text-[#333] text-xs font-semibold line-clamp-1 w-full text-left">
            {new Date("2025-02-07T09:18:52").toISOString()}
          </h6>
          <p className="text-xs -ml-1 min-w-fit text-start scale-90 font-normal text-muted-foreground/70">
            {capitalizeFirstLetter(
              formatDistanceToNow(new Date("2025-03-30T10:00:23"), {
                addSuffix: true,
              })
            )}
          </p>
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

export default VersionItem;
