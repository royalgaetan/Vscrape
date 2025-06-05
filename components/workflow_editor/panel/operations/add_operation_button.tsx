import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

const AddOperationButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      variant={"ghost"}
      className={cn(
        "group/operationItemButton border border-dashed relative flex flex-1 h-4 !py-[0.3rem] !w-full px-2 transition-all duration-300 justify-center items-center gap-1 hover:bg-white bg-white cursor-pointer rounded-sm hover:text-neutral-500/60 text-neutral-500 active:scale-[0.97]"
      )}
      onClick={(e) => onClick()}
    >
      <Plus className="stroke-neutral-400 size-4 stroke-[1.8px]" /> Add an
      operation
    </Button>
  );
};

export default AddOperationButton;
