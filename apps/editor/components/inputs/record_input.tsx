import {
  SidebarIcon,
  Button,
  cn,
  generateHexRandomString,
  toStringSafe,
} from "@vscrape/ui";
import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import DnDTextInput from "./dnd_text_input";
import { RecordArray } from "@vscrape/engine/src";

const RecordInput = ({
  initialRecords,
  onChange,
  hasError,
  nodeId,
  itemId,
}: {
  hasError?: boolean;
  initialRecords: RecordArray;
  onChange?: (newRecords: RecordArray) => void;

  nodeId?: string;
  itemId?: string;
}) => {
  const [localRecords, setLocalRecords] = useState<RecordArray>(initialRecords);

  return (
    <div
      className={cn(
        "flex flex-col",
        hasError &&
          "border-destructive/70 rounded-sm ring-2 ring-offset-2 ring-destructive/60 transition-all duration-300"
      )}
      role="button"
      tabIndex={1}
      // onMouseLeave={() => onChange && onChange(localRecords)}
    >
      {localRecords.map((record, idx) => {
        return (
          <SingleRecordRow
            initialRecordKey={record.key}
            initialRecordValue={record.value}
            nodeId={nodeId}
            itemId={itemId}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onChange && onChange([...localRecords]);
              }
            }}
            onSaveKey={(newRecordKey) => {
              localRecords[idx].key = newRecordKey;
            }}
            onSaveValue={(newRecordValue) => {
              localRecords[idx].value = newRecordValue;
            }}
            isLast={localRecords.length === idx + 1}
            key={generateHexRandomString()}
            onAdd={() => {
              let updArr = [...localRecords, { key: "", value: "" }];
              setLocalRecords(updArr);
              onChange && onChange(updArr);
            }}
            onDelete={() => {
              let updArr = localRecords.filter((r, id) => id !== idx);
              setLocalRecords(updArr);
              onChange && onChange(updArr);
            }}
          />
        );
      })}
    </div>
  );
};

export default RecordInput;

type SingleRecordRowProps = {
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onSaveKey: (key: any) => void;
  onSaveValue: (key: any) => void;
  onDelete: () => void;
  onAdd: () => void;
  isLast: boolean;
  initialRecordKey: any;
  initialRecordValue: any;

  nodeId?: string;
  itemId?: string;
};

const SingleRecordRow = ({
  onKeyDown,
  onDelete,
  onAdd,
  onSaveKey,
  onSaveValue,
  isLast,
  initialRecordKey,
  initialRecordValue,

  nodeId,
  itemId,
}: SingleRecordRowProps) => {
  const [recordkey, setRecordkey] = useState<string>(initialRecordKey);
  const [recordValue, setRecordValue] = useState<string>(initialRecordValue);

  return (
    <div
      className="flex flex-1 gap-2 group/recordItem h-7 mt-1 mb-2 [--dndInputWidth:6.5rem]"
      role="button"
      tabIndex={1}
    >
      <DnDTextInput
        key={"name"}
        placeholder={"Name..."}
        className="min-w-[var(--dndInputWidth)] max-w-[var(--dndInputWidth)]"
        inputType="text"
        nodeId={nodeId}
        itemId={itemId}
        inputValue={recordkey}
        onKeyDown={onKeyDown}
        // onBlur={(text) => {
        //   if (!text) return;
        //   onBlur && onBlur({ key: text, value: recordValue });
        // }}
        onElementDropped={(val) => {
          const text = toStringSafe(val);
          setRecordkey(text);
          onSaveKey(text);
        }}
        onTextChange={(val) => {
          const text = toStringSafe(val);
          setRecordkey(text);
          onSaveKey(text);
        }}
      />

      <DnDTextInput
        key={"value"}
        placeholder={"Value..."}
        inputType="text"
        nodeId={nodeId}
        itemId={itemId}
        className="min-w-[var(--dndInputWidth)] max-w-[var(--dndInputWidth)]"
        inputValue={recordValue}
        onKeyDown={onKeyDown}
        // onBlur={(text) => {
        //   if (!text) return;
        //   onBlur && onBlur({ key: recordkey, value: text });
        // }}
        onElementDropped={(val) => {
          const text = toStringSafe(val);
          setRecordValue(text);
          onSaveValue(text);
        }}
        onTextChange={(val) => {
          const text = toStringSafe(val);
          setRecordValue(text);
          onSaveValue(text);
        }}
      />

      <div className="!w-8 h-[1.73rem]">
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
