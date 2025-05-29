"use client";
import React, { useState } from "react";
import { SidebarIcon } from "@/components/global/app_sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BugPlayIcon,
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
import SimpleTooltip from "@/components/global/simple_tooltip";
import WorkflowEditor from "./w_editor";
import { DroppedToolItem } from "@/lib/workflow_editor/types/w_types";
import { useWorkflowEditorStore } from "@/stores/workflowStore";
import UndoRedoButtons from "@/components/workflow_editor/buttons/undo_redo_buttons";
import ToggleChatButton from "@/components/workflow_editor/buttons/toggle_chat_button";
import ViewButtons from "@/components/workflow_editor/buttons/editor_view_buttons";
import ExecuteButton from "@/components/workflow_editor/buttons/execute_button";
import DebugButton from "@/components/workflow_editor/buttons/debug_button";
import RevertVersionButton from "@/components/workflow_editor/buttons/revert_version_button";

const WorflowEditorWrapper = ({
  workflowId,
  isHistory,
}: {
  workflowId: string;
  isHistory?: boolean;
}) => {
  const [droppedElement, setDroppedElement] = useState<DroppedToolItem>();
  const [isEditorOnboardingDisplayed, setIsEditorOnboardingDisplayed] =
    useState(true);

  return (
    <div
      onDragOver={(e: React.DragEvent) => {
        if (isEditorOnboardingDisplayed) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
      onDrop={(e: React.DragEvent) => {
        if (isEditorOnboardingDisplayed) return;
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
      {/* Editor: Workflow Arena */}
      <WorkflowEditor
        editorOnboardingState={(isDisplay) =>
          setIsEditorOnboardingDisplayed(isDisplay)
        }
        elementDropped={droppedElement}
      />

      {/* Overlay: Action Buttons */}
      {!isEditorOnboardingDisplayed && (
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
            {isHistory && <RevertVersionButton />}

            {isHistory === undefined && <ToggleChatButton />}

            {isHistory === undefined && <DebugButton />}

            {isHistory === undefined && <UndoRedoButtons />}

            {isHistory === undefined && <ExecuteButton />}
          </div>

          {/* View Buttons */}
          <div className="flex flex-1 justify-end pointer-events-auto items-center">
            <ViewButtons />
          </div>
        </div>
      )}
    </div>
  );
};

export default WorflowEditorWrapper;
