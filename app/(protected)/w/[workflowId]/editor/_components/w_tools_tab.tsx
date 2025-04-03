import SettingItemSearchBar from "@/app/(protected)/_settings/_components/settings_item_searchbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  workflowEditorSections,
  workflowEditorToolItems,
} from "@/lib/constants";
import { isSearchTermFound } from "@/lib/string_utils";
import { WorkflowEditorToolItem } from "@/lib/types";
import { Coins } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { useWorkflowEditor } from "@/hooks/useWorkflowEditor";

const WToolsTab = () => {
  const [searchContent, setSearchContent] = useState("");

  const filteredWorkflowEditorToolItems = workflowEditorToolItems.filter(
    (item) => {
      return isSearchTermFound({
        text: item.label,
        keySearchTerm: searchContent,
      });
    }
  );

  return (
    <div className="h-px w-full relative">
      <Accordion
        type="multiple"
        className="pl-3 pr-4 pt-0 w-full"
        defaultValue={Object.keys(workflowEditorSections)}
      >
        {/* Search Bar: explicitly for Tools */}

        <div className="flex w-full py-3 mb-0 sticky bg-white top-0 z-[11]">
          <SettingItemSearchBar
            className="w-full bg-neutral-200/40 border-none"
            autofocus
            inputType="search"
            placeholder="Search any tools..."
            onTextChange={(val) => {
              setSearchContent(val);
            }}
            onSubmit={(val) => {
              setSearchContent(val);
            }}
            onCancel={() => {
              setSearchContent("");
            }}
          />
        </div>

        {/* Items list */}
        {Object.entries(workflowEditorSections)
          .filter(
            (section) =>
              filteredWorkflowEditorToolItems.filter(
                (item) => item.sectionName === section[0]
              ).length > 0
          )
          .map(([sectionName, sectionValues]) => {
            return (
              <AccordionItem
                key={sectionName}
                value={sectionName}
                className="border-none"
              >
                <AccordionTrigger className="font-semibold pt-2 pb-3 pl-1 text-sm text-neutral-500 hover:no-underline">
                  {sectionName}
                </AccordionTrigger>
                <AccordionContent className="grid grid-cols-2 gap-2">
                  {filteredWorkflowEditorToolItems
                    .filter((item) => item.sectionName === sectionName)
                    .map((item) => {
                      return (
                        <ToolItemLine
                          key={item.label}
                          item={item}
                          iconColor={sectionValues.iconColor}
                        />
                      );
                    })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
      </Accordion>
    </div>
  );
};

export default WToolsTab;

const ToolItemLine = ({
  item,
  iconColor,
}: {
  item: WorkflowEditorToolItem;
  iconColor: string;
}) => {
  const { toggleOptionbar, isOptionbarOpen, optionbarItem } =
    useWorkflowEditor();
  const Icon = item.icon;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          asChild
          onClick={() => {
            if (isOptionbarOpen && optionbarItem === item) {
              toggleOptionbar(false);
            } else {
              toggleOptionbar(true, { iconColor: iconColor, ...item });
            }
          }}
        >
          <div className="rounded-md select-none col-span-1 px-3 h-8 flex gap-2 justify-start items-center bg-neutral-100 hover:bg-neutral-200/80 cursor-pointer transition-all duration-100">
            {/* Icon */}
            <div className="size-4">
              {Icon && <Icon className={"size-4"} stroke={iconColor} />}
              {item.logoPath && (
                <div className="relative h-4 w-4 mb-2">
                  <Image
                    src={item.logoPath}
                    alt={`${item.label} logo`}
                    className="select-none object-contain"
                    fill
                  />
                </div>
              )}
            </div>

            {/* Label */}
            <div className="truncate text-xs text-neutral-600">
              {item.label}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="flex flex-col gap-1 bg-neutral-700/95 ml-2  min-w-fit max-w-[12vw] px-2 py-2">
          <div className="flex flex-1 gap-2 items-center justify-between">
            <p className="text-white text-xs font-semibold">{item.label}</p>
            <Badge className="h-full align-top bg-transparent text-xs cursor-pointer hover:bg-neutral-200/20 border border-neutral-300 flex items-center">
              <Coins className="stroke-neutral-200 mr-1 size-3" />
              <div className="scale-90 text-xs text-neutral-200">
                {item.creditCost}
              </div>
            </Badge>
          </div>
          {item.tooltip && (
            <div className="flex flex-col gap-2 mt-1 mb-1">
              <Separator className="opacity-60" />
              <p className="text-neutral-300 text-xs">{item.tooltip}</p>
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
