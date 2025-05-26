import { cn } from "@/lib/utils";
import { OperationMoreOptionType } from "@/lib/workflow_editor/types/w_types";
import React, { useState } from "react";
import SimpleSwitchInput from "./inputs/simple_switch_input";
import { LucideIcon } from "lucide-react";
import FilterInput from "./inputs/filter_input";
import { useWorkflowEditorStore } from "@/stores/workflowStore";
import { OperationItem } from "@/lib/workflow_editor/classes/operation_item";

const getInitialOptionValues = ({
  optionType,
  currentBlock,
}: {
  optionType: OperationMoreOptionType;
  currentBlock?: OperationItem;
}): any => {
  if (!currentBlock) return;
  switch (optionType) {
    case "skipDuplicate":
      return currentBlock.skipDuplicate;
    case "loopThrough":
      return currentBlock.loopThrough;
    case "filters":
      return currentBlock.inputFilters;
    default:
      break;
  }
};

type Props = {
  optionType: OperationMoreOptionType;
};

const MoreOptionInput = ({ optionType }: Props) => {
  // Store
  const currentBlock = useWorkflowEditorStore(
    (s) => s.currentBlock
  ) as OperationItem;
  const setCurrentBlock = useWorkflowEditorStore((s) => s.setCurrentBlock);
  // End Store

  const [internalValue, setInternalValue] = useState<any>(
    getInitialOptionValues({
      optionType: optionType,
      currentBlock: currentBlock,
    })
  );

  const updateValue = (newValue: any) => {
    setInternalValue(newValue);
    if (!currentBlock) return;
    switch (optionType) {
      case "skipDuplicate":
        currentBlock.skipDuplicate = newValue;
        setCurrentBlock(currentBlock);
        break;
      case "loopThrough":
        currentBlock.loopThrough = newValue;
        setCurrentBlock(currentBlock);
        break;
      case "filters":
        currentBlock.inputFilters = newValue;
        setCurrentBlock(currentBlock);
        break;
      default:
        break;
    }
  };

  switch (optionType) {
    case "skipDuplicate":
      return (
        <div className="flex flex-1 items-center w-full mb-2">
          <MoreOptionLabel label={"Skip Duplicate"} />

          <SimpleSwitchInput
            isChecked={!!internalValue}
            onCheckedChange={(isChecked) => updateValue(isChecked)}
          />
        </div>
      );

    case "loopThrough":
      return (
        <div className="flex flex-1 items-center w-full mb-2">
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
