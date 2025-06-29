import { Switch, cn } from "@vscrape/ui";
import React, { useId } from "react";

const SimpleSwitchInput = ({
  isChecked,
  onCheckedChange,
  className,
  hasError,
}: {
  isChecked: boolean;
  onCheckedChange: (isChecked: boolean) => void;
  className?: string;
  hasError?: boolean;
}) => {
  const componentId = useId();
  return (
    <Switch
      checked={!!isChecked}
      onCheckedChange={(changes) => {
        onCheckedChange(changes);
      }}
      key={`switch_${componentId}`}
      className={cn(
        "mb-0 mt-1 data-[state=unchecked]:bg-neutral-300 data-[state=checked]:bg-neutral-500",
        hasError && "ring-2 ring-offset-2 ring-destructive/60",
        className
      )}
    />
  );
};

export default SimpleSwitchInput;
