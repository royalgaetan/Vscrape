import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { capitalizeFirstLetter } from "@/lib/string_utils";
import { cn } from "@/lib/utils";
import React, { useId } from "react";

const RadioInput = ({
  selectedValue,
  valuesToSelect,
  onSelect,
  className,
}: {
  valuesToSelect: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  className?: string;
}) => {
  const componentId = useId();
  return (
    <RadioGroup
      defaultValue={selectedValue}
      onValueChange={onSelect}
      key={`radio_${componentId}`}
      className={cn(
        "flex flex-wrap justify-start mb-0 mt-2 space-x-3",
        className
      )}
    >
      {valuesToSelect.length > 0 &&
        valuesToSelect.map((value) => {
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
