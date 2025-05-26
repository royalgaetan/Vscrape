import { cn } from "@/lib/utils";
import { DroppedToolItem } from "@/lib/workflow_editor/types/w_types";
import { X } from "lucide-react";
import React, { useState } from "react";

const EditorGettingStartedButton = ({
  onEntryPointSelected,
}: {
  onEntryPointSelected: (droppedItem: DroppedToolItem) => void;
}) => {
  const [displayEntryNodes, setDisplayEntryNodes] = useState<boolean>(false);
  return (
    <div
      className={cn(
        "flex flex-1 w-full h-full justify-center items-center transition-all duration-300",
        displayEntryNodes ? "bg-neutral-800/30" : "bg-neutral-800/10"
      )}
    >
      {/* Get Started Button: Circle Rounded */}
      <button
        onClick={() => {
          setDisplayEntryNodes((prev) => !prev);
        }}
        className={cn(
          "relative flex justify-center items-center transition-all active:scale-[0.97]"
        )}
      >
        <div
          className={cn(
            "w-fit h-fit ring-8 absolute z-[8] ring-neutral-400 rounded-full",
            displayEntryNodes ? "animate-none" : "animate-pulse"
          )}
        ></div>

        <div className="w-32 h-8 px-7 py-2 absolute z-[9] bg-neutral-600 flex justify-center items-center rounded-full">
          {displayEntryNodes ? (
            <X className="stroke-white/80 size-4" />
          ) : (
            <span className="w-full text-white/80 text-center font-medium text-xs scale-[0.75] transition-all duration-0">
              Click to Start
            </span>
          )}
        </div>
      </button>

      {/* Surrounding bubbles */}
      {/* <div className="relative z-10">
        {[
          { top: "-10%", left: "50%", translate: "-translate-x-1/2" }, // Top
          { top: "50%", left: "-10%", translate: "-translate-y-1/2" }, // Left
          { top: "50%", left: "110%", translate: "-translate-y-1/2" }, // Right
          { top: "110%", left: "50%", translate: "-translate-x-1/2" }, // Bottom
          { top: "0", left: "0", translate: "" }, // Diagonal (top-left)
        ].map((pos, idx) => (
          <div
            key={idx}
            className={`w-6 h-6 bg-red-400 rounded-full absolute`}
            style={{ top: pos.top, left: pos.left }}
          />
        ))}
      </div> */}
    </div>
  );
};

export default EditorGettingStartedButton;
