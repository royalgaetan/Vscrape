import React, { useId } from "react";
import {
  capitalizeFirstLetter,
  Label,
  RadioGroup,
  RadioGroupItem,
  cn,
} from "@vscrape/ui";

const RadioInput = ({
  selectedValue,
  valuesToSelect,
  onSelect,
  className,
  hasError,
}: {
  valuesToSelect: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  className?: string;
  hasError?: boolean;
}) => {
  const componentId = useId();
  return (
    <RadioGroup
      defaultValue={selectedValue}
      onValueChange={onSelect}
      key={`radio_${componentId}`}
      className={cn(
        "flex flex-col justify-start mb-0 mt-2 gap-y-3 border-none",
        hasError &&
          "rounded-sm ring-2 ring-offset-[3px] ring-destructive/60 transition-all duration-300",
        className
      )}
    >
      {valuesToSelect.length > 0 &&
        valuesToSelect
          .filter((v) => v.length > 0)
          .map((value) => {
            return (
              <div
                key={value}
                className="flex items-center space-x-1 hover:opacity-90 transition-all duration-150"
              >
                <RadioGroupItem
                  className="data-[state=unchecked]:border-neutral-300 data-[state=checked]:border-neutral-500"
                  circleIndicatorClassname="fill-neutral-500"
                  value={value}
                  id={value}
                />
                <Label
                  className="w-full text-start text-xs line-clamp-1 font-normal text-neutral-500 cursor-pointer"
                  htmlFor={value}
                >
                  {capitalizeFirstLetter(value)}
                </Label>
              </div>
            );
          })}
    </RadioGroup>
  );
};

export default RadioInput;
