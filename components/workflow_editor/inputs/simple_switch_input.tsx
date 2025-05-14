import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import React, { useId } from "react";

const SimpleSwitchInput = ({
  isChecked,
  onCheckedChange,
  className,
}: {
  isChecked: boolean;
  onCheckedChange: (isChecked: boolean) => void;
  className?: string;
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
        "mb-2 mt-1 data-[state=unchecked]:bg-neutral-300 data-[state=checked]:bg-neutral-500",
        className
      )}
    />
  );
};

export default SimpleSwitchInput;
