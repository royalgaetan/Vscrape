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

const ParamInput = ({
  inputType,
  placeHolder,
  onChange,
  valuesToPickFrom,
  initialValue,
  isWithinAGroup,
}: {
  inputType: vsAnyPrimitives["type"] | vsAnyRawTypes["type"];
  placeHolder?: string;
  onChange: (value: any) => void;
  initialValue: any;
  valuesToPickFrom?: OperationValuesToPickFromType;
  isWithinAGroup: boolean;
}) => {
  switch (inputType) {
    case "primitive/text":
      if (valuesToPickFrom && valuesToPickFrom.length > 0) {
        return (
          <Select onValueChange={onChange}>
            <SelectTrigger
              className={cn(
                "h-[1.9rem]",
                isWithinAGroup && "min-w-24 max-w-24"
              )}
            >
              <SelectValue
                className="text-xs"
                placeholder="Select a report type"
              />
            </SelectTrigger>

            <SelectContent>
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
      } else {
        return (
          <DnDTextInput
            inputValue={initialValue}
            onTextChange={(text) => {
              onChange(text);
            }}
            onElementDropped={(text) => {
              onChange(text);
            }}
            placeholder={placeHolder}
            className="min-w-[15.7rem] max-w-[15.7rem]"
          />
        );
      }
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

    default:
      return <div></div>;
  }
};

export default ParamInput;
