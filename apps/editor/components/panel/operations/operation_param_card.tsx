import ParamInput from "../../param_inputs";
import { OperationItem, OperationItemParam } from "@vscrape/engine/src";
import { cn } from "@vscrape/ui";
import { useState } from "react";

const OperationItemParamCard = ({
  currentOperationItem,
  paramData,
  className,
  inputClassName,
  labelClassName,
  isWithinAGroup,
  hasError,
  nodeId,
  itemId,
}: {
  currentOperationItem: OperationItem;
  paramData: OperationItemParam;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  isWithinAGroup: boolean;
  hasError?: boolean;

  nodeId?: string;
  itemId?: string;
}) => {
  const getParam = (): OperationItemParam | undefined => {
    return currentOperationItem?.itemParams
      ?.flatMap((p) => p)
      .find((p) => p.paramName === paramData.paramName);
  };

  const [internalValue, setInternalValue] = useState<any>(getParam()?.value);

  const updateParamValue = (param: OperationItemParam, newValue: any) => {
    param.value = newValue;
    return param;
  };

  const onValueChange = (newValue: any) => {
    setInternalValue(newValue);

    if (!currentOperationItem || !currentOperationItem.itemParams) return;

    const updatedOperationParams = currentOperationItem.itemParams.map(
      (param) => {
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
      }
    );
    currentOperationItem.itemParams = updatedOperationParams;
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
          nodeId={nodeId}
          itemId={itemId}
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

export default OperationItemParamCard;
