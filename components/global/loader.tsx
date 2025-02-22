import { Loader2 } from "lucide-react";
import React from "react";

const CustomLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="flex flex-col gap-2 items-center justify-center">
        <span className="text-sm text-neutral-500">Loading...</span>
        <hr className="w-64 h-px bg-gray-200 border-0 dark:bg-gray-700" />
        <Loader2 className="animate-spin text-neutral-500" />
      </div>
    </div>
  );
};

export default CustomLoader;
