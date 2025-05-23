import DatePicker from "@/components/global/date_picker";
import { GetFilterValueInput } from "@/lib/workflow_editor/utils/get_criterias";
import { formatDate, isDate } from "date-fns";
import React, { useEffect, useState } from "react";
import DnDTextInput from "./dnd_text_input";
import {
  isPureVariableOnly,
  isTrulyEmpty,
  toStringSafe,
} from "@/lib/string_utils";
import { isValidDateString, isValidISODateString } from "@/lib/date_time_utils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarDaysIcon, X } from "lucide-react";

const FilterValueInput = ({
  initialValue,
  inputSchema,
  onSave,
  isDisabled,
  hasError,
}: {
  isDisabled: boolean;
  hasError: boolean;
  initialValue: any;
  onSave: (inputValue: any) => void;
  inputSchema: GetFilterValueInput;
}) => {
  const currentDate = (() => {
    if (inputSchema === "date") {
      if (isPureVariableOnly(toStringSafe(initialValue))) return initialValue;
      if (isDate(initialValue)) return new Date(initialValue);
      else return initialValue;
    }
    return initialValue;
  })();

  const [currentValue, setCurrentValue] = useState(currentDate);

  switch (inputSchema) {
    case "undefined":
      return <></>;
    case "date":
      return (
        <div className="!h-[var(--input-height)] relative group/dateInput">
          <DnDTextInput
            placeholder={"Date..."}
            inputValue={
              isValidISODateString(currentValue)
                ? formatDate(new Date(currentValue), "MMM dd, yyyy")
                : currentValue
            }
            reRenderOnInputValueChange={true}
            replaceContentOnDrop={true}
            inputType={"text"}
            isDisabled={isDisabled}
            onElementDropped={(text) => {
              setCurrentValue(text);
              onSave(text);
            }}
            readOnly={true}
            onTextChange={(text) => {
              setCurrentValue(text);
              onSave(text);
            }}
            hasError={hasError}
            className={
              "cursor-pointer relative !text-xs flex-1 w-full !h-[var(--input-height)] rounded-sm placeholder:font-semibold placeholder:text-muted-foreground/70"
            }
          />
          {/* Clear Date Button */}
          {!isTrulyEmpty(toStringSafe(currentValue)) && !isDisabled && (
            <button
              className={cn(
                "group-hover/dateInput:inline hidden group/clearDateButton absolute top-[2px] right-2 !px-[0.6rem] !w-5 !h-[calc(var(--input-height)-4px)] transition-all duration-300 justify-center items-center rounded-l-none bg-gradient-to-l from-white from-30% to-transparent cursor-pointer trans"
              )}
              onClick={() => {
                setCurrentValue(null);
                onSave(null);
              }}
            >
              <X className="size-4 stroke-neutral-600 group-hover/clearDateButton:opacity-80 group-active/clearDateButton:scale-[0.97]" />
            </button>
          )}

          {/* Date Picker Button */}
          <DatePicker
            selectedDate={currentValue as Date}
            onSelect={(selectedDate) => {
              setCurrentValue(selectedDate ?? "");
              onSave(selectedDate);
            }}
          >
            <Button
              className={cn(
                "absolute top-[2px] right-[1px] hidden !h-[calc(var(--input-height)-4px)] !px-[0.6rem] !w-[var(--input-height)] transition-all duration-300 justify-center items-center gap-2 hover:opacity-80 hover:bg-white bg-white cursor-pointer",
                isTrulyEmpty(toStringSafe(currentValue)) && !isDisabled
                  ? "flex"
                  : ""
              )}
            >
              <CalendarDaysIcon className="stroke-neutral-600" />
            </Button>
          </DatePicker>
        </div>
      );

    default:
      return (
        <DnDTextInput
          placeholder={"Value..."}
          inputType={"text"}
          inputValue={
            typeof currentValue === "number"
              ? currentValue
              : toStringSafe(currentValue)
          }
          isDisabled={isDisabled}
          className={"!text-xs flex-1 w-full !h-[var(--input-height)]"}
          hasError={hasError}
          onElementDropped={(text) => {
            setCurrentValue(text);
            onSave(text);
          }}
          onTextChange={(text) => {
            setCurrentValue(text);
            onSave(text);
          }}
          // onBlur={() => {
          //   onSave(currentValue);
          // }}
        />
      );
  }
};

export default FilterValueInput;
