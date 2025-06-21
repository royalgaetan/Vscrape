import { GetFilterValueInput } from "@/lib/workflow_editor/utils/get_criterias";
import { formatDate, isDate } from "date-fns";
import React, { useState } from "react";
import DnDTextInput from "./dnd_text_input";
import { isPureVariableOnly, toStringSafe } from "@/lib/string_utils";
import { isValidISODateString } from "@/lib/date_time_utils";
import DateInput from "./date_input";

const FilterValueInput = ({
  initialValue,
  inputSchema,
  onSave,
  isDisabled,
  hasError,

  nodeId,
  itemId,
}: {
  isDisabled: boolean;
  hasError: boolean;
  initialValue: any;
  onSave: (inputValue: any) => void;
  inputSchema: GetFilterValueInput;

  nodeId?: string;
  itemId?: string;
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
        <DateInput
          hasError={hasError}
          initialValue={
            currentValue !== undefined && isValidISODateString(currentValue)
              ? formatDate(new Date(currentValue), "MMM dd, yyyy")
              : ""
          }
          nodeId={nodeId}
          itemId={itemId}
          placeholder={"Date..."}
          isDisabled={isDisabled}
          onSave={(selectedDate) => {
            setCurrentValue(selectedDate ?? "");
            onSave(selectedDate);
          }}
        />
      );

    default:
      return (
        <DnDTextInput
          placeholder={"Value..."}
          inputType={"text"}
          nodeId={nodeId}
          itemId={itemId}
          inputValue={
            typeof currentValue === "number"
              ? currentValue
              : toStringSafe(currentValue)
          }
          isDisabled={isDisabled}
          className={"!text-xs !h-[var(--input-height)]"}
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
