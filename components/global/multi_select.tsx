import React, { useState } from "react";
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
import SimpleTooltip, { TooltipAlign, TooltipSide } from "./simple_tooltip";

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
  isTriggerDisabled,
  itemTooltipClassname,
  dismissPopoverOnItemClick,
}: {
  data: SettingItemSelectDataType;
  selectionMode?: "single" | "multi";
  handleSelect: (value: string) => void;
  selectedValues?: string[];
  label: string;
  triggerClassName?: string;
  isTriggerDisabled?: boolean;
  dismissPopoverOnItemClick?: boolean;
  popoverClassName?: string;
  popoverAlignment?: "end" | "center" | "start";
  popoverSide?: "top" | "right" | "bottom" | "left";
  itemTooltipClassname?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger disabled={isTriggerDisabled}>
        <Button
          disabled={isTriggerDisabled}
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
        className={cn("w-64 truncate p-0 shadow-lg", popoverClassName)}
        side={popoverSide}
        align={popoverAlignment}
      >
        <Command defaultValue={selectedValues[0]}>
          <CommandInput className="px-2" />
          <Separator />
          <CommandList>
            <CommandEmpty>
              <div className="text-muted-foreground text-xs font-semibold">
                No results found.
              </div>
            </CommandEmpty>
            {Object.entries(data).map(([groupName, options]) => {
              return (
                <CommandGroup key={groupName} heading={groupName}>
                  {options.map((option) => {
                    const Icon = option.icon;
                    return (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(value) => {
                          handleSelect(value);

                          // If selection Mode is "Single": close the popover after item selected
                          if (selectionMode === "single") {
                            setOpen(false);
                          }
                        }}
                        className="flex flex-1 w-full items-center justify-between cursor-pointer data-[selected=true]:bg-accent/50"
                      >
                        <TooltipWrapper
                          tooltipClassName={itemTooltipClassname}
                          tooltip={option.tooltipContent}
                          tooltipAlign={option.tooltipAlign}
                          tooltipSide={option.tooltipSide}
                        >
                          <div className="flex flex-1 w-full justify-between gap-2">
                            <div>
                              {Icon && (
                                <Icon
                                  className={cn(
                                    "mr-0 size-3 stroke-[1.8px]",
                                    option.iconClassName
                                  )}
                                  fill={option.iconColorHex}
                                />
                              )}
                            </div>
                            <div className="text-xs truncate justify-start text-left flex flex-1">
                              {option.label}
                            </div>
                            <div className="">
                              {selectedValues.includes(option.value) && (
                                <CheckIcon className="h-4 w-4" />
                              )}
                            </div>
                          </div>
                        </TooltipWrapper>
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

const TooltipWrapper = ({
  children,
  tooltip,
  tooltipAlign,
  tooltipSide,
  tooltipClassName,
}: {
  children: React.ReactNode;
  tooltip?: string;
  tooltipAlign?: TooltipAlign;
  tooltipSide?: TooltipSide;
  tooltipClassName?: string;
}) => {
  if (tooltip) {
    return (
      <SimpleTooltip
        className={tooltipClassName}
        align={tooltipAlign}
        side={tooltipSide}
        tooltipText={tooltip}
        enableAsChild={false}
      >
        {children}
      </SimpleTooltip>
    );
  } else {
    return children;
  }
};
