import ParamInput from "@/components/workflow_editor/param_inputs";
import { cn } from "@/lib/utils";
import {
  vsAnyPrimitives,
  vsAnyRawTypes,
} from "@/lib/workflow_editor/types/data_types";

const ParameterItemLine = ({
  label,
  inputType,
  onValueChange,
  placeHolder,
  valuesToPickFrom,
  className,
  inputClassName,
  labelClassName,
  operationName,
}: {
  label: string;
  placeHolder?: string;
  operationName?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  inputType: vsAnyPrimitives["type"] | vsAnyRawTypes["type"];
  onValueChange: (value: any) => void;
  valuesToPickFrom?: number[] | string[] | boolean[];
}) => {
  return (
    <div
      className={cn(
        "flex flex-col w-full gap-1 justify-between items-start",
        className
      )}
    >
      <div
        className={cn(
          "px-1 w-full text-start text-xs line-clamp-1 font-semibold text-neutral-500",
          labelClassName
        )}
      >
        {label}
      </div>

      <div
        className={cn(
          "flex flex-1 w-full justify-start items-center text-xs text-neutral-700",
          inputClassName
        )}
      >
        <ParamInput
          paramName={label}
          inputType={inputType}
          onChange={onValueChange}
          placeHolder={placeHolder}
          valuesToPickFrom={valuesToPickFrom}
          operationName={operationName}
        />
      </div>
    </div>
  );
};

export default ParameterItemLine;
