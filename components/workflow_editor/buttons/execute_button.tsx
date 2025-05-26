import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import React from "react";

const ExecuteButton = () => {
  return (
    <Button
      variant={"default"}
      className="rounded-2xl h-7 text-xs gap-1 px-3 active:scale-[0.97]"
    >
      <Play className="stroke-white" />
      <span className="">Execute</span>
    </Button>
  );
};

export default ExecuteButton;
