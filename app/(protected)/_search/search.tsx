import React, { useEffect, useState } from "react";

import {
  moreButtonPaths,
  SidebarIcon,
  sidebarPaths,
} from "@/components/global/app_sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, capitalizeFirstLetter, isSearchTermFound } from "@/lib/utils";
import {
  Settings,
  Check,
  ListFilter,
  Filter,
  Inbox,
  Workflow,
  Zap,
  ArrowRight,
  LucideChevronRight,
} from "lucide-react";
import { useAppDialog } from "@/hooks/useAppDialog";
import { useAuth } from "@/hooks/useAuth";
import { redirect, usePathname } from "next/navigation";
import SettingItemSearchBar from "../_settings/_components/settings_item_searchbar";
import { sidebarPathType } from "@/lib/types";
import {
  settingsDialogItemType,
  settingSidebarPaths,
} from "../_settings/settings_dialog";
import { InboxItemType } from "../_inbox/inbox";
import { inboxItems } from "@/lib/fake_data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { moreButtonPathType } from "../_more/more_dialog";
import { usePanSidebar } from "@/hooks/usePanSidebar";

export const searchFilterOptions = {
  Default: { icon: Filter, title: "No filter" },
  Workflows: { icon: Workflow, title: "Workflows" },
  Actions: { icon: Zap, title: "Actions" },
  Inbox: { icon: Inbox, title: "Inbox" },
  Settings: { icon: Settings, title: "Settings" },
} as const;

const SearchModal = () => {
  const [searchFilter, setSearchFilter] =
    useState<keyof typeof searchFilterOptions>("Default");
  const {
    isSearchDialogOpen,
    setSearchDialogSearchContent,
    searchDialogSearchContent,
    setOpenSearchDialog,
  } = useAppDialog();
  const { isAuthenticated } = useAuth();
  const pathName = usePathname();

  useEffect(() => {
    // Listen to "CRTL or CMD + k" key press
    const down = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        ["INPUT", "TEXTAREA"].includes(target.tagName) ||
        target.isContentEditable;
      if (isInput) return;

      if (isAuthenticated && pathName != "/")
        if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpenSearchDialog(true);
        }
    };

    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
  }, []);

  const getAllSearchableItems = () => {
    const searchableItems: {
      Actions: ((sidebarPathType | moreButtonPathType) & {
        filter: "Actions";
      })[];
      Workflows: (settingsDialogItemType & { filter: "Workflows" })[];
      Settings: (settingsDialogItemType & { filter: "Settings" })[];
      Inbox: (InboxItemType & { filter: "Inbox" })[];
    } = {
      Actions: [],
      Workflows: [],
      Inbox: [],
      Settings: [],
    };

    // Get All Actions (aka Sidebar Items)
    searchableItems.Actions = sidebarPaths
      .filter((item) => item.name !== "Search" && item.name !== "More")
      .map((item) => Object.assign(item, { filter: "Actions" as const }));

    searchableItems.Actions.push(
      ...moreButtonPaths.map((item) =>
        Object.assign(item, { filter: "Actions" as const })
      )
    );

    // Get All Settings Items
    searchableItems.Settings = settingSidebarPaths.map((item) =>
      Object.assign(item, { filter: "Settings" as const })
    );

    // Get All Workflows Items
    // searchableItems.Workflows = settingSidebarPaths.map((item) =>
    //   Object.assign(item, { filter: "Workflows" as const })
    // );

    // Get All Inbox Items
    searchableItems.Inbox = inboxItems.map((item) =>
      Object.assign(item, { filter: "Inbox" as const })
    );

    // Sort all items arrays
    searchableItems.Actions.sort((a, b) => a.name.localeCompare(b.name));
    searchableItems.Settings.sort((a, b) => a.name.localeCompare(b.name));
    searchableItems.Inbox.sort((a, b) => b.date.getTime() - a.date.getTime());

    return Object.values(searchableItems).flat();
  };

  const filteredSearchableItems = getAllSearchableItems()
    .filter((item) => {
      if (searchFilter === "Default") {
        return item;
      } else {
        return item.filter === searchFilter;
      }
    })
    // Search Filter
    .filter((item) => {
      return isSearchTermFound({
        text:
          item.filter === "Inbox"
            ? item.subjectLine.concat(item.content.join("."))
            : item.name,
        keySearchTerm: searchDialogSearchContent,
      });
    });

  return (
    <Dialog
      open={isSearchDialogOpen}
      onOpenChange={(isOpen) => {
        setOpenSearchDialog(isOpen);
      }}
    >
      <DialogContent
        hideCloseButton={true}
        className="min-w-[50vw] min-h-[80vh] h-[80vh] p-0 flex flex-col gap-0"
      >
        <DialogTitle className="flex h-fit py-0 pl-1 pr-3 border-b mb-0 ">
          {/* Search Bar */}
          <div className="w-full py-1 bg-tranparent">
            <SettingItemSearchBar
              className="w-full bg-transparent border-none text-xl"
              autofocus
              inputType="search"
              placeholder="Search workflows, actions, settings, and more..."
              onTextChange={(val) => {
                setSearchDialogSearchContent(val);
              }}
              onSubmit={(val) => {
                setSearchDialogSearchContent(val);
              }}
              onCancel={() => {
                setSearchDialogSearchContent("");
              }}
            />
          </div>

          {/* Filter Button */}
          <DropdownMenu>
            <DropdownMenuTrigger className="w-fit">
              <Button
                variant={"ghost"}
                className={cn(
                  "flex w-8 transition-all duration-300 h-8 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm"
                )}
              >
                <div className="relative">
                  {/* Filter Indicator */}
                  {searchFilter !== "Default" && (
                    <div
                      className={cn(
                        "absolute bottom-0 right-0 rounded-full h-2 w-2",
                        searchFilter === "Workflows" && "bg-orange-300",
                        searchFilter === "Actions" && "bg-primary",
                        searchFilter === "Inbox" && "bg-emerald-500",
                        searchFilter === "Settings" && "bg-red-600"
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
                Filter search results
              </DropdownMenuLabel>

              {Object.entries(searchFilterOptions).map(([n, values]) => {
                const name = n as keyof typeof searchFilterOptions;
                const Icon = values.icon;
                return (
                  <DropdownMenuItem
                    key={name}
                    onClick={() => {
                      setSearchFilter(name);
                    }}
                  >
                    <Icon className="stroke-neutral-600" />
                    <span className="text-neutral-600 text-xs flex-1">
                      {capitalizeFirstLetter(name)}
                    </span>
                    {name === searchFilter && <Check />}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </DialogTitle>

        {/* Search Results Content */}
        <div className="pt-3 mb-7 h-full overflow-y-auto items-start">
          {filteredSearchableItems.length === 0 &&
          searchFilter === "Default" ? (
            // Display "Not found" if no matches are found in "Default" mode
            <div className=" text-muted-foreground text-xs font-semibold flex justify-center items-center h-36">
              No item found.
            </div>
          ) : (
            <div>
              {Object.keys(searchFilterOptions)
                // Display all search filters as Sections excepted 'Default'
                .filter((key) => key !== "Default")
                .map((key) => {
                  let sectionItems = filteredSearchableItems.filter(
                    (i) => i.filter === key
                  );

                  // Pick only 10 items per sections if search is disabled and current filter is "Default"
                  if (
                    searchDialogSearchContent.length === 0 &&
                    key !== "Default"
                  ) {
                    sectionItems = sectionItems.slice(0, 10);
                  }

                  if (sectionItems.length === 0 && searchFilter !== key) {
                    return <div key={`${key}`}></div>;
                  }

                  return (
                    <div key={`${key}`} className="mb-6 px-0">
                      {/* Header */}
                      <h5 className="mb-2 text-sm px-6 font-medium text-sidebar-foreground/70">
                        {key}
                      </h5>

                      {/* Content */}
                      {sectionItems.length === 0 && searchFilter === key ? (
                        <div className=" text-muted-foreground text-xs font-semibold flex justify-center items-center h-36">
                          No item found.
                        </div>
                      ) : (
                        <div>
                          {sectionItems.map((item, idx) => {
                            // Action Items & Settings Items
                            if (
                              item.filter === "Actions" ||
                              item.filter === "Settings"
                            ) {
                              return (
                                <SearchableActionItem
                                  typeType={item.filter}
                                  item={item}
                                  key={`${idx.toString()}_${item.name}_${key}`}
                                />
                              );
                            }

                            // Inbox Items
                            else if (item.filter === "Inbox") {
                              return (
                                <SearchableInboxItem
                                  key={`${idx.toString()}_${
                                    item.subjectLine
                                  }_${key}`}
                                  item={item}
                                />
                              );
                            }

                            return (
                              <div key={`${idx.toString()}_other_${key}`}></div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;

export const SearchableActionItem = ({
  item,
  typeType,
}: {
  item: settingsDialogItemType | sidebarPathType | moreButtonPathType;
  typeType: "Actions" | "Settings";
}) => {
  const { setOpenSettingsDialog, setOpenMoreDialog, setOpenSearchDialog } =
    useAppDialog();
  const { setOpenPanSidebar } = usePanSidebar();
  const Icon = item.icon;
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        // If Item is a MoreButton item
        if (
          item.path === "support" ||
          item.path === "featureRequest" ||
          item.path === "report"
        ) {
          // Open More Dialog: with corresponding tab open
          setOpenMoreDialog(true, item.path);
        }

        // If Item is Inbox or Trash
        else if (item.name === "Trash" || item.name === "Inbox") {
          // Open Pan Sidebar: with either Trash or Inbox open
          setOpenPanSidebar(true, item.name === "Trash" ? "trash" : "inbox");
        }

        // If Item is a Settings Item or "Settings" itself
        else if (typeType === "Settings" || item.name === "Settings") {
          // Open Settings Dialogs and open the corresponding tab
          setOpenSettingsDialog(
            true,
            item.name === "Settings" ? "account" : item.path
          );
        }

        // If Item is a Sidebar item
        else if (typeType === "Actions") {
          // Redirect to corresponding Item page and remove current dialog
          setOpenPanSidebar(false, "inbox");
          setOpenSearchDialog(false);
          redirect(item.path);
        }

        // At the end: Close current Search Dialog
        setOpenSearchDialog(false);
      }}
      className="w-full flex flex-1 appearance-none bg-transparent border-none p-0 m-0 text-inherit font-inherit"
    >
      <div className="cursor-pointer group/searchable-action-item hover:bg-neutral-200/40 h-9 px-6 py-2 mb-1 flex flex-1 items-center gap-2 transition-all duration-300">
        {/* Icon */}
        <Icon className="size-5 text-muted-foreground" />

        {/* Title */}
        <div className="flex flex-1">
          <div className="hidden group-hover/searchable-action-item:flex">
            {typeType === "Actions" && (
              <span className="group-hover/searchable-action-item:text-primary/80 text-sm text-muted-foreground font-semibold flex items-center">
                Go to
                <LucideChevronRight className="translate-y-[1px] ml-1 mr-1 size-4 text-primary/80 stroke-[3px]" />
              </span>
            )}
          </div>
          <span
            className={cn(
              "text-sm",
              typeType === "Actions" &&
                "group-hover/searchable-action-item:font-semibold "
            )}
          >
            {item.name}
          </span>
        </div>

        {/* Arrow Indicator */}
        {typeType === "Settings" && (
          <div className="hidden group/cta group-hover/searchable-action-item:flex gap-1 px-3 py-1 items-center cursor-pointer bg-transparent hover:bg-primary/20 border-none rounded-lg">
            <div className="text-primary text-xs font-semibold">Go to</div>
            <ArrowRight className="size-4 stroke-primary stroke-2 group-hover/cta:translate-x-1 translate-x-0 translate-y-[0.8px]" />
          </div>
        )}
      </div>
    </button>
  );
};

export const SearchableInboxItem = ({
  item,
  className,
}: {
  item: InboxItemType;
  className?: string;
}) => {
  const { setOpenSearchDialog } = useAppDialog();
  const { setOpenPanSidebar } = usePanSidebar();

  return (
    <button
      onClick={() => {
        // If Item is an Archived Inbox Item
        if (item.isArchived) {
          // a. Open Inbox Pan Sidebar
          // b. Go to Archived filter
          // c. Scroll to Inbox element and Open it
          setOpenPanSidebar(true, "inbox", {
            filter: "archived",
            scrollToId: item.subjectLine,
          });
        }

        // If Item is an any Inbox item
        else {
          // a. Open Inbox Pan Sidebar
          // b. Scroll to Inbox element and Open it
          setOpenPanSidebar(true, "inbox", {
            filter: "default",
            scrollToId: item.subjectLine,
          });
        }

        // At the end: Close current Search Dialog
        setOpenSearchDialog(false);
      }}
      className="w-full flex flex-1 appearance-none bg-transparent border-none p-0 m-0 text-inherit font-inherit"
    >
      <div
        className={cn(
          "cursor-pointer group/searchable-action-item hover:bg-neutral-200/40 h-9 px-5 py-2 mb-1 flex flex-1 items-center gap-2 transition-all duration-300",
          className
        )}
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
                "font-normal text-[#333] line-clamp-1 text-start",
                !item.isRead && "font-semibold"
              )}
            >
              {item.subjectLine}
            </h6>
            <div className="flex flex-1">
              <p className=" -ml-1 scale-90 font-normal text-muted-foreground/70">
                {capitalizeFirstLetter(
                  formatDistanceToNow(item.date, {
                    addSuffix: true,
                  })
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};
