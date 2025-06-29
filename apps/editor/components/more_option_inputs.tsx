import { cn } from "@vscrape/ui";
import { OperationItem, OperationMoreOptionType } from "@vscrape/engine/src";
import React, { useEffect, useState } from "react";
import SimpleSwitchInput from "./inputs/simple_switch_input";
import { LucideIcon } from "lucide-react";

const getInitialOptionValues = ({
  optionType,
  currentOperationItem,
}: {
  optionType: OperationMoreOptionType;
  currentOperationItem?: OperationItem;
}): any => {
  if (!currentOperationItem) return;
  switch (optionType) {
    case "skipDuplicate":
      return currentOperationItem.skipDuplicate;
    case "loopThrough":
      return currentOperationItem.loopThrough;
    default:
      break;
  }
};

type Props = {
  currentOperationItem: OperationItem;
  optionType: OperationMoreOptionType;
  hasError?: boolean;
  onError?: (val: boolean) => void;
  isEditting?: (state: boolean) => void;

  nodeId?: string;
  itemId?: string;
};

const MoreOptionInput = ({
  currentOperationItem,
  optionType,
  hasError,
  onError,
  isEditting,

  nodeId,
  itemId,
}: Props) => {
  const [internalValue, setInternalValue] = useState<any>(
    getInitialOptionValues({
      optionType: optionType,
      currentOperationItem,
    })
  );

  const [hasInternalError, setHasInternalError] = useState(hasError ?? false);

  useEffect(() => {
    setHasInternalError(hasError ?? false);
  }, [hasError]);

  const updateValue = (newValue: any) => {
    if (!currentOperationItem) return;
    setInternalValue(newValue);
    switch (optionType) {
      case "skipDuplicate":
        currentOperationItem.skipDuplicate = newValue;
        break;
      case "loopThrough":
        currentOperationItem.loopThrough = newValue;
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

    // case "filters":
    //   return (
    //     <FilterInput
    //       nodeId={nodeId}
    //       itemId={itemId}
    //       isEditting={(state) => isEditting && isEditting(state)}
    //       onError={(err) => {
    //         onError && onError(err);
    //       }}
    //       initialFilters={internalValue}
    //       onBlur={(newFilters) => updateValue(newFilters)}
    //     />
    //   );

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
