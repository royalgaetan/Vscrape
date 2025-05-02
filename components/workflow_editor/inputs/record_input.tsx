import { SidebarIcon } from "@/components/global/app_sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import DnDTextInput from "./dnd_text_input";
import { RecordArray } from "@/lib/workflow_editor/types/w_types";
import { generateHexRandomString } from "@/lib/numbers_utils";

const RecordInput = ({
  initialRecords,
  onChange,
}: {
  initialRecords: RecordArray;
  onChange?: (newRecords: RecordArray) => void;
}) => {
  const [localRecords, setLocalRecords] = useState<RecordArray>(initialRecords);

  const saveChanges = (
    newRecord: {
      key: string;
      value: any;
    },
    index: number
  ) => {
    const updated = [...localRecords];
    updated[index] = newRecord;
    setLocalRecords(updated);
    onChange && onChange(updated);
  };

  useEffect(() => {
    onChange && onChange(localRecords);
  }, [localRecords]);

  return (
    <div className="flex flex-col">
      {localRecords.map((record, idx) => {
        return (
          <SingleRecordRow
            initialRecordKey={record.key}
            initialRecordValue={record.value}
            onBlur={(newRecord) => {
              saveChanges(newRecord, idx);
            }}
            isLast={localRecords.length === idx + 1}
            key={generateHexRandomString()}
            onAdd={() =>
              setLocalRecords([...localRecords, { key: "", value: "" }])
            }
            onDelete={() => {
              setLocalRecords((prev) => prev.filter((r, id) => id !== idx));
            }}
          />
        );
      })}
    </div>
  );
};

export default RecordInput;

type SingleRecordRowProps = {
  onChange?: (recordValue: { key: string; value: any }) => void;
  onBlur: (recordValue: { key: string; value: any }) => void;
  onDelete: () => void;
  onAdd: () => void;
  isLast: boolean;
  initialRecordKey: string;
  initialRecordValue: string;
};

const SingleRecordRow = ({
  onChange,
  onDelete,
  onAdd,
  onBlur,
  isLast,
  initialRecordKey,
  initialRecordValue,
}: SingleRecordRowProps) => {
  const [recordkey, setRecordkey] = useState<string>(initialRecordKey);
  const [recordValue, setRecordValue] = useState<string>(initialRecordValue);

  return (
    <div className="flex flex-1 gap-2 group/recordItem h-7 mt-1 mb-4 [--dndInputWidth:6.5rem]">
      <DnDTextInput
        key={"name"}
        placeholder={"Name..."}
        className="min-w-[var(--dndInputWidth)] max-w-[var(--dndInputWidth)]"
        inputType="text"
        inputValue={recordkey}
        onBlur={(text) => {
          if (!text) return;
          onBlur && onBlur({ key: text, value: recordValue });
        }}
        onElementDropped={(text) => {
          if (!text || text === recordkey) return;
          setRecordkey(text);
          onBlur && onBlur({ key: text, value: recordValue });
        }}
        onTextChange={(text) => {
          if (!text) return;
          setRecordkey(text);
        }}
      />
      <DnDTextInput
        key={"value"}
        placeholder={"Value..."}
        inputType="text"
        className="min-w-[var(--dndInputWidth)] max-w-[var(--dndInputWidth)]"
        inputValue={recordValue}
        onBlur={(text) => {
          if (!text) return;
          onBlur && onBlur({ key: recordkey, value: text });
        }}
        onElementDropped={(text) => {
          if (!text || text === recordValue) return;
          setRecordValue(text);
          onBlur && onBlur({ key: recordkey, value: text });
        }}
        onTextChange={(text) => {
          if (!text) return;
          setRecordValue(text);
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
