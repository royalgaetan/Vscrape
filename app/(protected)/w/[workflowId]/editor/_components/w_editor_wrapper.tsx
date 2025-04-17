"use client";
import React, { useState } from "react";
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
  MessageCircleMoreIcon,
  Minus,
  Play,
  Plus,
  Redo2,
  Undo2,
  UndoDotIcon,
} from "lucide-react";
import { useWorkflowEditor } from "@/hooks/useWorkflowEditor";
import SimpleTooltip from "@/components/global/simple_tooltip";
import WorkflowEditor from "./w_editor";
import { DroppedToolItem } from "@/lib/workflow_editor/types/w_types";

const WorflowEditorWrapper = ({
  workflowId,
  isHistory,
}: {
  workflowId: string;
  isHistory?: boolean;
}) => {
  const { isWChatOpen, setWChatOpen } = useWorkflowEditor();
  const [droppedElement, setDroppedElement] = useState<DroppedToolItem>();

  return (
    <div
      onDragOver={(e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
      onDrop={(e: React.DragEvent) => {
        e.preventDefault();
        setDroppedElement({
          label: e.dataTransfer.getData("application/workflowEditor"),
          position: {
            x: e.clientX,
            y: e.clientY,
          },
        });
      }}
      role="button"
      tabIndex={2}
      className="cursor-default flex flex-col justify-center items-center h-full w-full relative"
    >
      {/* Workflow Editor Arena */}
      <WorkflowEditor elementDropped={droppedElement} />

      {/* Workflow Editor Action Buttons */}
      <div className="flex flex-1 items-end w-full absolute z-[21] pointer-events-none bottom-0 px-3 pb-3">
        {/* Info Button */}
        <div className="flex justify-start items-center w-1/3">
          <Button
            variant={"ghost"}
            className={cn(
              "flex w-8 transition-all -ml-2 pointer-events-auto -mb-2 duration-300 h-8 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer rounded-sm"
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
        <div className="flex flex-1 gap-2 pointer-events-auto justify-center items-center w-1/3">
          {isHistory && (
            <Button
              variant={"default"}
              className="rounded-2xl h-7 text-xs gap-1 px-3 active:scale-[0.97]"
            >
              <UndoDotIcon className="stroke-white" />
              <span className="">Revert this version</span>
            </Button>
          )}

          {isHistory === undefined && (
            <SimpleTooltip
              tooltipText={isWChatOpen ? "Close Chat" : "Open Chat"}
            >
              <Button
                onClick={() => setWChatOpen(!isWChatOpen)}
                variant={"secondary"}
                className={cn(
                  "duration-0 rounded-2xl h-7 text-xs gap-1 px-3",
                  isWChatOpen &&
                    "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                <MessageCircleMoreIcon
                  className={cn(
                    "stroke-neutral-800",
                    isWChatOpen && "stroke-white"
                  )}
                />
              </Button>
            </SimpleTooltip>
          )}

          {isHistory === undefined && (
            <Button
              variant={"default"}
              className="!bg-yellow-500 hover:!bg-yellow-500/70 rounded-2xl h-7 text-xs gap-1 px-3 "
            >
              <BugPlayIcon className="stroke-white" />
            </Button>
          )}

          {isHistory === undefined && <UndoRedoButtons />}

          {isHistory === undefined && (
            <Button
              variant={"default"}
              className="rounded-2xl h-7 text-xs gap-1 px-3 active:scale-[0.97]"
            >
              <Play className="stroke-white" />
              <span className="">Execute</span>
            </Button>
          )}
        </div>

        {/* View Buttons */}
        <div className="flex flex-1 justify-end pointer-events-auto items-center">
          <ViewButtons />
        </div>
      </div>
    </div>
  );
};

export default WorflowEditorWrapper;

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
