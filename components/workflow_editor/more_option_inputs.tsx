import { cn } from "@/lib/utils";
import {
  OperationItem,
  OperationMoreOptionType,
} from "@/lib/workflow_editor/types/w_types";
import React, { useState } from "react";
import SimpleSwitchInput from "./inputs/simple_switch_input";
import { LucideIcon } from "lucide-react";
import { useWorkflowEditor } from "@/hooks/useWorkflowEditor";
import FilterInput from "./inputs/filter_input";

const getInitialOptionValues = ({
  optionType,
  currentOperation,
}: {
  optionType: OperationMoreOptionType;
  currentOperation?: OperationItem;
}): any => {
  if (!currentOperation) return;
  switch (optionType) {
    case "skipDuplicate":
      return currentOperation.skipDuplicate;
    case "loopThrough":
      return currentOperation.loopThrough;
    case "filters":
      return currentOperation.inputFilters;
    default:
      break;
  }
};

type Props = {
  optionType: OperationMoreOptionType;
};

const MoreOptionInput = ({ optionType }: Props) => {
  const { currentOperation, setCurrentOperation } = useWorkflowEditor();
  const [internalValue, setInternalValue] = useState<any>(
    getInitialOptionValues({
      optionType: optionType,
      currentOperation: currentOperation,
    })
  );

  const updateValue = (newValue: any) => {
    setInternalValue(newValue);
    if (!currentOperation) return;
    switch (optionType) {
      case "skipDuplicate":
        currentOperation.skipDuplicate = newValue;
        setCurrentOperation(currentOperation);

      case "loopThrough":
        currentOperation.loopThrough = newValue;
        setCurrentOperation(currentOperation);

      case "filters":
        currentOperation.inputFilters = newValue;
        setCurrentOperation(currentOperation);

      default:
        break;
    }
  };

  switch (optionType) {
    case "skipDuplicate":
      return (
        <div className="flex flex-1 items-center w-full">
          <MoreOptionLabel label={"Skip Duplicate"} />

          <SimpleSwitchInput
            isChecked={!!internalValue}
            onCheckedChange={(isChecked) => updateValue(isChecked)}
          />
        </div>
      );

    case "loopThrough":
      return (
        <div className="flex flex-1 items-center w-full">
          <MoreOptionLabel label={"Loop Through"} />

          <SimpleSwitchInput
            isChecked={!!internalValue}
            onCheckedChange={(isChecked) => updateValue(isChecked)}
          />
        </div>
      );

    case "filters":
      return (
        <FilterInput
          initialFilters={internalValue}
          onBlur={(newFilters) => updateValue(newFilters)}
        />
      );

    default:
      return <div></div>;
  }
};

export default MoreOptionInput;

const MoreOptionLabel = ({
  label,
  className,
  Icon,
}: {
  label: string;
  className?: string;
  Icon?: LucideIcon;
}) => {
  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="w-fit">
        {Icon && <Icon className="stroke-neutral-600/70 !size-4" />}
      </div>

      <div
        className={cn(
          "px-1 w-full text-start text-xs line-clamp-1 font-semibold text-neutral-500",
          className
        )}
      >
        {label}
      </div>
    </div>
  );
};
