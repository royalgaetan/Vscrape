import React, { useState } from "react";
import DnDTextInput from "./dnd_text_input";
import { cn } from "@/lib/utils";
import { Clock, X } from "lucide-react";
import DurationPicker from "@/components/global/duration_picker";
import { Button } from "@/components/ui/button";
import { formatDurationMs } from "@/lib/date_time_utils";
import { toStringSafe } from "@/lib/string_utils";

const DurationInput = ({
  initialValue,
  onSave,
  isDisabled,
  hasError,
}: {
  initialValue: any;
  onSave: (val: any) => void;
  isDisabled: boolean;
  hasError: boolean;
}) => {
  const [openDurationPicker, setOpenDurationPicker] = useState(false);

  return (
    <div className="!h-[var(--input-height)] relative group/durationInput">
      <DnDTextInput
        onClick={() => {
          if (typeof initialValue === "number" && initialValue > 0)
            setOpenDurationPicker(true);
        }}
        placeholder={"00:00:00"}
        inputValue={
          typeof initialValue === "number"
            ? formatDurationMs(initialValue, ["hours", "minutes", "seconds"])
            : toStringSafe(initialValue)
        }
        reRenderOnInputValueChange={true}
        replaceContentOnDrop={true}
        inputType={"text"}
        isDisabled={isDisabled}
        onElementDropped={(text) => {
          onSave(text);
        }}
        readOnly={true}
        hasError={hasError}
        className={
          "cursor-pointer relative !text-xs flex-1 w-full !h-[var(--input-height)] rounded-sm placeholder:font-semibold placeholder:text-muted-foreground/70"
        }
      />
      {/* Clear Date Button */}
      {typeof initialValue !== "undefined" && initialValue !== null ? (
        <button
          className={cn(
            "group-hover/durationInput:inline hidden group/clearDurationBtn absolute top-[2px] right-2 !h-[1.5rem] !px-[0.3rem] !w-5 transition-all duration-300 justify-center items-center rounded-l-none bg-gradient-to-l from-white from-30% to-transparent cursor-pointer"
          )}
          onClick={() => {
            onSave(null);
          }}
        >
          <X className="size-4 stroke-neutral-600 group-hover/clearDurationBtn:opacity-80 group-active/clearDurationBtn:scale-[0.97]" />
        </button>
      ) : (
        <></>
      )}

      {/* Date Picker Button */}
      <DurationPicker
        setOpen={openDurationPicker}
        initialDurationMs={initialValue}
        onSelect={(selectedDurationMs) => {
          setOpenDurationPicker(false);
          onSave(selectedDurationMs);
        }}
      >
        <Button
          className={cn(
            "absolute top-[2px] right-[2px] !h-[1.5rem] !px-[0.3rem] !w-[var(--input-height)] transition-all duration-300 justify-center items-center gap-2 hover:opacity-80 hover:bg-white bg-white cursor-pointer",
            typeof initialValue === "undefined" || initialValue === null
              ? "flex"
              : "hidden"
          )}
        >
          <Clock className="stroke-neutral-600" />
        </Button>
      </DurationPicker>
    </div>
  );
};

export default DurationInput;
