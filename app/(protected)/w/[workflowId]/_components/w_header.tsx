"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { delay } from "@/lib/numbers_utils";
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronLeft,
  Loader2,
  LucideBugPlay,
  LucideCloudUpload,
  LucideIcon,
  Save,
} from "lucide-react";
import {
  redirect,
  RedirectType,
  useParams,
  usePathname,
} from "next/navigation";
import React, { useEffect, useState } from "react";

export type WMode = "Editor" | "Runs";
export const wTabs: WMode[] = ["Editor", "Runs"];

export const getWMode = (pathname: string): WMode | undefined => {
  if (!pathname.startsWith("/w/")) return undefined;
  const pathnameArr = pathname.split("/");
  const pathnameLast = pathnameArr[pathnameArr.length - 1];
  const pathnameBeforeLast = pathnameArr[pathnameArr.length - 2];

  if (pathnameLast === "editor") {
    return "Editor";
  } else if (pathnameLast === "runs" || pathnameBeforeLast === "runs") {
    return "Runs";
  } else {
    return undefined;
  }
};

const WHeader = () => {
  const { workflowId } = useParams();
  const pathname = usePathname();
  const [selectedTab, setSelectedTab] = useState<WMode | undefined>(undefined);
  const [isSaving, setIsSaving] = useState(false);
  const [SavingResultIcon, setSavingResultIcon] = useState<
    LucideIcon | undefined
  >(undefined);

  useEffect(() => {
    if (pathname) {
      setSelectedTab(getWMode(pathname));
    }
  }, [pathname]);

  const saveWorkflow = async () => {
    setSavingResultIcon(undefined);
    setIsSaving(true);
    await delay(3000);
    setIsSaving(false);
    setSavingResultIcon(Check);
    await delay(1500);
    setSavingResultIcon(undefined);
  };

  return (
    <div className="w-full h-[7vh] flex items-center px-3 border-b overflow-clip bg-neutral-100">
      <Tabs
        value={selectedTab}
        className="flex flex-1 justify-between items-center"
      >
        {/* Back Buttons + Workflow Info Details */}
        <div className="max-w-[30%] h-10 flex flex-1 justify-start items-center">
          {/* Back Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button
                  onClick={() => {
                    redirect("/workflows", RedirectType.replace);
                  }}
                  className="group/backButton w-5 pt-2  transition-all duration-200"
                >
                  <ChevronLeft className="group-hover/backButton:opacity-50 active:scale-[0.95] stroke-[1.9px] stroke-neutral-800" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-neutral-700/95 ml-2 text-white text-xs w-fix px-2 py-1">
                <p>Back to Workflows</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Workflow Details */}
          <div className="flex flex-col  items-start justify-start ml-1 min-w-min max-w-[15vw] hover:bg-neutral-200/40 cursor-pointer pl-2 pr-6 rounded-[4px]">
            {/* Mode */}
            <div className="text-sm font-semibold text-neutral-700 line-clamp-1 w-full">
              Workflow {getWMode(pathname)}
            </div>

            {/* Workflow Name */}
            <p className="text-xs line-clamp-1 font-normal text-neutral-400">
              {"Daily Sales Report"}
            </p>
          </div>
        </div>

        {/* Mode Switcher: Editor | Runs */}
        {!selectedTab ? (
          <>
            <Loader2 className="animate-spin text-neutral-500" />
          </>
        ) : (
          <TabsList className="w-[30%] flex justify-center items-center bg-transparent">
            <div className="w-fit space-x-1 bg-white px-2 rounded-full ">
              {wTabs.map((mode) => {
                return (
                  <TabsTrigger
                    className={cn(
                      "w-[8vw] data-[state=active]:bg-primary/70 data-[state=active]:text-white my-1 text-xs"
                    )}
                    onClick={() => {
                      redirect(`/w/${workflowId}/${mode.toLocaleLowerCase()}`);
                    }}
                    key={mode}
                    value={mode}
                  >
                    {mode}
                  </TabsTrigger>
                );
              })}
            </div>
          </TabsList>
        )}

        <div className="w-[30%] flex justify-end items-center">
          {/* Action Buttons: if "Workflow Editor" */}
          {selectedTab === "Editor" && (
            <div className="flex gap-1">
              <Button
                variant={"outline"}
                disabled={isSaving}
                className="rounded-2xl h-7 text-xs gap-1 px-3 duration-150"
                onClick={() => saveWorkflow()}
              >
                {isSaving && SavingResultIcon === undefined && (
                  <Loader2 className="animate-spin stroke-neutral-700" />
                )}
                {SavingResultIcon && !isSaving && (
                  <SavingResultIcon className="stroke-neutral-700" />
                )}

                {!isSaving && SavingResultIcon === undefined && (
                  <Save className="stroke-neutral-700" />
                )}
                <span className="">Save</span>
              </Button>

              <Button
                variant={"default"}
                className="rounded-2xl h-7 text-xs gap-1 px-3"
              >
                <LucideCloudUpload className="stroke-white" />
                <span className="">Publish</span>
              </Button>
            </div>
          )}

          {/* Action Buttons: if "Workflow Runs" */}
          {selectedTab === "Runs" && (
            <div className="flex gap-1">
              <Button
                variant={"default"}
                className="text-white rounded-2xl h-7 text-xs gap-1 px-3"
              >
                <LucideBugPlay className="stroke-white" />
                <span className="">Run New Test</span>
              </Button>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default WHeader;
