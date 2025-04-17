import {
  vsAnyPrimitives,
  vsAnyRawTypes,
} from "@/lib/workflow_editor/types/data_types";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import RecordParam from "./params/record_param";
import { workflowOperations } from "@/lib/workflow_editor/constants/workflows_operations_definition";
import { OperationParamItem } from "@/lib/workflow_editor/types/w_types";

type RecordArray = { key: string; value: any }[];

const getInitialParamValue = ({
  paramName,
  operationName,
}: {
  paramName: string;
  operationName?: string;
}): any => {
  const param: any = workflowOperations
    .find((op) => op.operationName === operationName)
    ?.params?.flatMap((param) => {
      if (Array.isArray(param)) {
        return param.flatMap((p) => p);
      } else {
        return param;
      }
    })
    .find((param) => param.paramName === paramName);
  console.log("@DEBUG", "Param found", param);
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
  initialValue?: number | string | boolean | RecordArray;
  valuesToPickFrom?: number[] | string[] | boolean[];
}) => {
  const [selectedValue, setSelectedValue] = useState<any>(
    getInitialParamValue({ paramName, operationName })
  );

  switch (inputType) {
    case "primitive/text":
      return (
        <Input
          placeholder={placeHolder ?? "Type here..."}
          type="text"
          className="!text-xs flex-1 w-full !h-[2rem] rounded-sm placeholder:font-semibold placeholder:text-muted-foreground/70"
          onChange={(e) => onChange(e)}
        />
      );

    case "primitive/record":
      return (
        <div>
          {(selectedValue as RecordArray).map((item, idx) => {
            const isLast = (selectedValue as RecordArray).length === idx + 1;
            return (
              <RecordParam
                key={`${operationName}_${paramName}_record_${idx}_`}
                initialValue={{ key: item.key, value: item.value }}
                isLast={isLast}
                onKeyChange={(newKeyVal) => {
                  (selectedValue as RecordArray)[idx].key = newKeyVal;
                  console.log("@DEBUG", "keyChanged", selectedValue);
                  setSelectedValue(selectedValue);
                }}
                onValueChange={(val) => {
                  (selectedValue as RecordArray)[idx].value = val;
                  setSelectedValue(selectedValue);
                  console.log("@DEBUG", "valChanged", selectedValue);
                }}
                onAdd={() => {
                  setSelectedValue([...selectedValue, { key: "", value: "" }]);
                }}
                onDelete={() => {
                  const updated = [...selectedValue];
                  updated.splice(idx, 1); // remove 1 item at index `idx`
                  // setSelectedValue(prev =>  (prev as RecordArray).);
                  console.log("@DEBUG", `Deleted at ${idx}`, updated);
                  console.log("@DEBUG", `Deleted at ${idx}`, selectedValue);
                }}
              />
            );
          })}
        </div>
      );
    case "primitive/customSwitch":
      return (
        <div className="rounded-lg flex w-[60%] items-center px-1 py-1 gap-2 h-[2rem] bg-transparent border border-neutral-200 transition-all duration-300">
          {valuesToPickFrom?.map((value) => (
            <button
              onClick={() => setSelectedValue(value)}
              className={cn(
                "h-full rounded-sm text-xs font-semibold bg-transparent text-neutral-500 cursor-pointer flex flex-1 justify-center items-center",
                selectedValue === value && "bg-neutral-200"
              )}
            >
              {value}
            </button>
          ))}
        </div>
      );

    case "primitive/switch":
      return (
        <div>
          <Switch
            checked={!!selectedValue}
            onCheckedChange={(isChecked) => {
              setSelectedValue(isChecked);
            }}
            id={`${paramName}_switch`}
            className="data-[state=unchecked]:bg-neutral-300 data-[state=checked]:bg-neutral-500 mb-2 mt-1"
          />
        </div>
      );

    default:
      return <div></div>;
  }
};

export default ParamInput;
