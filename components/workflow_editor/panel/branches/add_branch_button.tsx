import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import React from "react";

const AddBranchButton = ({
  isDisabled,
  onClick,
  textContent,
}: {
  isDisabled?: boolean;
  onClick: () => void;
  textContent?: string;
}) => {
  return (
    <div className="flex flex-col w-full items-center gap-2">
      <Button
        disabled={isDisabled} // Disable if one or more branches are in Editing Mode
        variant={"ghost"}
        className={cn(
          "relative flex flex-1 h-8 border border-dashed !py-[0.3rem] !w-full px-2 transition-all duration-300 justify-center items-center gap-1 hover:bg-white bg-white cursor-pointer rounded-sm hover:text-neutral-500/60 text-neutral-500 active:scale-[0.97]"
        )}
        onClick={() => onClick()}
      >
        <Plus className="stroke-neutral-400 size-4 stroke-[1.8px]" />
        {textContent ?? "Add a condition"}
      </Button>
    </div>
  );
};

export default AddBranchButton;
