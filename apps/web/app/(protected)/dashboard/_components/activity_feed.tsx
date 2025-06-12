import TextSeparator from "@/components/global/text_separator";
import { inboxItems } from "@/lib/fake_data";
import React from "react";
import { SearchableInboxItem } from "../../_search/search";

const ActivityFeed = () => {
  const filteredInboxItems = inboxItems
    .filter((item) => !item.isArchived && !item.isRead)
    .toSorted((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 15);

  return (
    <>
      <div className="mt-6 mb-0">
        <TextSeparator text="Activity" />
      </div>

      {filteredInboxItems.length === 0 ? (
        <div className=" text-muted-foreground text-xs font-semibold flex justify-center items-center h-72">
          No activity yet.
        </div>
      ) : (
        <div className="flex flex-1 h-min w-full relative">
          <div className="relative flex flex-col w-full h-full">
            {/* (top layer) */}
            <div className="absolute pointer-events-none top-0 z-30 bg-gradient-to-b from-white to-transparent h-7 w-full"></div>
            {/* <div className="absolute bottom-0 z-30 bg-gradient-to-t  from-white to-transparent h-10 w-full"></div> */}

            {/* (bottom layer) */}
            <div className="absolute inset-0 z-10 overflow-y-auto scrollbar-hide pt-4">
              {filteredInboxItems.map((item) => {
                return (
                  <SearchableInboxItem item={item} className="px-2 h-11" />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActivityFeed;
