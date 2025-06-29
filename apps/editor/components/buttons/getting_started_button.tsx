import { useState } from "react";
import { workflowEditorNodes, DroppedToolItem } from "@vscrape/engine/src";
import { cn } from "@vscrape/ui";

const EditorGettingStartedButton = ({
  onEntryPointSelected,
}: {
  onEntryPointSelected: (droppedItem: DroppedToolItem | undefined) => void;
}) => {
  const [displayEntryNodes, setDisplayEntryNodes] = useState<boolean>(false);
  return (
    <div
      className={cn(
        "flex flex-1 w-full h-full justify-center items-center transition-all duration-300",
        displayEntryNodes ? "bg-neutral-900/70" : "bg-transparent"
      )}
    >
      {/* Get Started Button: Circle Rounded */}
      {!displayEntryNodes && (
        <button
          onClick={() => {
            setDisplayEntryNodes(true);
          }}
          className={cn(
            "relative flex justify-center items-center transition-all active:scale-[0.97]"
          )}
        >
          <div
            className={cn(
              "w-32 h-7 ring-4 absolute z-[8] ring-primary/70 transition-all duration-1000 rounded-full",
              displayEntryNodes ? "animate-none" : "animate-pulse"
            )}
          ></div>

          <div className="w-32 h-7 px-7 py-2 absolute z-[9] bg-primary flex justify-center items-center rounded-full">
            <span className="w-full text-white text-center font-medium text-xs scale-[0.9] transition-all duration-0">
              Click to Start
            </span>
          </div>
        </button>
      )}

      {/* Entry Nodes Selection */}
      {displayEntryNodes && (
        <div className="flex flex-col">
          {/* Entry Nodes */}
          <div className="flex flex-1 justify-center items-center text-sm font-normal text-white/70 mb-8">
            Select an entry point
          </div>
          <div className="flex gap-8">
            {workflowEditorNodes
              .filter((node) => node.sectionName === "Entry Point")
              .map((node) => {
                const Icon = node.icon;
                return (
                  <button
                    onClick={() =>
                      onEntryPointSelected({
                        label: node.label,
                        position: "center",
                      })
                    }
                    key={node.label}
                    disabled={node.label === "Chat Bot"}
                    className={cn(
                      "min-w-24 px-3 h-[2.5rem] flex gap-1 justify-center items-center border-none ring-4 ring-transparent rounded-full transition-all duration-300 text-center text-xs font-semibold",
                      node.label !== "Chat Bot"
                        ? "bg-white/90 text-neutral-500  hover:ring-neutral-500 active:scale-[0.94]"
                        : "bg-neutral-500 text-neutral-400"
                    )}
                  >
                    {Icon && <Icon className="size-4 stroke-neutral-600" />}
                    {node.label}
                  </button>
                );
              })}
          </div>
          {/* Skip Button */}
          {/* <div className="flex justify-center items-center mt-4">
            <Button
              onClick={() => onEntryPointSelected(undefined)}
              variant={"link"}
              className="no-underline hover:no-underline text-white/70 hover:opacity-70 font-medium"
            >
              Skip
            </Button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default EditorGettingStartedButton;
