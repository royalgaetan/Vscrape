import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";

const NodeHandle = ({
  iconClassName,
  containerClassName,
  iconColor,
}: {
  iconClassName?: string;
  containerClassName?: string;
  iconColor?: string;
}) => {
  return (
    <span
      className={cn(
        "w-1/3 h-16 items-center transition-all duration-100 ease-in-out",
        containerClassName
      )}
    >
      <Circle
        className={cn(
          "size-2 inline-block transition-transform duration-100 ease-in-out",
          iconClassName
        )}
        stroke={iconColor ?? "#6460aa"}
        fill={iconColor ?? "#6460aa"}
      />
    </span>
  );
};

export default NodeHandle;
