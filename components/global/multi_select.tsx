import React, { CSSProperties, useState } from "react";
import { CheckIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { SettingItemSelectDataType } from "@/app/(protected)/_settings/_components/settings_item_select";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

const MultiSelect = ({
  data,
  handleSelect,
  selectedValues = [],
  triggerClassName,
  label,
  popoverAlignment,
  popoverSide,
  popoverClassName,
  selectionMode = "multi",
}: {
  data: SettingItemSelectDataType;
  selectionMode?: "single" | "multi";
  handleSelect: (value: string) => void;
  selectedValues?: string[];
  label: string;
  triggerClassName?: string;
  popoverClassName?: string;
  popoverAlignment?: "end" | "center" | "start";
  popoverSide?: "top" | "right" | "bottom" | "left";
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          variant="outline"
          role="button"
          aria-expanded={open}
          className={cn(
            "h-8 w-44 truncate pl-2 pr-1 flex flex-1 gap-1",
            triggerClassName
          )}
        >
          <div className="font-normal w-full text-start truncate">{label}</div>
          <div className="">
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-64 truncate p-0", popoverClassName)}
        side={popoverSide}
        align={popoverAlignment}
      >
        <Command>
          <CommandInput className="px-2" />
          <Separator />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {Object.entries(data).map(([groupName, options], idx) => {
              return (
                <CommandGroup key={groupName} heading={groupName}>
                  {options.map((option) => {
                    const Icon = option.icon;
                    return (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(value) => {
                          // If selection Mode is "Single": close the popover after item selected
                          handleSelect(value);
                          if (selectionMode === "single") {
                            setOpen(false);
                          }
                        }}
                        className="flex items-center justify-between"
                      >
                        {Icon && (
                          <Icon
                            className={cn(
                              "mr-0 size-3 stroke-[1.8px]",
                              option.iconClassName
                            )}
                            fill={option.iconColorHex}
                          />
                        )}
                        <span className="truncate w-56 flex-1 justify-start">
                          {option.label}
                        </span>
                        {selectedValues.includes(option.value) && (
                          <CheckIcon className="h-4 w-4" />
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelect;
