import React from "react";
import { UndoDotIcon } from "lucide-react";
import { Button } from "@vscrape/ui";

const RevertVersionButton = () => {
  return (
    <Button
      variant={"default"}
      className="rounded-2xl h-7 text-xs gap-1 px-3 active:scale-[0.97]"
    >
      <UndoDotIcon className="stroke-white" />
      <span className="">Revert this version</span>
    </Button>
  );
};

export default RevertVersionButton;
