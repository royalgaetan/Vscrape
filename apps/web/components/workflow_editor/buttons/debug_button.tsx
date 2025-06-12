import { Button } from "@/components/ui/button";
import { BugPlayIcon } from "lucide-react";
import React from "react";

const DebugButton = () => {
  return (
    <Button
      variant={"default"}
      className="!bg-yellow-500 hover:!bg-yellow-500/70 rounded-2xl h-7 text-xs gap-1 px-3 "
    >
      <BugPlayIcon className="stroke-white" />
    </Button>
  );
};

export default DebugButton;
