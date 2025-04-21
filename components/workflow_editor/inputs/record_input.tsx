import { SidebarIcon } from "@/components/global/app_sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import DnDTextInput from "./dnd_text_input";

type Props = {
  onKeyChange: (newKeyVal: string) => void;
  onValueChange: (newVal: any) => void;
  onDelete: () => void;
  onAdd: () => void;
  isLast: boolean;
  initialValue: { key: string; value: any };
};

const RecordInput = ({
  onKeyChange,
  onValueChange,
  onDelete,
  onAdd,
  isLast,
  initialValue,
}: Props) => {
  const [recordObj, setRecordObj] = useState<{ key: string; value: any }>(
    initialValue
  );

  useEffect(() => {
    setRecordObj(initialValue);
  }, [initialValue.key, initialValue.value]);

  return (
    <div className="flex flex-1 gap-2 group/recordItem h-7 mt-1 mb-4 [--dndInputWidth:6.5rem]">
      <DnDTextInput
        placeholder={"Name..."}
        className="min-w-[var(--dndInputWidth)] max-w-[var(--dndInputWidth)]"
        inputType="text"
        inputValue={recordObj.key}
        onTextChange={(text) => {
          const updatedObj = { key: text, value: recordObj.value };
          setRecordObj(updatedObj);
          onKeyChange(text);
        }}
      />
      <DnDTextInput
        placeholder={"Value..."}
        inputType="text"
        className="min-w-[var(--dndInputWidth)] max-w-[var(--dndInputWidth)]"
        inputValue={recordObj.value}
        onTextChange={(text) => {
          const updatedObj = { key: recordObj.key, value: text };
          setRecordObj(updatedObj);
          onValueChange(text);
        }}
      />
      <div className="w-8 h-[1.73rem]">
        <Button
          variant={"ghost"}
          className={cn(
            "hidden group-hover/recordItem:flex w-8 transition-all duration-300 h-[1.73rem] justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm"
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

export default RecordInput;
