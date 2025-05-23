import {
  vsAnyPrimitives,
  vsAnyRawTypes,
} from "@/lib/workflow_editor/types/data_types";
import React from "react";
import RecordInput from "./inputs/record_input";
import CustomSwitchInput from "./inputs/custom_switch_input";
import { OperationValuesToPickFromType } from "@/lib/workflow_editor/types/w_types";
import SimpleSwitchInput from "./inputs/simple_switch_input";
import DnDTextInput from "./inputs/dnd_text_input";
import { capitalizeFirstLetter, toStringSafe } from "@/lib/string_utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import ArrayInput from "./inputs/array_input";
import MultiSelect from "../global/multi_select";
import RadioInput from "./inputs/radio_input";
import DurationInput from "./inputs/duration_input";

const ParamInput = ({
  inputType,
  placeHolder,
  onChange,
  valuesToPickFrom,
  initialValue,
  isWithinAGroup,
  isTextarea,
}: {
  inputType: vsAnyPrimitives["type"] | vsAnyRawTypes["type"];
  placeHolder?: string;
  onChange: (value: any) => void;
  initialValue: any;
  valuesToPickFrom?: OperationValuesToPickFromType;
  isWithinAGroup: boolean;
  isTextarea?: boolean;
}) => {
  switch (inputType) {
    case "primitive/text":
      // Single Item Picker
      if (
        valuesToPickFrom &&
        valuesToPickFrom.length > 0 &&
        typeof initialValue === "string"
      ) {
        return (
          <Select onValueChange={onChange} value={initialValue}>
            <SelectTrigger
              className={cn(
                "h-[1.9rem] w-[15.7rem]",
                isWithinAGroup && "min-w-24 max-w-24"
              )}
            >
              <SelectValue className="text-xs" placeholder="Select..." />
            </SelectTrigger>

            <SelectContent className="max-h-64 w-[15.7rem]">
              {valuesToPickFrom.map((val) => {
                const choice = toStringSafe(val);
                return (
                  <SelectItem className="text-xs" key={choice} value={choice}>
                    {capitalizeFirstLetter(choice)}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        );
      }

      // Multi Item Picker
      else if (
        valuesToPickFrom &&
        valuesToPickFrom.length > 0 &&
        Array.isArray(initialValue)
      ) {
        return (
          <MultiSelect
            isTriggerDisabled={valuesToPickFrom.length === 0}
            triggerClassName="h-7 w-[15.7rem] flex flex-1 mb-1"
            popoverAlignment="center"
            selectionMode="single"
            popoverClassName="max-h-60 min-h-fit w-[15.7rem]"
            label={
              initialValue.length > 0 ? initialValue.join(", ") : "Select..."
            }
            itemTooltipClassname="w-52"
            data={{
              "": valuesToPickFrom.map((val) => ({
                label: toStringSafe(val),
                value: toStringSafe(val),
              })),
            }}
            selectedValues={initialValue}
            handleSelect={(valSelected) => {
              if (!valSelected) return;
              if (initialValue.includes(valSelected)) {
                onChange(initialValue.filter((v) => v !== valSelected));
              } else {
                onChange([...initialValue, valSelected]);
              }
            }}
          />
        );
      }

      // Drag-n-Drop (Dnd) Input Field
      else {
        return (
          <DnDTextInput
            isTextarea={typeof initialValue === "string" && isTextarea}
            inputValue={initialValue}
            onTextChange={(text) => {
              onChange(text);
            }}
            onElementDropped={(text) => {
              onChange(text);
            }}
            placeholder={placeHolder}
            className="min-w-[100%] max-w-[100%]"
          />
        );
      }
    case "primitive/emailUrl":
      return (
        <DnDTextInput
          inputType="email"
          inputValue={initialValue}
          onTextChange={(text) => {
            onChange(text);
          }}
          onElementDropped={(text) => {
            onChange(text);
          }}
          placeholder={placeHolder}
          className="mb-1 min-w-[15.7rem] max-w-[15.7rem]"
        />
      );
    case "primitive/url":
      return (
        <DnDTextInput
          inputType="url"
          inputValue={initialValue}
          onTextChange={(text) => {
            onChange(text);
          }}
          onElementDropped={(text) => {
            onChange(text);
          }}
          placeholder={placeHolder}
          className="mb-1 min-w-[15.7rem] max-w-[15.7rem]"
        />
      );

    case "primitive/number":
      return (
        <DnDTextInput
          inputType="number"
          inputValue={initialValue}
          onTextChange={(text) => {
            onChange(text);
          }}
          onElementDropped={(text) => {
            onChange(text);
          }}
          placeholder={placeHolder}
          className="min-w-[100%] max-w-[100%]"
        />
      );
    case "primitive/tel":
      return (
        <DnDTextInput
          inputType="tel"
          inputValue={initialValue}
          onTextChange={(text) => {
            onChange(text);
          }}
          onElementDropped={(text) => {
            onChange(text);
          }}
          placeholder={placeHolder}
          className="min-w-[100%] max-w-[100%]"
        />
      );

    case "primitive/milliseconds":
      return (
        <DurationInput
          hasError={false}
          isDisabled={false}
          initialValue={initialValue}
          onSave={(duration) => {
            onChange(duration);
          }}
        />
      );

    case "primitive/array":
      return (
        <ArrayInput
          initialArray={initialValue}
          onChange={(newArray) => {
            onChange(newArray);
          }}
        />
      );

    case "primitive/record":
      return (
        <RecordInput
          initialRecords={initialValue}
          onChange={(newRecords) => {
            onChange(newRecords);
          }}
        />
      );

    case "primitive/customSwitch":
      return (
        <CustomSwitchInput
          valuesToPickFrom={valuesToPickFrom}
          onValueChange={(newVal) => onChange(newVal)}
          selectedValue={initialValue}
        />
      );

    case "primitive/switch":
      return (
        <div
          className={cn(
            "flex flex-1 justify-center",
            !isWithinAGroup && "justify-start pl-1"
          )}
        >
          <SimpleSwitchInput
            isChecked={!!initialValue}
            onCheckedChange={(isChecked) => onChange(isChecked)}
          />
        </div>
      );
    case "primitive/radio":
      return (
        <div className={cn("flex flex-1 justify-start pl-1")}>
          {valuesToPickFrom && (
            <RadioInput
              onSelect={onChange}
              selectedValue={initialValue}
              valuesToSelect={valuesToPickFrom.map((v) => toStringSafe(v))}
            />
          )}
        </div>
      );

    default:
      return <div></div>;
  }
};

export default ParamInput;
