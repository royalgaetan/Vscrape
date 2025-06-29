"use client";
import React, { useState } from "react";
import WorkflowEditor from "./w_editor";
import { Button, cn, SidebarIcon } from "@vscrape/ui";
import { InfoIcon } from "lucide-react";
import { DroppedToolItem } from "@vscrape/engine/src";
import DebugButton from "../../../../components/buttons/debug_button";
import ViewButtons from "../../../../components/buttons/editor_view_buttons";
import ExecuteButton from "../../../../components/buttons/execute_button";
import RevertVersionButton from "../../../../components/buttons/revert_version_button";
import ToggleChatButton from "../../../../components/buttons/toggle_chat_button";
import UndoRedoButtons from "../../../../components/buttons/undo_redo_buttons";

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
          <div className="flex flex-1 justify-end items-center">
            <ViewButtons />
          </div>
        </div>
      )}
    </div>
  );
};

export default WorflowEditorWrapper;
