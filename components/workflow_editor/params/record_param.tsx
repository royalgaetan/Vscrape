import { SidebarIcon } from "@/components/global/app_sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Plus, PlusCircle, Trash2 } from "lucide-react";
import React from "react";

type Props = {
  onKeyChange: (newKeyVal: string) => void;
  onValueChange: (newVal: any) => void;
  onDelete: () => void;
  onAdd: () => void;
  isLast: boolean;
  initialValue: { key: string; value: any };
};

const RecordParam = ({
  onKeyChange,
  onValueChange,
  onDelete,
  onAdd,
  isLast,
  initialValue,
}: Props) => {
  return (
    <div className="flex flex-1 gap-2 group/recordItem h-7 mt-1 mb-4">
      <Input
        placeholder={"Name..."}
        // value={Object.keys(initialValue)[0]}
        type="text"
        className="!text-xs flex-1 w-full !h-[2rem] rounded-sm placeholder:font-semibold placeholder:text-muted-foreground/70"
        onChange={(e) => onKeyChange(e.target.value)}
      />
      <Input
        placeholder={"Value..."}
        type="text"
        // value={Object.values(initialValue)[0]}
        className="!text-xs flex-1 w-full !h-[2rem] rounded-sm placeholder:font-semibold placeholder:text-muted-foreground/70"
        onChange={(e) => onValueChange(e.target.value)}
      />
      <div className="w-8">
        <Button
          variant={"ghost"}
          className={cn(
            "hidden group-hover/recordItem:flex w-8 transition-all duration-300 h-8 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm"
          )}
          onClick={(e) => {
            e.preventDefault();
            isLast ? onAdd() : onDelete();
          }}
        >
          {/* Icon */}
          <SidebarIcon
            defaultIcon={isLast ? Plus : Trash2}
            isExpandable={false}
            type="icon"
            isSelected={undefined}
          />
        </Button>
      </div>
    </div>
  );
};

export default RecordParam;
