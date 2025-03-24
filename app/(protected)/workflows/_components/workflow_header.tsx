import { Separator } from "@/components/ui/separator";
import React from "react";
import SettingItemSearchBar from "../../_settings/_components/settings_item_searchbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SidebarIcon } from "@/components/global/app_sidebar";
import { MoreHorizontalIcon } from "lucide-react";

const WorkflowHeader = ({
  headerText,
  buttons,
}: {
  headerText: string;
  buttons: React.ReactNode;
}) => {
  return (
    <div className="w-full flex flex-col mt-4 group">
      <div className="flex flex-1 justify-center items-center">
        {/* Header Text */}
        <div className="text-base font-semibold flex flex-1 justify-start items-center">
          <span>{headerText}</span>
          {headerText !== "All" && (
            <Button
              variant={"ghost"}
              className={cn(
                "hidden group-hover:flex w-8 ml-3 transition-all duration-300 h-8 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm"
              )}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {/* Icon */}
              <SidebarIcon
                defaultIcon={MoreHorizontalIcon}
                isExpandable={false}
                type="icon"
                isSelected={undefined}
              />
            </Button>
          )}
        </div>

        {/* Buttons */}
        {buttons}
      </div>
      <Separator className="w-full ml-0 mr-5 my-2" />
    </div>
  );
};

export default WorkflowHeader;
