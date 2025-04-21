import {
  vsAnyPrimitives,
  vsAnyRawTypes,
} from "@/lib/workflow_editor/types/data_types";
import React, { useState } from "react";
import RecordInput from "./inputs/record_input";
import {
  deepFreeze,
  workflowOperations,
} from "@/lib/workflow_editor/constants/workflows_operations_definition";
import CustomSwitchInput from "./inputs/custom_switch_input";
import {
  OperationValuesToPickFromType,
  RecordArray,
} from "@/lib/workflow_editor/types/w_types";
import SimpleSwitchInput from "./inputs/simple_switch_input";
import DnDTextInput from "./inputs/dnd_text_input";

const getInitialParamValue = ({
  paramName,
  operationName,
}: {
  paramName: string;
  operationName?: string;
}): any => {
  const frozenWorkflowOperations = deepFreeze([...workflowOperations] as const);
  const param: any = frozenWorkflowOperations
    .find((op) => op.operationName === operationName)
    ?.params?.flatMap((param) => {
      if (Array.isArray(param)) {
        return param.flatMap((p) => p);
      } else {
        return param;
      }
    })
    .find((param) => param.paramName === paramName);
  return param.value;
};

const ParamInput = ({
  paramName,
  inputType,
  placeHolder,
  onChange,
  valuesToPickFrom,
  operationName,
}: {
  inputType: vsAnyPrimitives["type"] | vsAnyRawTypes["type"];
  placeHolder?: string;
  operationName?: string;
  paramName: string;
  onChange: (value: any) => void;
  valuesToPickFrom?: OperationValuesToPickFromType;
}) => {
  const [selectedValue, setSelectedValue] = useState(
    getInitialParamValue({ paramName, operationName })
  );

  switch (inputType) {
    case "primitive/text":
      return (
        <DnDTextInput
          onTextChange={(text) => setSelectedValue(text)}
          placeholder={placeHolder}
          className="min-w-[15.7rem] max-w-[15.7rem]"
        />
      );

    case "primitive/record":
      return (
        <div>
          {(selectedValue as RecordArray).map((item, idx) => {
            const isLast = (selectedValue as RecordArray).length === idx + 1;
            return (
              <RecordInput
                key={`${operationName}_${paramName}_record_${idx}_`}
                initialValue={{ key: item.key, value: item.value }}
                isLast={isLast}
                onKeyChange={(newKeyVal) => {
                  const updated: RecordArray = structuredClone(
                    selectedValue as RecordArray
                  );
                  updated[idx].key = newKeyVal;
                  setSelectedValue(updated);
                }}
                onValueChange={(val) => {
                  const updated: RecordArray = structuredClone(
                    selectedValue as RecordArray
                  );
                  updated[idx].value = val;
                  setSelectedValue(updated);
                }}
                onAdd={() => {
                  setSelectedValue([...selectedValue, { key: "", value: "" }]);
                }}
                onDelete={() => {
                  const deletedArr = (selectedValue as RecordArray).filter(
                    (_, id) => id !== idx
                  );
                  setSelectedValue(deletedArr);
                }}
              />
            );
          })}
        </div>
      );
    case "primitive/customSwitch":
      return (
        <CustomSwitchInput
          valuesToPickFrom={valuesToPickFrom}
          onValueChange={(newVal) => setSelectedValue(newVal)}
          selectedValue={selectedValue}
        />
      );

    case "primitive/switch":
      return (
        <SimpleSwitchInput
          isChecked={!!selectedValue}
          onCheckedChange={(isChecked) => setSelectedValue(isChecked)}
        />
      );

    default:
      return <div></div>;
  }
};

export default ParamInput;
