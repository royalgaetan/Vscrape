import DatePicker from "@/components/global/date_picker";
import { cn } from "@/lib/utils";
import { inputErrorClassName } from "@/lib/workflow_editor/constants/w_constants";
import { GetFilterValueInput } from "@/lib/workflow_editor/utils/get_criterias";
import { formatDate, isDate } from "date-fns";
import React, { useState } from "react";
import DnDTextInput from "./dnd_text_input";

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
      return isDate(initialValue) ? new Date(initialValue) : null;
    }
    return initialValue;
  })();

  const [currentValue, setCurrentValue] = useState(currentDate);

  switch (inputSchema) {
    case "undefined":
      return <></>;
    case "date":
      return (
        <DatePicker
          selectedDate={currentDate as Date}
          onSelect={(selectedDate) => {
            setCurrentValue(selectedDate ?? "");
            onSave(selectedDate);
          }}
        >
          <DnDTextInput
            placeholder={"Date..."}
            inputValue={
              currentValue
                ? formatDate(new Date(currentValue), "MMM dd, yyyy")
                : ""
            }
            inputType={"text"}
            isDisabled={isDisabled}
            readOnly={true}
            hasError={hasError}
            className={
              "cursor-pointer !text-xs flex-1 w-full !h-[var(--input-height)] rounded-sm placeholder:font-semibold placeholder:text-muted-foreground/70"
            }
          />
        </DatePicker>
      );

    default:
      return (
        <DnDTextInput
          placeholder={"Value..."}
          inputType={"text"}
          inputValue={currentValue ? currentValue.toString() : ""}
          isDisabled={isDisabled}
          className={"!text-xs flex-1 w-full !h-[var(--input-height)]"}
          hasError={hasError}
          onTextChange={(text) => {
            setCurrentValue(text);
          }}
          onBlur={() => {
            onSave(currentValue as number);
          }}
        />
      );
  }
};

export default FilterValueInput;
