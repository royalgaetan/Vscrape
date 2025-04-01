import SettingItemSearchBar from "@/app/(protected)/_settings/_components/settings_item_searchbar";
import { DamIcon, Eraser, Image, SparklesIcon, Video } from "lucide-react";
import React, { useState } from "react";

const WToolsTab = () => {
  const [searchContent, setSearchContent] = useState("");
  return (
    <div className="h-px w-full">
      {/* Search Bar: explicitly for Tools */}
      <div className="flex w-full px-3 mt-3 ">
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

      <div className="pl-3 pr-2 mt-2 w-full ">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-md col-span-1 h-12 flex justify-center items-center bg-neutral-100 hover:bg-neutral-200/80 cursor-pointer transition-all duration-100">
            <DamIcon className="stroke-neutral-700" />
          </div>
          <div className="rounded-md col-span-1 h-12 flex justify-center items-center bg-neutral-100 hover:bg-neutral-200/80 cursor-pointer transition-all duration-100">
            <Eraser className="stroke-neutral-700" />
          </div>
          <div className="rounded-md col-span-1 h-12 flex justify-center items-center bg-neutral-100 hover:bg-neutral-200/80 cursor-pointer transition-all duration-100">
            <Image className="stroke-neutral-700" />
          </div>
          <div className="rounded-md col-span-1 h-12 flex justify-center items-center bg-neutral-100 hover:bg-neutral-200/80 cursor-pointer transition-all duration-100">
            <Video className="stroke-neutral-700" />
          </div>
          <div className="rounded-md col-span-1 h-12 flex justify-center items-center bg-neutral-100 hover:bg-neutral-200/80 cursor-pointer transition-all duration-100">
            <SparklesIcon className="stroke-neutral-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WToolsTab;
