import { cn } from "@/lib/utils";
import { OperationMoreOptionType } from "@/lib/workflow_editor/types/w_types";
import React, { useEffect, useState } from "react";
import SimpleSwitchInput from "./inputs/simple_switch_input";
import { LucideIcon } from "lucide-react";
import FilterInput from "./inputs/filter_input";
import { OperationBlock } from "@/lib/workflow_editor/classes/operation_block";

const getInitialOptionValues = ({
  optionType,
  currentBlock,
}: {
  optionType: OperationMoreOptionType;
  currentBlock?: OperationBlock;
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
  currentBlock: OperationBlock;
  hasError?: boolean;
  onError?: (val: boolean) => void;
  isEditting?: (state: boolean) => void;
};

const MoreOptionInput = ({
  optionType,
  currentBlock,
  hasError,
  onError,
  isEditting,
}: Props) => {
  const [internalValue, setInternalValue] = useState<any>(
    getInitialOptionValues({
      optionType: optionType,
      currentBlock: currentBlock,
    })
  );

  const [hasInternalError, setHasInternalError] = useState(hasError ?? false);

  useEffect(() => {
    setHasInternalError(hasError ?? false);
  }, [hasError]);

  const updateValue = (newValue: any) => {
    if (!currentBlock) return;
    setInternalValue(newValue);
    switch (optionType) {
      case "skipDuplicate":
        currentBlock.skipDuplicate = newValue;
        break;
      case "loopThrough":
        currentBlock.loopThrough = newValue;
        break;
      case "filters":
        currentBlock.inputFilters = newValue;
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
            hasError={hasInternalError}
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
            hasError={hasInternalError}
            isChecked={!!internalValue}
            onCheckedChange={(isChecked) => updateValue(isChecked)}
          />
        </div>
      );

    case "filters":
      return (
        <FilterInput
          isEditting={(state) => isEditting && isEditting(state)}
          onError={(err) => {
            onError && onError(err);
          }}
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
