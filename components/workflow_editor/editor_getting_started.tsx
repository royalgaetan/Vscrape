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
          "relative flex justify-center items-center transition-all active:scale-[0.95]"
        )}
      >
        <div
          className={cn(
            "w-[4.5rem] h-[4.5rem] ring-8 absolute z-[8] ring-neutral-400 aspect-square rounded-full",
            displayEntryNodes ? "animate-none" : "animate-pulse"
          )}
        ></div>

        <div className="w-[4.5rem] h-[4.5rem] aspect-square absolute z-[9] bg-neutral-600 flex justify-center items-center rounded-full">
          {displayEntryNodes ? (
            <X className="stroke-white/80 !size-6" />
          ) : (
            <span className="text-white/80 text-center font-medium text-xs scale-[0.75] transition-all duration-0">
              Start here
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
