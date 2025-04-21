import { Switch } from "@/components/ui/switch";
import React, { useId } from "react";

const SimpleSwitchInput = ({
  isChecked,
  onCheckedChange,
}: {
  isChecked: boolean;
  onCheckedChange: (isChecked: boolean) => void;
}) => {
  const componentId = useId();
  return (
    <Switch
      checked={!!isChecked}
      onCheckedChange={(changes) => {
        onCheckedChange(changes);
      }}
      key={`switch_${componentId}`}
      className="mb-2 mt-1 data-[state=unchecked]:bg-neutral-300 data-[state=checked]:bg-neutral-500"
    />
  );
};

export default SimpleSwitchInput;
