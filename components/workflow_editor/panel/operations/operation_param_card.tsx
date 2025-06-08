import ParamInput from "@/components/workflow_editor/param_inputs";
import { cn } from "@/lib/utils";
import { OperationBlock } from "@/lib/workflow_editor/classes/operation_block";
import { OperationParamItem } from "@/lib/workflow_editor/types/w_types";
import { useState } from "react";

const OperationParamCard = ({
  currentOperationBlock,
  paramData,
  className,
  inputClassName,
  labelClassName,
  isWithinAGroup,
  hasError,
}: {
  currentOperationBlock: OperationBlock;
  paramData: OperationParamItem;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  isWithinAGroup: boolean;
  hasError?: boolean;
}) => {
  const getParam = (): OperationParamItem | undefined => {
    return currentOperationBlock?.params
      ?.flatMap((p) => p)
      .find((p) => p.paramName === paramData.paramName);
  };

  const [internalValue, setInternalValue] = useState<any>(getParam()?.value);

  const updateParamValue = (param: OperationParamItem, newValue: any) => {
    param.value = newValue;
    return param;
  };

  const onValueChange = (newValue: any) => {
    setInternalValue(newValue);

    if (!currentOperationBlock || !currentOperationBlock.params) return;

    const updatedOperationParams = currentOperationBlock.params.map((param) => {
      if (Array.isArray(param)) {
        return param.map((subParam) => {
          if (subParam.paramName === paramData.paramName) {
            return updateParamValue(subParam, newValue);
          }
          return subParam;
        });
      } else {
        if (param.paramName === paramData.paramName) {
          return updateParamValue(param, newValue);
        }
        return param;
      }
    });
    currentOperationBlock.params = updatedOperationParams;
  };

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
        {paramData.paramName}
      </div>
      <div
        className={cn(
          "flex flex-1 w-full !justify-start items-center text-xs text-neutral-700",
          inputClassName
        )}
      >
        <ParamInput
          isWithinAGroup={isWithinAGroup}
          initialValue={internalValue}
          inputType={paramData.type}
          onValueChange={onValueChange}
          hasError={hasError}
          placeHolder={paramData.paramInputPlaceholder}
          valuesToPickFrom={paramData.valuesToPickFrom}
          isTextarea={
            paramData.type === "primitive/text" && paramData.isTextarea
          }
        />
      </div>
    </div>
  );
};

export default OperationParamCard;
