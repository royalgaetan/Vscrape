import { TooltipAlign, TooltipSide } from "@/components/global/simple_tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

export type SettingItemSelectDataType = Record<
  string,
  {
    value: string;
    label: string;
    disabled?: boolean;
    icon?: LucideIcon;
    iconClassName?: string;
    iconColorHex?: string;
    tooltipContent?: string;
    tooltipSide?: TooltipSide;
    tooltipAlign?: TooltipAlign;
  }[]
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
                const Icon = opt.icon;
                return (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                  >
                    {Icon && (
                      <Icon
                        className={cn(
                          "mr-0 size-3 stroke-[1.8px]",
                          opt.iconClassName
                        )}
                      />
                    )}
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
