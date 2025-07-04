import React from "react";
import {
  generateHexRandomString,
  cn,
  isRecord,
  humanize,
  toStringSafe,
} from "@vscrape/ui";
import {
  OutputDataType,
  SharedOutputSelectedItem,
  describeMIME,
} from "@vscrape/engine/src";

const SharedOutputsViewer = ({
  prevElements,
  onObjectSelected,
}: {
  prevElements?: OutputDataType;
  onObjectSelected: (elementSelected: SharedOutputSelectedItem) => void;
}) => {
  return (
    <div className="flex flex-col w-full h-[65vh] p-4 bg-neutral-100 border border-border rounded-sm overflow-y-auto scrollbar-hide">
      {!prevElements ? (
        <div className="flex flex-1 items-center justify-center text-neutral-500 font-semibold !text-xs h-24">
          Nothing to pick.
        </div>
      ) : (
        <ObjectChildren
          level={0}
          path=""
          obj={prevElements}
          onObjectSelected={(elementSelected) => {
            onObjectSelected(elementSelected);
          }}
        />
      )}
    </div>
  );
};

export default SharedOutputsViewer;

const ObjectChildren = ({
  obj,
  onObjectSelected,
  level = 0,
  path,
}: {
  level: number;
  path: string;
  obj: Record<string, any>;
  onObjectSelected: (elementSelected: SharedOutputSelectedItem) => void;
}) => {
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
