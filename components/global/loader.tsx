import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React, { Ref } from "react";

const CustomLoader = ({
  className,
  ref,
  text,
}: {
  className?: string;
  text?: string;
  ref?: Ref<HTMLDivElement>;
}) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center h-screen w-screen",
        className
      )}
    >
      <div className="flex flex-col gap-2 items-center justify-center">
        <span className="text-sm text-neutral-500">{text ?? "Loading..."}</span>
        <hr className="w-64 h-px bg-gray-200 border-0 dark:bg-gray-700" />
        <Loader2 className="animate-spin text-neutral-500" />
      </div>
    </div>
  );
};

export default CustomLoader;
