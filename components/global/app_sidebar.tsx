"use client";

import React, { useState } from "react";
import {
  Bug,
  ChevronDown,
  ChevronRight,
  Headset,
  HelpCircle,
  Home,
  Inbox,
  LayoutDashboard,
  LucideIcon,
  Plus,
  Rocket,
  Search,
  Settings,
  Shapes,
  Squircle,
  Terminal,
  Trash2,
  Workflow,
} from "lucide-react";
import LogoAndText from "@/app/(auth)/_components/logo_and_text";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Sidebar, SidebarContent } from "../ui/sidebar";
import { Button } from "../ui/button";
import { sidebarPathType } from "@/lib/types";
import { COLORS } from "@/lib/colors";
import { moreButtonPathType } from "@/app/(protected)/_more/more_dialog";
import { usePanSidebar } from "@/hooks/usePanSidebar";
import { panSidebarType } from "@/providers/panSidebarProvider";
import { useAppDialog } from "@/hooks/useAppDialog";
import Support from "@/app/(protected)/_more/support/support";
import FeatureRequest from "@/app/(protected)/_more/feature_request/feature_request";
import Report from "@/app/(protected)/_more/report/report";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { folders } from "@/lib/fake_data";

export const sidebarPaths: sidebarPathType[] = [
  { name: "Home", path: "/home", icon: Home, type: "main" },
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    type: "main",
  },
  { name: "Search", path: "", icon: Search, type: "main" },
  { name: "Inbox", path: "", icon: Inbox, type: "main" },
  { name: "Generate", path: "/generate", icon: Terminal, type: "main" },
  {
    name: "Templates",
    path: "/templates",
    icon: Shapes,
    type: "main",
  },
  {
    name: "Workflows",
    path: "/workflows",
    icon: Workflow,
    type: "expandable",
  },
  { name: "Settings", path: "", icon: Settings, type: "icon-only" },
  { name: "More", path: "", icon: HelpCircle, type: "icon-only" },
  { name: "Trash", path: "", icon: Trash2, type: "icon-only" },
];

export const moreButtonPaths: moreButtonPathType[] = [
  { name: "Support", path: "support", icon: Headset, component: Support },
  { name: "Report", path: "report", icon: Bug, component: Report },
  {
    name: "Feature Request",
    path: "featureRequest",
    icon: Rocket,
    component: FeatureRequest,
  },
];

const AppSidebar = () => {
  const [isWorkflowsButtonExpanded, setWorkflowsButtonExpanded] =
    useState(false);
  const { isPanSidebarOpen, panSidebarType, setOpenPanSidebar } =
    usePanSidebar();
  const pathname = usePathname();

  const { setOpenSettingsDialog, setOpenSearchDialog } = useAppDialog();

  const togglePanSidebar = (type: panSidebarType) => {
    if (isPanSidebarOpen) {
      if (panSidebarType !== type) {
        setOpenPanSidebar(true, type);
      } else {
        setOpenPanSidebar(false, type);
      }
    } else {
      setOpenPanSidebar(true, type);
    }
  };

  return (
    <Sidebar>
      <SidebarContent
        className={`flex flex-col justify-between gap-0 max-h- overflow-y-hidden items-start font-bold pt-4 pr-0 bg-[${COLORS.sidebarColor}]`}
      >
        <div className="mb-0 ml-2 pl-2 h-10">
          <LogoAndText />
        </div>

        <div className="h-px relative inset-0 w-full flex flex-1">
          <div
            className={`absolute top-0 z-30 pointer-events-none bg-gradient-to-b from-[#F8F8F7] from-30% to-transparent h-5 w-full`}
          ></div>

          <div className="w-full flex flex-col  overflow-y-auto scrollbar-hide pr-4 pt-4 pl-2">
            {sidebarPaths
              .filter((item) => item.type === "main")
              .map((item) => {
                if (item.name === "Inbox") {
                  return (
                    <button
                      key={item.path}
                      className={cn("mb-[1px]")}
                      onClick={(e) => {
                        e.preventDefault();
                        togglePanSidebar("inbox");
                      }}
                    >
                      <SidebarButton
                        isSelected={pathname === item.path}
                        item={item}
                      />
                    </button>
                  );
                } else if (item.name === "Search") {
                  return (
                    <button
                      key={item.path}
                      className={cn("mb-[1px]")}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenSearchDialog(true);
                      }}
                    >
                      <SidebarButton
                        isSelected={pathname === item.path}
                        item={item}
                      />
                    </button>
                  );
                } else {
                  return (
                    <button
                      key={item.path}
                      className={cn(
                        "mb-[1px]",
                        item.name === "Templates" && "-mb-2"
                      )}
                      onClick={() => {
                        setOpenPanSidebar(false, "inbox");
                      }}
                    >
                      {item.name === "Generate" && (
                        <Separator className="my-1" />
                      )}
                      <SidebarButton
                        isSelected={pathname === item.path}
                        item={item}
                      />
                    </button>
                  );
                }
              })}

            {/* Expandable Icons */}
            {sidebarPaths
              .filter((item) => item.type === "expandable")
              .map((item) => {
                return (
                  <span key={item.path} className="w-full text-teal-700 my-2">
                    <button
                      className="w-full"
                      onClick={() => {
                        setOpenPanSidebar(false, "inbox");
                      }}
                    >
                      <SidebarButton
                        onIconClicked={() => {
                          setWorkflowsButtonExpanded((prev) => !prev);
                        }}
                        isSelected={pathname === item.path}
                        item={item}
                        isExpanded={isWorkflowsButtonExpanded}
                      />
                    </button>

                    {/* Workflow Expanded Items */}
                    {isWorkflowsButtonExpanded && item.name === "Workflows" && (
                      <div className="flex flex-col pl-6">
                        {folders.map((folder) => {
                          return (
                            <SidebarButton
                              key={folder.folderName}
                              // isSelected={pathname === item.path}
                              isSelected={false}
                              iconFillColor={folder.folderColor}
                              item={{
                                icon: Squircle,
                                name: folder.folderName,
                                type: "main",
                                path: `/workflows/folder/${folder.folderPath}`,
                              }}
                            />
                          );
                        })}
                      </div>
                    )}
                  </span>
                );
              })}
          </div>
        </div>

        {/* Icon-only Icons */}
        <Separator className="my-0" />
        <div className="flex w-full h-10 m-0 p-0 pl-2">
          <div className="flex flex-1 gap-0">
            {sidebarPaths
              .filter((item) => item.type === "icon-only")
              .map((item) => {
                if (item.name === "Settings") {
                  return (
                    <button
                      key={`${item.path}_settings`}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenSettingsDialog(true, "account");
                      }}
                    >
                      <SidebarButton
                        isSelected={pathname === item.path}
                        item={item}
                      />
                    </button>
                  );
                } else if (item.name === "More") {
                  return <MoreButton item={item} key={`${item.path}_more`} />;
                } else if (item.name === "Trash") {
                  return (
                    <div
                      key={`${item.path}_trash`}
                      className="flex flex-1 justify-end"
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          togglePanSidebar("trash");
                        }}
                      >
                        <SidebarButton
                          isSelected={pathname === item.path}
                          item={item}
                        />
                      </button>
                    </div>
                  );
                } else {
                  return (
                    <SidebarButton
                      isSelected={pathname === item.path}
                      key={item.path}
                      item={item}
                    />
                  );
                }
              })}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;

export const SidebarButton = ({
  item,
  isLink = true,
  isSelected,
  isExpanded,
  iconFillColor,
  iconStrokeColor,
  onIconClicked,
}: {
  item: sidebarPathType;
  isLink?: boolean;
  isExpanded?: boolean;
  isSelected: boolean;
  iconFillColor?: string;
  iconStrokeColor?: string;
  onIconClicked?: () => void;
}) => {
  const Icon = item.icon;

  if (item.type !== "icon-only") {
    return (
      <SidebarItemWrapper isLink={isLink} item={item}>
        <div
          className={cn(
            "transition-all duration-300 h-8 flex flex-1 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm",
            isSelected && "bg-neutral-200/60"
          )}
        >
          {/* Icon */}
          <button
            className="inset-0"
            onClick={(e) => {
              e.preventDefault();
              onIconClicked && onIconClicked();
            }}
          >
            <SidebarIcon
              defaultIcon={Icon}
              isExpandable={item.type === "expandable"}
              type="icon"
              isSelected={isSelected}
              isExpanded={isExpanded}
              iconFillColor={iconFillColor}
              iconStrokeColor={iconStrokeColor}
            />
          </button>

          {/* Text */}
          <span
            className={cn(
              "text-xs font-medium flex flex-1 truncate",
              isSelected && "font-bold text-[#333333]/90"
            )}
          >
            {item.name}
          </span>

          {/* Action Buttons */}
          {item.type === "expandable" && (
            <SidebarIcon
              defaultIcon={Plus}
              isExpandable={false}
              isSelected={undefined}
              type="actionBtn"
            />
          )}
        </div>
      </SidebarItemWrapper>
    );
  } else if (item.type === "icon-only") {
    return (
      <Button
        variant={"ghost"}
        className={cn(
          "w-auto transition-all duration-300 h-8 flex justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm",
          isSelected && "bg-neutral-200/60"
        )}
      >
        {/* Icon */}
        <SidebarIcon
          defaultIcon={Icon}
          isExpandable={false}
          type="icon"
          isSelected={isSelected}
        />
      </Button>
    );
  } else {
    return <div></div>;
  }
};

export const SidebarIcon = ({
  defaultIcon,
  isSelected,
  isExpandable,
  isExpanded,
  type,
  iconFillColor,
  iconStrokeColor,
}: {
  defaultIcon: LucideIcon;
  isSelected: boolean | undefined;
  isExpandable: boolean;
  isExpanded?: boolean;
  iconFillColor?: string;
  iconStrokeColor?: string;
  type: "actionBtn" | "icon";
}) => {
  const Icon = defaultIcon;
  const ChevronIcon = isExpanded ? ChevronDown : ChevronRight;
  return (
    <div className="">
      <div
        className={cn(
          "p-[2.7px]",
          isExpandable && "block group-hover/sidebarButton:hidden",
          type === "actionBtn" &&
            "hidden group-hover/sidebarButton:block hover:bg-neutral-300/60 rounded-[5px] transition-all duration-300"
        )}
      >
        <Icon
          className={cn(
            isSelected
              ? "stroke-[#333333] stroke-[1.7px] size-4"
              : "stroke-neutral-500 stroke-[1.4px] size-4",
            iconFillColor ? `stroke-none` : "fill-none",
            type === "actionBtn" && "stroke-[2.2px]"
          )}
          fill={iconFillColor}
        />
      </div>

      {/* Expand Icon */}
      {isExpandable && (
        <div
          className={cn(
            " hover:bg-neutral-300/60 rounded-[5px] p-[2.7px] transition-all duration-300",
            "hidden group-hover/sidebarButton:block"
          )}
        >
          <ChevronIcon
            className={cn(
              isSelected
                ? "stroke-[#333333] stroke-[2.2px] size-4"
                : "stroke-neutral-500 stroke-[2.2px] size-4"
            )}
          />
        </div>
      )}
    </div>
  );
};

export const SidebarItemWrapper = ({
  isLink,
  item,
  children,
}: {
  isLink: boolean;
  item: sidebarPathType;
  children: React.ReactNode;
}) => {
  let className = "w-full group/sidebarButton transition-all duration-300";

  if (isLink) {
    return (
      <Link className={className} href={item.path}>
        {children}
      </Link>
    );
  } else {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
        }}
        className={className}
      >
        {children}
      </button>
    );
  }
};

export const MoreButton = ({ item }: { item: sidebarPathType }) => {
  const { setOpenMoreDialog } = useAppDialog();
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <SidebarButton isSelected={pathname === item.path} item={item} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col">
        {moreButtonPaths.map((p, i) => {
          const Icon = p.icon;
          return (
            <button
              key={`${i.toString()}`}
              onClick={() => setOpenMoreDialog(true, p.path)}
            >
              <DropdownMenuItem>
                <Icon className="stroke-neul-600" />
                <span className="text-neutral-600">{p.name}</span>
              </DropdownMenuItem>
              {i === 1 && <DropdownMenuSeparator />}
            </button>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
