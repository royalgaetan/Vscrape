import React, { useState } from "react";
import { CheckIcon, ChevronDown, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
}: {
  data: SettingItemSelectDataType;
  handleSelect: (value: string) => void;
  selectedValues?: string[];
  label: string;
  triggerClassName?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "h-8 w-44 truncate pl-2 pr-1 flex gap-1",
            triggerClassName
          )}
        >
          <div className="flex flex-1 font-normal">{label}</div>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 truncate p-0">
        <Command>
          <CommandInput className="px-2" />
          <Separator />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {Object.entries(data).map(([groupName, options], idx) => {
              return (
                <>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(value) => handleSelect(value)}
                        className="flex items-center justify-between"
                      >
                        <span className="truncate w-56">{option.label}</span>
                        {selectedValues.includes(option.value) && (
                          <CheckIcon className="h-4 w-4" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelect;
