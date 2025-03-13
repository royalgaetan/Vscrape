import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

const SettingItemButton = ({
  text,
  onClick,
  disabled,
  className,
}: {
  text: string;
  disabled?: boolean;
  className?: string;
  onClick: () => void;
}) => {
  return (
    <Button
      type="button"
      variant={"outline"}
      size={"sm"}
      disabled={disabled}
      className={cn("w-fit", className)}
      onClick={() => onClick()}
    >
      {text}
    </Button>
  );
};

export default SettingItemButton;
