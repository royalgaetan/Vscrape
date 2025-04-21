import { cn } from "@/lib/utils";
import { OperationValuesToPickFromType } from "@/lib/workflow_editor/types/w_types";
import React, { useId } from "react";

const CustomSwitchInput = ({
  valuesToPickFrom,
  selectedValue,
  onValueChange,
}: {
  valuesToPickFrom?: OperationValuesToPickFromType;
  selectedValue: any;
  onValueChange: (val: any) => void;
}) => {
  const componentId = useId();

  return (
    <div className="rounded-lg flex w-[60%] items-center px-1 py-1 gap-2 h-[2rem] bg-transparent border border-neutral-200 transition-all duration-300">
      {valuesToPickFrom ? (
        valuesToPickFrom?.map((value, idx) => (
          <button
            key={`customSwitch_${idx}_${componentId}`}
            onClick={() => onValueChange(value)}
            className={cn(
              "h-full rounded-sm text-xs font-semibold bg-transparent text-neutral-500 cursor-pointer flex flex-1 justify-center items-center",
              selectedValue === value && "bg-neutral-200"
            )}
          >
            {value}
          </button>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default CustomSwitchInput;
