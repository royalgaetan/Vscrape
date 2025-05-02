import { useWorkflowEditor } from "@/hooks/useWorkflowEditor";
import { generateHexRandomString } from "@/lib/numbers_utils";
import { humanize, toStringSafe } from "@/lib/string_utils";
import { cn, isRecord } from "@/lib/utils";
import { describeMIME } from "@/lib/workflow_editor/types/mime_types";
import { InputDataSelectedItem } from "@/lib/workflow_editor/types/w_types";
import React from "react";

const DataInputViewer = ({
  object,
  onObjectSelected,
  onKeyToggled,
}: {
  object: Record<string, any>;
  onObjectSelected: (elementSelected: InputDataSelectedItem) => void;
  onKeyToggled: (keyFullPath: string) => void;
}) => {
  return (
    <div className="flex flex-col w-full h-[65vh] p-4 bg-neutral-100 border border-border rounded-sm overflow-y-auto scrollbar-hide">
      <div>
        <ObjectChildren
          level={0}
          path=""
          obj={object}
          onObjectSelected={(elementSelected) => {
            onObjectSelected(elementSelected);
          }}
          // onKeyToggled={onKeyToggled}
        />
      </div>
    </div>
  );
};

export default DataInputViewer;

const ObjectChildren = ({
  obj,
  onObjectSelected,
  level = 0,
  path,
}: {
  level: number;
  path: string;
  obj: Record<string, any>;
  onObjectSelected: (elementSelected: InputDataSelectedItem) => void;
  // onKeyToggled: (keyFullPath: string) => void;
}) => {
  const { expandedInputDataKeys } = useWorkflowEditor();
  const marginLeftValue = "10px";

  if (!isRecord(obj)) return;

  return (
    <div style={{ marginLeft: `calc(${marginLeftValue}*${level})` }}>
      {Object.entries(obj).map(([key, values]) => {
        const fullKeyPath = `${path}.${key}`.replace(/^\./, "");
        const isAnElement = Object.keys(values).includes("type");
        return (
          <div className="flex flex-col" key={generateHexRandomString()}>
            {/* Header */}
            <div
              className={cn(
                "flex flex-1 gap-2 items-center group mb-2",
                isAnElement &&
                  "active:scale-[0.99] transition-all duration-100 -mt-1 w-fit"
              )}
            >
              <button
                className={cn(
                  "text-sm hover:opacity-70 transition-all duration-300 font-normal",
                  !isAnElement && "cursor-default hover:opacity-100 font-medium"
                )}
                onClick={() => {
                  if (!isAnElement) return;
                  onObjectSelected({
                    fullPath: fullKeyPath,
                    type: toStringSafe(values["type"]) as any,
                  });
                }}
              >
                {humanize(key)}
              </button>

              {isAnElement && isRecord(values) && (
                <div className="hidden group-hover:flex justify-center text-neutral-400 items-center border border-border rounded-2xl px-3 cursor-pointer h-4 text-xs hover:bg-border/10 bg-border/5">
                  {describeMIME(toStringSafe(values["type"]))}
                </div>
              )}
            </div>

            {/* Children: if not an element */}
            {!isAnElement && (
              <div className="flex flex-1">
                {/* Indicator */}
                <div className="flex flex-col ml-5">
                  <div
                    style={{ width: "1.4px" }}
                    className="h-[96%] rounded-full bg-border"
                  ></div>
                </div>

                {/* Elements */}
                <div className="flex flex-col w-full">
                  {isRecord(values) &&
                    Object.entries(values).map(([subKey, subValues]) => {
                      return (
                        <span key={generateHexRandomString()}>
                          <ObjectChildren
                            path={fullKeyPath}
                            obj={{ [subKey]: subValues }}
                            level={level + 1}
                            onObjectSelected={onObjectSelected}
                          />
                        </span>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
