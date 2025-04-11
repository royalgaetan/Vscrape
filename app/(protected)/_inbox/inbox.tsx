import React, { useEffect, useState } from "react";
import SettingItemSearchBar from "../_settings/_components/settings_item_searchbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  isAccordionElementOpen,
  scrollToEl,
  waitForElement,
} from "@/lib/dom_utils";
import { SidebarIcon } from "@/components/global/app_sidebar";
import {
  ArchiveIcon,
  ArchiveRestore,
  CalendarClockIcon,
  Check,
  CheckCheck,
  InboxIcon,
  ListFilter,
  Mail,
  MailIcon,
} from "lucide-react";
import { inboxItems } from "@/lib/fake_data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow, isToday } from "date-fns";
import { usePanSidebar } from "@/hooks/usePanSidebar";
import { capitalizeFirstLetter, isSearchTermFound } from "@/lib/string_utils";
import { cn } from "@/lib/utils";

export const inboxFilterOptions = {
  default: { icon: InboxIcon, title: "Inbox" },
  unread: { icon: MailIcon, title: "Unread" },
  archived: { icon: ArchiveIcon, title: "Archived" },
  today: { icon: CalendarClockIcon, title: "Today's" },
} as const;

export type InboxItemType = {
  date: Date;
  avatar: string;
  subjectLine: string;
  content: string[];
  actions: ("view" | "accept" | "refuse" | "retry")[];
  isRead: boolean;
  isArchived: boolean;
};

const Inbox = () => {
  const { isPanSidebarOpen, panSidebarOptions, panSidebarType } =
    usePanSidebar();
  const [searchContent, setSearchContent] = useState("");
  const [inboxFilter, setInboxFilter] =
    useState<keyof typeof inboxFilterOptions>("default");

  useEffect(() => {
    const inboxListId = "inboxList";
    // Check for initial filters
    if (panSidebarType === "inbox" && panSidebarOptions?.filter) {
      setInboxFilter(panSidebarOptions?.filter);
    }

    // Check if there's a Scrollto Element needed
    // And Click the element
    if (panSidebarType === "inbox" && panSidebarOptions?.scrollToId) {
      waitForElement("id", panSidebarOptions?.scrollToId)
        .then(async (el) => {
          !isAccordionElementOpen(el.id) && el.click();
          scrollToEl({
            parentId: inboxListId,
            id: el.id,
            offsetTopMargin: 10,
          });
        })
        .catch((err) => {
          console.warn(err.message);
        });
    }

    return () => {};
  }, [
    isPanSidebarOpen,
    panSidebarOptions?.filter,
    panSidebarOptions?.scrollToId,
  ]);

  const filteredInboxItems = inboxItems
    .filter((item) => {
      // Default filter
      if (inboxFilter === "default") {
        return !item.isArchived;
      }
      // Unread Filter
      else if (inboxFilter === "unread") {
        return !item.isArchived && !item.isRead;
      }
      // Today Filter
      else if (inboxFilter === "today") {
        return isToday(item.date) && !item.isArchived;
      }
      // Archived Filter
      else if (inboxFilter === "archived") {
        return item.isArchived;
      }
      return !item.isArchived;
    })
    // Search Filter
    .filter((item) => {
      return isSearchTermFound({
        text: item.subjectLine.concat(item.content.join(".")),
        keySearchTerm: searchContent,
      });
    })
    .toSorted((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div
      className="w-full h-full bg-white flex flex-col space-y-2 overflow-x-clip overflow-y-auto pb-10"
      id="inboxList"
    >
      <div className="px-5 bg-white mt-7 flex justify-between">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-[#333]">
          {inboxFilterOptions[inboxFilter].title}{" "}
        </h2>

        {/* Filter Button */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant={"ghost"}
              className={cn(
                "flex w-8 transition-all duration-300 h-8 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm"
              )}
            >
              <div className="relative">
                {/* Filter Indicator */}
                {inboxFilter !== "default" && (
                  <div
                    className={cn(
                      "absolute bottom-0 right-0 rounded-full h-2 w-2",
                      inboxFilter === "unread" && "bg-green-500",
                      inboxFilter === "archived" && "bg-primary",
                      inboxFilter === "today" && "bg-orange-500"
                    )}
                  ></div>
                )}

                {/* Icon */}
                <SidebarIcon
                  defaultIcon={ListFilter}
                  isExpandable={false}
                  type="icon"
                  isSelected={undefined}
                />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
              Filter your inbox
            </DropdownMenuLabel>

            {Object.entries(inboxFilterOptions).map(([n, values]) => {
              const name = n as keyof typeof inboxFilterOptions;
              const Icon = values.icon;
              return (
                <DropdownMenuItem
                  key={name}
                  onClick={() => {
                    setInboxFilter(name);
                  }}
                >
                  <Icon className="stroke-neutral-600" />
                  <span className="text-neutral-600 text-xs flex-1">
                    {capitalizeFirstLetter(name)}
                  </span>
                  {name === inboxFilter && <Check />}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Search Bar */}
      <div className="w-full px-5 pt-2 pb-2 h-fit bg-white">
        <SettingItemSearchBar
          className="w-full bg-neutral-200/40 border-none"
          autofocus
          inputType="search"
          placeholder="Search inside your inbox..."
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

      {/* Inbox Content */}
      <div className="flex flex-col">
        {filteredInboxItems.length === 0 ? (
          <div className=" text-muted-foreground text-xs font-semibold flex justify-center items-center h-36">
            No item found.
          </div> // Display "Not found" if no matches are found
        ) : (
          filteredInboxItems.map((item, i) => {
            return <InboxItem key={`${i.toString()}`} item={item} />;
          })
        )}
      </div>
    </div>
  );
};

export default Inbox;

export const InboxItem = ({ item }: { item: InboxItemType }) => {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem
        value={item.subjectLine}
        className="group/inboxItem [data-state=open]:border-b-2 [data-state=open]:border-b-black border-none"
      >
        {/* SujectLine expandable */}
        <AccordionTrigger
          id={item.subjectLine}
          hideArrowIndicator
          className="hover:bg-neutral-200/40 h-12 px-5 py-2 mb-1 flex flex-1 gap-2 hover:no-underline"
        >
          <div className="relative">
            {/* Avatar */}
            <Avatar className="h-7 w-7 ml-1 cursor-pointer relative">
              <AvatarImage src={item.avatar} alt="Avatar" />
              <AvatarFallback className="bg-zinc-500 text-white">
                A
              </AvatarFallback>
            </Avatar>

            {/* Unread Indicator */}
            {!item.isRead && (
              <div
                className={cn(
                  "absolute bottom-0 right-0 rounded-full h-2 w-2 bg-orange-300 border-2 border-white"
                )}
              ></div>
            )}
          </div>

          {/* Subject line content + Date */}
          <div className="flex flex-1">
            <div className="flex flex-col text-xs items-start">
              <h6
                className={cn(
                  "font-normal text-[#333] line-clamp-1",
                  !item.isRead && "font-semibold"
                )}
              >
                {item.subjectLine}
              </h6>
              <div className="flex flex-1">
                <p className=" -ml-1 scale-90 font-normal text-muted-foreground/70">
                  {capitalizeFirstLetter(
                    formatDistanceToNow(item.date, { addSuffix: true })
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex">
            {/* Mark As Read  and Mark as Unread */}
            <Button
              variant={"ghost"}
              className={cn(
                "hidden group-hover/inboxItem:flex w-8 transition-all duration-300 h-8 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm"
              )}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {/* Icon */}
              <SidebarIcon
                defaultIcon={item.isRead ? Mail : CheckCheck}
                isExpandable={false}
                type="icon"
                isSelected={undefined}
              />
            </Button>

            {/* Archive and UnArchived */}
            <Button
              variant={"ghost"}
              className={cn(
                "hidden group-hover/inboxItem:flex w-8 transition-all duration-300 h-8 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm"
              )}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {/* Icon */}
              <SidebarIcon
                defaultIcon={item.isArchived ? ArchiveRestore : ArchiveIcon}
                isExpandable={false}
                type="icon"
                isSelected={undefined}
              />
            </Button>
          </div>
        </AccordionTrigger>

        {/* Content expanded */}
        <AccordionContent className="flex flex-col px-5 ">
          <div className="ml-6 pl-4 text-muted-foreground text-xs font-light border-l-[1px] border-b-black/20">
            {/* Paragraphs */}

            {item.content.map((paragraph, i) => (
              <p key={`${i.toString()}`} className="mb-3">
                {paragraph}
              </p>
            ))}

            {/* Buttons */}
            <div className="flex flex-wrap gap-2">
              {item.actions.length > 0 &&
                item.actions.map((action, i) => (
                  <Button
                    key={`${i.toString()}`}
                    variant={"outline"}
                    size={"xs"}
                  >
                    {capitalizeFirstLetter(action)}
                  </Button>
                ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
