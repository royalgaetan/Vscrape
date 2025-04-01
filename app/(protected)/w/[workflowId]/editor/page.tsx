"use client";
import { SidebarIcon } from "@/components/global/app_sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BugPlayIcon,
  DraftingCompass,
  InfoIcon,
  LockKeyholeOpenIcon,
  LucideIcon,
  Maximize,
  Minus,
  Play,
  Plus,
  Redo2,
  Undo2,
} from "lucide-react";
import React from "react";

const WorkflowEditor = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full relative">
      <div className="flex flex-col justify-center items-center z-[20] relative group/workflowEditorArena">
        <DraftingCompass className="size-12 stroke-primary mb-2 stroke-[2px]" />
        <span className="text-neutral-800 text-3xl font-semibold">
          Workflow Editor
        </span>
      </div>

      {/* Workflow Editor Action Buttons */}
      <div className="flex flex-1 items-end w-full absolute z-[21] bottom-0 px-3 pb-3">
        {/* Info Button */}
        <div className="flex justify-start items-center w-1/3">
          <Button
            variant={"ghost"}
            className={cn(
              "flex w-8 transition-all -ml-2 -mb-2 duration-300 h-8 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer rounded-sm"
            )}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {/* Icon */}
            <SidebarIcon
              defaultIcon={InfoIcon}
              isExpandable={false}
              type="icon"
              isSelected={undefined}
            />
          </Button>
        </div>

        {/* Execution Buttons */}
        <div className="flex flex-1 gap-2 justify-center items-center w-1/3">
          <Button
            variant={"default"}
            className="!bg-yellow-500 hover:!bg-yellow-500/70 rounded-2xl h-7 text-xs gap-1 px-3 "
          >
            <BugPlayIcon className="stroke-white" />
          </Button>

          <UndoRedoButtons />

          <Button
            variant={"default"}
            className="rounded-2xl h-7 text-xs gap-1 px-3 active:scale-[0.97]"
          >
            <Play className="stroke-white" />
            <span className="">Execute</span>
          </Button>
        </div>

        {/* View Buttons */}
        <div className="flex flex-1 justify-end items-center">
          <ViewButtons />
        </div>
      </div>
    </div>
  );
};

export default WorkflowEditor;

export const ViewButtons = () => {
  const viewIcons: { icon: LucideIcon; name: string }[] = [
    {
      icon: Plus,
      name: "Zoom in",
    },
    {
      icon: Minus,
      name: "Zoom out",
    },
    {
      icon: Maximize,
      name: "Fit",
    },
    {
      icon: LockKeyholeOpenIcon,
      name: "Lock",
    },
  ];

  return (
    <div className="rounded-2xl border divide-y-2 overflow-clip flex flex-col w-7 h-min bg-white">
      {viewIcons.map((el) => {
        const Icon = el.icon;
        return (
          <button
            key={el.name}
            className="h-7 flex justify-center group/viewBtn items-center bg-transparent hover:bg-neutral-200 cursor-pointer"
          >
            <Icon className="size-4 stroke-neutral-700 group-active/viewBtn:scale-[0.80] transition-all duration-200" />
          </button>
        );
      })}
    </div>
  );
};

export const UndoRedoButtons = () => {
  const doButtons: { icon: LucideIcon; name: string }[] = [
    {
      icon: Undo2,
      name: "Undo",
    },
    {
      icon: Redo2,
      name: "Redo",
    },
  ];

  return (
    <div className="rounded-2xl border divide-x-2 overflow-clip flex h-7 w-min bg-white">
      {doButtons.map((el) => {
        const Icon = el.icon;
        return (
          <button
            key={el.name}
            className="w-10 flex justify-center group/viewBtn items-center bg-transparent hover:bg-neutral-200 cursor-pointer"
          >
            <Icon className="size-4 stroke-neutral-700 group-active/viewBtn:scale-[0.80] transition-all duration-200" />
          </button>
        );
      })}
    </div>
  );
};
