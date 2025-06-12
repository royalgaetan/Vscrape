import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter } from "@/lib/string_utils";
import { cn } from "@/lib/utils";
import React, { useId } from "react";

const CheckboxInput = ({
  selectedValues,
  valuesToSelect,
  onSelect,
  className,
}: {
  selectedValues: string[];
  valuesToSelect: string[];
  onSelect: (valuesSelected: string[]) => void;
  className?: string;
}) => {
  const componentId = useId();
  return (
    <div
      key={`checkbox_${componentId}`}
      className={cn(
        "flex flex-wrap items-baseline pt-2 gap-x-2 gap-y-1",
        className
      )}
    >
      {valuesToSelect.length > 0 &&
        valuesToSelect
          .filter((v) => v.length > 0)
          .map((value) => {
            return (
              <Badge
                key={value}
                onClick={() => {
                  const newSelection = selectedValues.includes(value)
                    ? selectedValues.filter((v) => v !== value)
                    : [...selectedValues, value];

                  onSelect(newSelection);
                }}
                variant="secondary"
                className={cn(
                  "h-fit hover:bg-secondary/60 transition-all duration-100 text-muted-foreground font-medium cursor-pointer",
                  selectedValues.includes(value) &&
                    "bg-primary text-white font-semibold hover:bg-primary"
                )}
              >
                {capitalizeFirstLetter(value)}
              </Badge>
            );
          })}
    </div>
  );
};

export default CheckboxInput;
