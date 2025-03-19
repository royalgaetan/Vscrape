import React, { useState } from "react";
import SettingItemSearchBar from "../_settings/_components/settings_item_searchbar";
import { trashItems } from "@/lib/fake_data";
import { Trash2Icon, Undo2, Workflow } from "lucide-react";
import { SidebarIcon } from "@/components/global/app_sidebar";
import { Button } from "@/components/ui/button";
import { cn, getIconColor, removeDiacritics } from "@/lib/utils";

export type trashItemType = {
  title: string;
  subTitle: string;
};

const Trash = () => {
  const [searchContent, setSearchContent] = useState("");

  const filteredItems = trashItems.filter((item) => {
    return (
      // Filter based search term: 1.Title
      removeDiacritics(item.title.toLocaleLowerCase()).includes(
        removeDiacritics(searchContent.toLocaleLowerCase())
      ) ||
      // Filter based search term: 2.SubTitle
      removeDiacritics(item.subTitle.toLocaleLowerCase()).includes(
        removeDiacritics(searchContent.toLocaleLowerCase())
      )
    );
  });
  return (
    <div className="w-full h-full overflow-y-clip bg-white flex flex-col space-y-2 pt-7">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-[#333] px-5 mb-2">Trash</h2>

      {/* Search Bar */}
      <div className="w-full px-5">
        <SettingItemSearchBar
          className="w-full bg-neutral-200/40 border-none"
          autofocus
          // inputRef={searchConnectionRef}
          inputType="search"
          placeholder="Search inside your trash..."
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

      {/* Trash Content */}
      <div className="h-max w-full overflow-x-clip overflow-y-auto pb-5">
        {filteredItems.length === 0 ? (
          <div className=" text-muted-foreground text-xs font-semibold flex flex-1 justify-center items-center h-44">
            No item found.
          </div> // Display "Not found" if no matches are found
        ) : (
          filteredItems.map((item) => {
            return <TrashItem key={item.title} item={item} />;
          })
        )}
      </div>
    </div>
  );
};

export default Trash;

const TrashItem = ({ item }: { item: trashItemType }) => {
  return (
    <div className="group/trashItem w-full my-1 px-5 py-1 hover:bg-neutral-200/40  bg-white cursor-pointer flex justify-start items-start transition-all duration-200">
      {/* Icon */}
      <div className="w-8 mr-2 pt-1 flex justify-center align-top  group-hover/trashItem:opacity-90">
        <Workflow className="size-5 stroke-muted-foreground" />
      </div>

      {/* Title + Subtitle */}
      <div className="w-full flex flex-1 mr-0">
        <div className="flex flex-col w-full group-hover/trashItem:opacity-90">
          <h6 className="text-[#333] text-sm font-semibold line-clamp-1">
            {item.title}
          </h6>
          <p className="mt-[2px] text-xs text-muted-foreground line-clamp-1">
            {item.subTitle}
          </p>
        </div>
      </div>

      {/* Action Buttons: CTA */}
      <div className=" flex w-fit">
        {/* Restore */}
        <Button
          variant={"ghost"}
          className={cn(
            "hidden group-hover/trashItem:flex w-8 transition-all duration-300 h-8 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm"
          )}
        >
          {/* Icon */}
          <SidebarIcon
            defaultIcon={Undo2}
            isExpandable={false}
            type="icon"
            isSelected={undefined}
          />
        </Button>

        {/* Delete Permanently */}
        <Button
          variant={"ghost"}
          className={cn(
            "flex w-8 transition-all duration-300 h-8 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm"
          )}
        >
          {/* Icon */}
          <SidebarIcon
            defaultIcon={Trash2Icon}
            isExpandable={false}
            type="icon"
            isSelected={undefined}
          />
        </Button>
      </div>
    </div>
  );
};
