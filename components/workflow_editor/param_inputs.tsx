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

const ParamInput = ({
  inputType,
  placeHolder,
  onChange,
  valuesToPickFrom,
  initialValue,
}: {
  inputType: vsAnyPrimitives["type"] | vsAnyRawTypes["type"];
  placeHolder?: string;
  onChange: (value: any) => void;
  initialValue: any;
  valuesToPickFrom?: OperationValuesToPickFromType;
}) => {
  switch (inputType) {
    case "primitive/text":
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
        <SimpleSwitchInput
          isChecked={!!initialValue}
          onCheckedChange={(isChecked) => onChange(isChecked)}
        />
      );

    default:
      return <div></div>;
  }
};

export default ParamInput;
