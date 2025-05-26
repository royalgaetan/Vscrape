import ParamInput from "@/components/workflow_editor/param_inputs";
import { cn } from "@/lib/utils";
import { OperationItem } from "@/lib/workflow_editor/classes/operation_item";
import { OperationParamItem } from "@/lib/workflow_editor/types/w_types";
import { useWorkflowEditorStore } from "@/stores/workflowStore";
import { useState } from "react";

const OperationParamCard = ({
  paramData,
  className,
  inputClassName,
  labelClassName,
  isWithinAGroup,
}: {
  paramData: OperationParamItem;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  isWithinAGroup: boolean;
}) => {
  // Store
  const currentBlock = useWorkflowEditorStore(
    (s) => s.currentBlock
  ) as OperationItem;
  const setCurrentBlock = useWorkflowEditorStore((s) => s.setCurrentBlock);
  // End Store

  const getParam = (): OperationParamItem | undefined => {
    return currentBlock?.params
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

    if (!currentBlock || !currentBlock.params) return;

    const updatedOperationParams = currentBlock.params.map((param) => {
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
    currentBlock.params = updatedOperationParams;
    setCurrentBlock(currentBlock);
    // console.log("@debug", "Internal Value", internalValue);
    // console.log("@debug", "(provider) currentBlock", currentBlock);
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
          onChange={onValueChange}
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
