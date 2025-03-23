import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React from "react";

export type SettingItemSelectDataType = Record<
  string,
  { value: string; label: string; disabled?: boolean }[]
>;

const SettingItemSelect = ({
  onSelect,
  data,
  label,
  selectedItemValue,
  triggerClassName,
  contentClassName,
}: {
  label: string;
  triggerClassName?: string;
  contentClassName?: string;
  selectedItemValue: string;
  data: SettingItemSelectDataType;
  onSelect: (item: string) => void;
}) => {
  return (
    <Select
      value={selectedItemValue}
      onValueChange={(itemValue) => onSelect(itemValue)}
    >
      <SelectTrigger
        className={cn(
          "h-8 px-2 text-xs border border-gray-300 bg-background hover:bg-accent/30 hover:text-accent-foreground",
          triggerClassName
        )}
      >
        {label}
      </SelectTrigger>
      <SelectContent
        className={cn("h-fit max-h-80 max-w-fit", contentClassName)}
      >
        {Object.entries(data).map(([groupName, options], idx) => {
          return (
            <SelectGroup key={groupName}>
              {groupName !== "" && <SelectLabel>{groupName}</SelectLabel>}
              {options.map((opt) => {
                return (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                  >
                    {opt.label}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default SettingItemSelect;
