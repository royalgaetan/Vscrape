import SettingItemSearchBar from "@/app/(protected)/_settings/_components/settings_item_searchbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  workflowEditorSections,
  workflowEditorToolItems,
} from "@/lib/constants";
import { isSearchTermFound } from "@/lib/string_utils";
import { WorkflowEditorToolItem } from "@/lib/types";
import React, { useState } from "react";
import ToolItemLine from "./w_tools_tab_item";

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
