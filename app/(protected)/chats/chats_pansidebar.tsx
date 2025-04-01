import React, { useState } from "react";
import SettingItemSearchBar from "../_settings/_components/settings_item_searchbar";
import { allChats } from "@/lib/fake_data";
import { MessageCircle, Pen, Plus, Trash2Icon } from "lucide-react";
import { SidebarIcon } from "@/components/global/app_sidebar";
import { Button } from "@/components/ui/button";
import { ChatReply } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { redirect } from "next/navigation";
import { usePanSidebar } from "@/hooks/usePanSidebar";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter, removeDiacritics } from "@/lib/string_utils";

export type ChatItemType = {
  chatId: string;
  chatTitle: string;
  chatHistory: ChatReply[];
  lastMessageDate: Date;
};

const ChatPanSidebar = () => {
  const { setOpenPanSidebar } = usePanSidebar();
  const [searchContent, setSearchContent] = useState("");

  const filteredItems = allChats
    .filter((chat) => {
      return (
        // Filter Chats based Search Term
        removeDiacritics(
          [
            chat.chatTitle,
            chat.chatHistory.map((c) => `${c.content?.toString()}`).join(". "),
          ]
            .join(". ")
            .replace(/\[object Object\]/g, "")
            .trim()
            .toLocaleLowerCase()
        ).includes(removeDiacritics(searchContent.toLocaleLowerCase()))
      );
    })
    .sort((a, b) => b.lastMessageDate.getTime() - a.lastMessageDate.getTime());

  return (
    <div className="w-full h-full overflow-y-clip bg-white flex flex-col space-y-2 pt-7">
      {/* Header */}
      <div className="pr-5 bg-white flex justify-between">
        <h2 className="text-2xl font-semibold text-[#333] px-5 mb-2">Chats</h2>

        {/* Start New Chat */}
        <Button
          variant={"ghost"}
          className={cn(
            "flex w-8 transition-all duration-300 h-8 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm"
          )}
          onClick={(e) => {
            e.preventDefault();
            setOpenPanSidebar(false, "chats");
            redirect("/chats");
          }}
        >
          {/* Icon */}
          <SidebarIcon
            defaultIcon={Plus}
            iconStrokeWidth={"2.9px"}
            isExpandable={false}
            type="icon"
            isSelected={undefined}
          />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="w-full px-5">
        <SettingItemSearchBar
          className="w-full bg-neutral-200/40 border-none"
          autofocus
          // inputRef={searchConnectionRef}
          inputType="search"
          placeholder="Search or Start a new chat..."
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

      {/* Chat Content */}
      <div className="h-max w-full overflow-x-clip overflow-y-auto pb-5">
        {filteredItems.length === 0 ? (
          <div className=" text-muted-foreground text-xs font-semibold flex flex-1 justify-center items-center h-44">
            No chat found.
          </div> // Display "Not found" if no matches are found
        ) : (
          filteredItems.map((chat) => {
            return <ChatItem key={chat.chatTitle} item={chat} />;
          })
        )}
      </div>
    </div>
  );
};

export default ChatPanSidebar;

const ChatItem = ({ item }: { item: ChatItemType }) => {
  const { setOpenPanSidebar } = usePanSidebar();

  return (
    <button
      onClick={() => {
        // Redirect to Chat Single Page
        setOpenPanSidebar(false, "chats");
        redirect(`/c/${item.chatId}`);
      }}
      className="group/chatItem w-full h-12 my-1 px-5 py-3 hover:bg-neutral-200/40  bg-white cursor-pointer flex justify-start items-center transition-all duration-200"
    >
      {/* Icon */}
      <div className="w-8 mr-2 pt-1 flex justify-center align-top  group-hover/chatItem:opacity-90">
        <MessageCircle className="size-5 stroke-primary" />
      </div>

      {/* Title + Subtitle */}
      <div className="w-full flex flex-1 mr-0">
        <div className="flex flex-col w-full justify-start items-start group-hover/chatItem:opacity-90">
          <h6 className="text-neutral-700 text-xs font-normal line-clamp-1 text-start">
            {item.chatTitle}
          </h6>
          <div className="flex flex-1">
            <p className="-ml-1 text-xs scale-90 font-normal text-muted-foreground/70">
              {capitalizeFirstLetter(
                formatDistanceToNow(item.lastMessageDate, { addSuffix: true })
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons: CTA */}
      <div className=" flex w-fit">
        {/* Rename */}
        <Button
          variant={"ghost"}
          className={cn(
            "hidden group-hover/chatItem:flex w-8 transition-all duration-300 h-8 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm"
          )}
        >
          {/* Icon */}
          <SidebarIcon
            defaultIcon={Pen}
            isExpandable={false}
            type="icon"
            isSelected={undefined}
          />
        </Button>

        {/* Delete Permanently */}
        <div
          className={cn(
            "hidden group-hover/chatItem:flex w-8 transition-all duration-300 h-8 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm"
          )}
        >
          {/* Icon */}
          <SidebarIcon
            defaultIcon={Trash2Icon}
            isExpandable={false}
            type="icon"
            isSelected={undefined}
          />
        </div>
      </div>
    </button>
  );
};
