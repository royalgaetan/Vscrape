"use client";

import React, { useState } from "react";

import {
  Folder,
  Pin,
  Coins,
  LucideIcon,
  PinOff,
  Text,
  UserPen,
  Clock,
  ToggleLeft,
  ToggleRight,
  ShieldCloseIcon,
  ShieldCheck,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { folderType } from "../layout";
import WorkflowCard, {
  getTriggerModeIcon,
  getTriggerModeText,
  getWorkflowStateIcon,
  WorkflowCardType,
} from "./workflow_card";
import SettingItemSearchBar from "../../_settings/_components/settings_item_searchbar";
import WorkflowHeader from "./workflow_header";
import { getTimeAgoWithLimit } from "@/lib/date_time_utils";
import { formatNumber, isSearchTermFound } from "@/lib/string_utils";
import { cn } from "@/lib/utils";

const WorkflowList = ({
  workflowList,
  folder,
}: {
  workflowList: WorkflowCardType[];
  folder: folderType;
}) => {
  const [searchContent, setSearchContent] = useState("");
  const [workflowSelected, setWorkflowSelected] = useState<WorkflowCardType>();
  const filteredWorkflowsList = workflowList.filter((w) =>
    isSearchTermFound({ text: w.title, keySearchTerm: searchContent })
  );

  return (
    <div className="relative mt-0 pt-0">
      {/* Header */}
      <div className="sticky top-[8vh] z-40 bg-white w-full ">
        <WorkflowHeader
          headerText={folder.folderName}
          buttons={
            <SettingItemSearchBar
              className="max-w-72 bg-transparents"
              inputType="search"
              placeholder="Search for a workflow..."
              onTextChange={(val) => {
                setSearchContent(val);
              }}
              onSubmit={(val) => {
                setSearchContent(val);
              }}
              onCancel={() => {}}
            />
          }
        />
      </div>

      {/* Content */}
      <div className="flex relative">
        {/* Workflow List */}
        <div className="flex flex-1">
          <div className="flex flex-col w-full">
            {filteredWorkflowsList.length === 0 ? (
              <div className=" text-muted-foreground text-xs font-semibold flex justify-center items-center h-36">
                No workflow found.
              </div> // Display "Not found" if no matches are found
            ) : (
              filteredWorkflowsList.map((workflow) => {
                return (
                  <WorkflowCard
                    onClick={() => {
                      if (
                        workflowSelected &&
                        workflow.title === workflowSelected.title
                      ) {
                        setWorkflowSelected(undefined);
                      } else {
                        setWorkflowSelected(workflow);
                      }
                    }}
                    workflow={workflow}
                    isSelected={workflow.title === workflowSelected?.title}
                  />
                );
              })
            )}
          </div>
        </div>

        {/* Workflow details */}
        <div className="sticky top-[20vh] w-72 mr-0 h-fit">
          {workflowSelected ? (
            <div className="w-full border-l-[1px] border-l-muted ml-5 px-3 pt-2">
              <div className="flex flex-col gap-3">
                <h3 className="flex items-center font-semibold text-xl text-neutral-800 mb-1 mt-2">
                  {workflowSelected.title}
                </h3>
                <WorkflowDetailItem
                  key={workflowSelected.title}
                  icon={Text}
                  val={workflowSelected.description}
                  isLongText={true}
                />

                {workflowSelected.createdAt.getTime() !==
                  workflowSelected.updatedAt.getTime() && (
                  <WorkflowDetailItem
                    icon={Clock}
                    val={`Created ${getTimeAgoWithLimit(
                      workflowSelected.createdAt,
                      true
                    )}`}
                  />
                )}

                <WorkflowDetailItem
                  icon={UserPen}
                  val={`Updated ${getTimeAgoWithLimit(
                    workflowSelected.updatedAt,
                    true
                  )}`}
                />

                <Separator />

                <WorkflowDetailItem
                  icon={Coins}
                  val={`${formatNumber(workflowSelected.creditCost)} credits`}
                />
                <WorkflowDetailItem
                  icon={getTriggerModeIcon(workflowSelected.triggerMode)}
                  val={getTriggerModeText(workflowSelected.triggerMode)}
                />

                <WorkflowDetailItem
                  icon={getWorkflowStateIcon(workflowSelected.state)}
                  val={workflowSelected.state}
                />

                <WorkflowDetailItem
                  icon={workflowSelected.isPinned ? Pin : PinOff}
                  val={workflowSelected.isPinned ? "Pinned" : "Not pinned"}
                  cta={
                    <Badge
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="line-clamp-1 min-w-fit scale-90 -translate-x-2 -translate-y-[1.5px] bg-transparent hover:bg-primary/10 border border-gray-200 rounded-2xl text-gray-600 h-5 text-xs cursor-pointer py-0 px-2 ml-1 shadow-none"
                    >
                      {workflowSelected.isPinned ? "Unpin" : "Pin"}
                    </Badge>
                  }
                />

                <WorkflowDetailItem
                  icon={Folder}
                  val={workflowSelected.folder.folderName}
                  iconColor={workflowSelected.folder.folderColor}
                  cta={
                    <Badge
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="line-clamp-1 min-w-fit scale-90 -translate-x-2 -translate-y-[1.5px] bg-transparent hover:bg-primary/10 border border-gray-200 rounded-2xl text-gray-600 h-5 text-xs cursor-pointer py-0 px-2 ml-1 shadow-none"
                    >
                      Change folder
                    </Badge>
                  }
                />
                <Separator />

                <WorkflowDetailItem
                  icon={workflowSelected.isActive ? ToggleRight : ToggleLeft}
                  val={workflowSelected.isActive ? "Active" : "Disabled"}
                />

                <WorkflowDetailItem
                  icon={
                    workflowSelected.hasError ? ShieldCloseIcon : ShieldCheck
                  }
                  val={workflowSelected.hasError ? "2 errors" : "0 issues"}
                  textColor={
                    workflowSelected.hasError
                      ? "text-red-500"
                      : "text-green-500"
                  }
                />
              </div>
            </div>
          ) : (
            <div className=" text-muted-foreground text-xs font-semibold flex justify-center items-center h-36">
              No workflow selected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowList;

export const WorkflowDetailItem = ({
  icon,
  val,
  isLongText,
  textColor,
  cta,
  iconColor,
  overallClassname,
}: {
  icon: LucideIcon;
  val: React.ReactNode;
  isLongText?: boolean;
  textColor?: string;
  iconColor?: string;
  cta?: React.ReactNode;
  overallClassname?: string;
}) => {
  const Icon = icon;
  const [showMoreText, setShowMoreText] = useState<boolean>();
  const getLongText = () => {
    if (!val || typeof val !== "string") return;
    if (showMoreText) {
      return val?.toString();
    } else {
      return val?.slice(0, 40);
    }
  };
  return (
    <div
      className={cn(
        "flex items-start gap-2 group",
        isLongText === undefined && "h-4",
        overallClassname
      )}
    >
      <div>
        <Icon
          className={cn("size-4 flex")}
          stroke={iconColor ? iconColor : "#171717"}
        />
      </div>
      <div
        className={cn(
          "text-xs text-muted-foreground font-medium line-clamp-1",
          isLongText && "line-clamp-none font-normal",
          textColor && textColor
        )}
      >
        {isLongText ? getLongText() : val}{" "}
        {isLongText && (
          <button
            className="hover:opacity-70 transition-all duration-100 text-primary/80 font-medium ml-[0.5px]"
            onClick={() => setShowMoreText((prev) => !prev)}
          >
            {showMoreText ? "Show less" : "Show more"}
          </button>
        )}
      </div>
      {cta && <div className="hidden group-hover:flex">{cta}</div>}
    </div>
  );
};
