import { SidebarIcon } from "@/components/global/app_sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import DnDTextInput from "./dnd_text_input";
import { RecordArray } from "@/lib/workflow_editor/types/w_types";
import { generateHexRandomString } from "@/lib/numbers_utils";

const ArrayInput = ({
  initialArray,
  onChange,
  hasError,
}: {
  initialArray: RecordArray;
  onChange?: (newArray: any[]) => void;
  hasError?: boolean;
}) => {
  const [localArray, setLocalArray] = useState<any[]>(initialArray);

  return (
    <div
      className={cn(
        "flex flex-col",
        hasError &&
          "border-destructive/70 rounded-sm ring-2 ring-offset-2 ring-destructive/60 transition-all duration-300"
      )}
      role="button"
      tabIndex={1}
      // onBlur={() => onChange && onChange(localArray)}
    >
      {localArray.map((arrItem, idx) => {
        const isLast = localArray.length === idx + 1;
        return (
          <div
            key={generateHexRandomString()}
            className="flex flex-1 gap-2 group/arrayItem h-7 mt-1 mb-2 [--dndInputWidth:13rem]"
          >
            <DnDTextInput
              key={"value"}
              placeholder={"Value..."}
              inputType="text"
              className="min-w-[var(--dndInputWidth)] max-w-[var(--dndInputWidth)] mb-0"
              inputValue={arrItem}
              // onBlur={(text) => {
              //   if (!text) return;
              // }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();

                  let updatedArr = [...localArray];
                  onChange && onChange(updatedArr);
                }
              }}
              onElementDropped={(text) => {
                if (!text) return;
                localArray[idx] = text;
              }}
              onTextChange={(text) => {
                if (!text) return;
                localArray[idx] = text;
              }}
            />
            <div className="w-8 h-[1.73rem]">
              <Button
                variant={"ghost"}
                className={cn(
                  "hidden group-hover/arrayItem:flex w-8 transition-all duration-300 h-[1.73rem] justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  let updatedArr = [...localArray];
                  if (isLast) {
                    updatedArr = [...updatedArr, ""];
                  } else {
                    updatedArr = updatedArr.filter((p, index) => index !== idx);
                  }
                  setLocalArray(updatedArr);
                  onChange && onChange(updatedArr);
                }}
              >
                {/* Icon */}
                <SidebarIcon
                  defaultIcon={isLast ? Plus : Trash2}
                  isExpandable={false}
                  type="icon"
                  isSelected={undefined}
                />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArrayInput;
