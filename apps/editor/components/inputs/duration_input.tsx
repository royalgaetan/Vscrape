import React, { useState } from "react";
import DnDTextInput from "./dnd_text_input";
import {
  cn,
  DurationPicker,
  Button,
  formatDurationMs,
  isTrulyEmpty,
  toStringSafe,
} from "@vscrape/ui";
import { Clock, X } from "lucide-react";

const DurationInput = ({
  initialValue,
  onSave,
  isDisabled,
  hasError,
  disabledDnd,
  isTimePicker,
  placeholder,
  className,

  nodeId,
  itemId,
}: {
  initialValue: any;
  onSave: (val: any) => void;
  isDisabled: boolean;
  disabledDnd?: boolean;
  isTimePicker?: boolean;
  hasError?: boolean;
  placeholder?: string;
  className?: string;

  nodeId?: string;
  itemId?: string;
}) => {
  const [openDurationPicker, setOpenDurationPicker] = useState(false);

  return (
    <div
      className={cn(
        "relative group/durationInput min-w-20 !h-[1.75rem] bg-white",
        className
      )}
    >
      <DnDTextInput
        onClick={() => {
          disabledDnd && setOpenDurationPicker(true);
        }}
        placeholder={placeholder ?? `${isTimePicker ? "00:00" : "00:00:00"}`}
        inputValue={
          typeof initialValue === "number"
            ? formatDurationMs(
                initialValue,
                isTimePicker
                  ? ["minutes", "seconds"]
                  : ["hours", "minutes", "seconds"]
              )
            : toStringSafe(initialValue)
        }
        reRenderOnInputValueChange={true}
        replaceContentOnDrop={true}
        inputType={"text"}
        isDisabled={isDisabled}
        disableDnD={disabledDnd}
        onElementDropped={(text) => {
          onSave(text);
        }}
        readOnly={true}
        hasError={hasError}
        nodeId={nodeId}
        itemId={itemId}
        className={
          "cursor-pointer relative !text-xs flex-1 w-full rounded-sm placeholder:font-semibold placeholder:text-muted-foreground/70"
        }
      />
      {/* Clear Date Button */}

      {!isTrulyEmpty(toStringSafe(initialValue)) && !isDisabled && (
        <button
          className={cn(
            "visible group/clearDurationBtn absolute !w-[1.5rem] !h-[1.5rem] top-[2px] right-2 !px-[0.6rem] justify-center items-center rounded-l-none bg-gradient-to-l from-white from-30% to-transparent cursor-pointer transition-all duration-0",
            !isTrulyEmpty(toStringSafe(initialValue)) ? "visible" : "invisible"
          )}
          onClick={() => {
            onSave(undefined);
          }}
        >
          <X className="size-4 stroke-neutral-600 group-hover/clearDurationBtn:opacity-80 group-active/clearDurationBtn:scale-[0.97]" />
        </button>
      )}
      {/* Date Picker Button */}
      <DurationPicker
        isTimePicker={isTimePicker}
        setOpen={openDurationPicker}
        initialDurationMs={initialValue}
        onSelect={(selectedDurationMs) => {
          setOpenDurationPicker(false);
          onSave(selectedDurationMs);
        }}
      >
        <Button
          className={cn(
            "absolute top-[2px] right-[1px] !w-[1.5rem] !h-[1.5rem] !px-[0.6rem] transition-all duration-0 justify-center items-center gap-2 hover:opacity-80 hover:bg-white bg-white-300 cursor-pointer",
            isTrulyEmpty(toStringSafe(initialValue)) ? "visible" : "invisible"
          )}
        >
          <Clock className="stroke-neutral-600" />
        </Button>
      </DurationPicker>
    </div>
  );
};

export default DurationInput;
