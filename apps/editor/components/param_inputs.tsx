import React, { useEffect, useState } from "react";
import RecordInput from "./inputs/record_input";
import CustomSwitchInput from "./inputs/custom_switch_input";
import SimpleSwitchInput from "./inputs/simple_switch_input";
import DnDTextInput from "./inputs/dnd_text_input";
import ArrayInput from "./inputs/array_input";
import RadioInput from "./inputs/radio_input";
import DurationInput from "./inputs/duration_input";
import {
  vsAnyPrimitives,
  vsAnyRawTypes,
  OperationValuesToPickFromType,
} from "@vscrape/engine/src";
import {
  MultiSelect,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  capitalizeFirstLetter,
  cn,
  toStringSafe,
} from "@vscrape/ui";

const ParamInput = ({
  inputType,
  placeHolder,
  onValueChange,
  valuesToPickFrom,
  initialValue,
  isWithinAGroup,
  isTextarea,
  hasError,

  nodeId,
  itemId,
}: {
  inputType: vsAnyPrimitives["type"] | vsAnyRawTypes["type"];
  placeHolder?: string;
  onValueChange: (value: any) => void;
  initialValue: any;
  valuesToPickFrom?: OperationValuesToPickFromType;
  isWithinAGroup: boolean;
  isTextarea?: boolean;
  hasError?: boolean;

  nodeId?: string;
  itemId?: string;
}) => {
  const [hasInternalError, setHasInternalError] = useState(hasError ?? false);

  useEffect(() => {
    setHasInternalError(hasError ?? false);
  }, [hasError]);

  const onChange = (val: any) => {
    setHasInternalError(false);
    onValueChange(val);
  };

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
                isWithinAGroup && "min-w-24 max-w-24",
                hasInternalError &&
                  "border-destructive/70 ring-2 ring-destructive/60"
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
            triggerClassName={`h-7 w-[15.7rem] flex flex-1 mb-1 ${
              hasInternalError &&
              "border-destructive/70 ring-2 ring-destructive/60"
            }`}
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
            hasError={hasInternalError}
            nodeId={nodeId}
            itemId={itemId}
            onTextChange={(text) => {
              onChange(text);
            }}
            onElementDropped={(text) => {
              onChange(text);
            }}
            placeholder={placeHolder}
            className={`min-w-[15.7rem] max-w-[15.7rem] ${isWithinAGroup && "min-w-[6rem] max-w-[6rem]"}`}
          />
        );
      }
    case "primitive/emailUrl":
      return (
        <DnDTextInput
          inputType="email"
          hasError={hasInternalError}
          nodeId={nodeId}
          itemId={itemId}
          inputValue={initialValue}
          onTextChange={(text) => {
            onChange(text);
          }}
          onElementDropped={(text) => {
            onChange(text);
          }}
          placeholder={placeHolder}
          className={`mb-1 min-w-[15.7rem] max-w-[15.7rem] ${isWithinAGroup && "min-w-[6rem] max-w-[6rem]"}`}
        />
      );
    case "primitive/url":
      return (
        <DnDTextInput
          inputType="url"
          hasError={hasInternalError}
          nodeId={nodeId}
          itemId={itemId}
          inputValue={initialValue}
          onTextChange={(text) => {
            onChange(text);
          }}
          onElementDropped={(text) => {
            onChange(text);
          }}
          placeholder={placeHolder}
          className={`mb-1 min-w-[15.7rem] max-w-[15.7rem] ${isWithinAGroup && "min-w-[6rem] max-w-[6rem]"}`}
        />
      );
    case "primitive/number":
      return (
        <DnDTextInput
          hasError={hasInternalError}
          nodeId={nodeId}
          itemId={itemId}
          inputType="number"
          inputValue={initialValue}
          onTextChange={(text) => {
            onChange(text);
          }}
          onElementDropped={(text) => {
            onChange(text);
          }}
          placeholder={placeHolder}
          className={`min-w-[100%] max-w-[100%] ${isWithinAGroup && "min-w-[6rem] max-w-[6rem]"}`}
        />
      );
    case "primitive/tel":
      return (
        <DnDTextInput
          inputType="tel"
          hasError={hasInternalError}
          nodeId={nodeId}
          itemId={itemId}
          inputValue={initialValue}
          onTextChange={(text) => {
            onChange(text);
          }}
          onElementDropped={(text) => {
            onChange(text);
          }}
          placeholder={placeHolder}
          className={`min-w-[100%] max-w-[100%] ${isWithinAGroup && "min-w-[6rem] max-w-[6rem]"}`}
        />
      );
    case "primitive/milliseconds":
      return (
        <DurationInput
          hasError={hasInternalError}
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
          hasError={hasInternalError}
          nodeId={nodeId}
          itemId={itemId}
          initialArray={initialValue}
          onChange={(newArray) => {
            onChange(newArray);
          }}
        />
      );

    case "primitive/record":
      return (
        <RecordInput
          nodeId={nodeId}
          itemId={itemId}
          hasError={hasInternalError}
          initialRecords={initialValue}
          onChange={(newRecords) => {
            onChange(newRecords);
          }}
        />
      );

    case "primitive/customSwitch":
      return (
        <CustomSwitchInput
          hasError={hasInternalError}
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
            hasError={hasInternalError}
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
              hasError={hasInternalError}
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
