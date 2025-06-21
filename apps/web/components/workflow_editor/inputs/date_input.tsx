import React from "react";
import { cn } from "@/lib/utils";
import { CalendarDaysIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isValidISODateString } from "@/lib/date_time_utils";
import { isTrulyEmpty, toStringSafe } from "@/lib/string_utils";
import { formatDate } from "date-fns";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/global/date_picker";
import DnDTextInput from "./dnd_text_input";

const DateInput = ({
  initialValue,
  placeholder,
  onSave,
  isDisabled,
  disabledDnd,
  hasError,

  nodeId,
  itemId,
}: {
  initialValue: any;
  onSave: (val: any) => void;
  isDisabled: boolean;
  placeholder?: string;
  hasError: boolean;
  disabledDnd?: boolean;

  nodeId?: string;
  itemId?: string;
}) => {
  return (
    <div className="!h-[var(--input-height)] flex flex-1 relative group/dateInput">
      <DnDTextInput
        readOnly={true}
        nodeId={nodeId}
        itemId={itemId}
        inputValue={
          isValidISODateString(initialValue)
            ? formatDate(new Date(initialValue), "MMM dd, yyyy")
            : initialValue
        }
        className={
          "cursor-pointer relative !text-xs flex-1 w-full rounded-sm placeholder:font-semibold placeholder:text-muted-foreground/70"
        }
        placeholder={placeholder ?? "Pick a date..."}
        disableDnD={disabledDnd}
        onElementDropped={(text) => {
          onSave(text);
        }}
        reRenderOnInputValueChange={true}
        replaceContentOnDrop={true}
        inputType={"text"}
        isDisabled={isDisabled}
        hasError={hasError}
      />

      {/* Clear Date Button */}
      {!isTrulyEmpty(toStringSafe(initialValue)) && !isDisabled && (
        <button
          className={cn(
            "visible group/clearDateButton absolute !w-[1.5rem] !h-[1.5rem] top-[2px] right-2 !px-[0.6rem] justify-center items-center rounded-l-none bg-gradient-to-l from-white from-30% to-transparent cursor-pointer transition-all duration-0",
            !isTrulyEmpty(toStringSafe(initialValue)) ? "visible" : "invisible"
          )}
          onClick={() => {
            onSave(null);
          }}
        >
          <X className="size-4 stroke-neutral-600 group-hover/clearDateButton:opacity-80 group-active/clearDateButton:scale-[0.97]" />
        </button>
      )}

      {/* Date Picker Button */}
      <DatePicker
        selectedDate={
          isValidISODateString(initialValue)
            ? new Date(initialValue)
            : (initialValue as Date)
        }
        onSelect={(selectedDate) => {
          onSave(selectedDate);
        }}
      >
        <Button
          className={cn(
            "absolute top-[2px] right-[3px] !w-[1.5rem] !h-[1.5rem] !px-[0.6rem] transition-all duration-0 justify-center items-center gap-2 hover:opacity-80 hover:bg-white bg-white-300 cursor-pointer",
            isTrulyEmpty(toStringSafe(initialValue)) ? "visible" : "invisible"
          )}
        >
          <CalendarDaysIcon className="stroke-neutral-600" />
        </Button>
      </DatePicker>
    </div>
  );
};

export default DateInput;
