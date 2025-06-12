import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

const AddFieldBlockButton = ({
  contentText,
  onClick,
}: {
  contentText?: string;
  onClick: () => void;
}) => {
  return (
    <Button
      variant={"ghost"}
      className={cn(
        "relative flex flex-1 h-8 border border-dashed !py-[0.3rem] !w-full px-2 transition-all duration-300 justify-center items-center gap-1 hover:bg-white bg-white cursor-pointer rounded-sm hover:text-neutral-500/60 text-neutral-500 active:scale-[0.97]"
      )}
      onClick={(e) => onClick()}
    >
      <Plus className="stroke-neutral-400 size-4 stroke-[1.8px]" />{" "}
      {contentText ?? "Add a field"}
    </Button>
  );
};

export default AddFieldBlockButton;
