"use client";

import React, { ReactNode, useState } from "react";
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
  MessageCircleMoreIcon,
  Plus,
  Rocket,
  Search,
  Settings,
  Shapes,
  Squircle,
  Terminal,
  Trash2,
  WandSparkles,
  Workflow,
} from "lucide-react";
import LogoAndText from "@/app/(auth)/_components/logo_and_text";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
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
import CreateWorkflowDialog from "@/app/(protected)/workflows/_components/create_workflow_dialog";

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
  { name: "Generate", path: "/chats", icon: WandSparkles, type: "main" },
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

  const {
    setOpenSettingsDialog,
    setOpenSearchDialog,
    setCreateWorkflowDialogOpen,
  } = useAppDialog();

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
        className={`flex  flex-col justify-between w-full gap-0 max-h-full overflow-y-hidden items-start font-bold pt-4 pr-0 bg-[${COLORS.sidebarColor}]`}
      >
        <div className="mb-0 ml-2 pl-2 h-10">
          <LogoAndText />
        </div>

        <div className="h-px relative inset-0 w-full flex flex-1">
          <div
            className={`absolute top-0 z-30 pointer-events-none bg-gradient-to-b from-[#F8F8F7] from-30% to-transparent h-5 w-full`}
          ></div>

          <div className="w-full flex flex-col overflow-y-auto scrollbar-hide pr-4 pt-4 pl-2 gap-[0.3px]">
            {/* Main & Expandable Icons */}
            {sidebarPaths
              .filter(
                (item) => item.type === "main" || item.type === "expandable"
              )
              .map((item) => {
                if (item.name === "Inbox") {
                  return (
                    <div key={item.path} className={cn("mb-[1px]")}>
                      <SidebarButton
                        isSelected={pathname === item.path}
                        item={item}
                        onIconClicked={() => {
                          togglePanSidebar("inbox");
                        }}
                        onButtonClicked={() => {
                          togglePanSidebar("inbox");
                        }}
                      />
                    </div>
                  );
                } else if (item.name === "Search") {
                  return (
                    <div key={item.path} className={cn("mb-[1px]")}>
                      <SidebarButton
                        isSelected={pathname === item.path}
                        item={item}
                        onIconClicked={() => {
                          setOpenSearchDialog(true);
                        }}
                        onButtonClicked={() => {
                          setOpenSearchDialog(true);
                        }}
                      />
                    </div>
                  );
                } else if (item.name === "Generate") {
                  return (
                    <>
                      <Separator className="my-1" />
                      <SidebarButton
                        isSelected={pathname.startsWith("/chats")}
                        onButtonClicked={() => {
                          setOpenPanSidebar(false, "inbox");
                        }}
                        onIconClicked={() => {
                          setOpenPanSidebar(false, "inbox");
                          redirect(item.path);
                        }}
                        item={item}
                        cta={[
                          <SidebarIcon
                            defaultIcon={MessageCircleMoreIcon}
                            iconStrokeWidth={"4.3px"}
                            isExpandable={false}
                            isSelected={undefined}
                            type={"actionBtn"}
                            onIconClick={() => {
                              setOpenPanSidebar(false, "inbox");
                              togglePanSidebar("chats");
                            }}
                          />,
                        ]}
                      />
                    </>
                  );
                } else if (item.name === "Workflows") {
                  return (
                    <span key={item.path} className="w-full my-2">
                      <SidebarButton
                        onIconClicked={() => {
                          setWorkflowsButtonExpanded((prev) => !prev);
                        }}
                        onButtonClicked={() => {
                          setOpenPanSidebar(false, "inbox");
                        }}
                        isSelected={pathname === item.path}
                        item={item}
                        isExpanded={isWorkflowsButtonExpanded}
                        cta={[
                          <SidebarIcon
                            defaultIcon={Plus}
                            isExpandable={false}
                            isSelected={undefined}
                            type={"actionBtn"}
                            onIconClick={() => {
                              setOpenPanSidebar(false, "inbox");
                              setCreateWorkflowDialogOpen(true);
                            }}
                          />,
                        ]}
                      />

                      {/* Workflow Expanded Items */}
                      {isWorkflowsButtonExpanded && (
                        <div className="flex flex-col pl-6">
                          {folders.map((folder) => {
                            return (
                              <SidebarButton
                                key={folder.folderName}
                                isSelected={
                                  pathname ===
                                  `/workflows/folders/${folder.folderPath}`
                                }
                                iconFillColor={folder.folderColor}
                                item={{
                                  icon: Squircle,
                                  name: folder.folderName,
                                  type: "main",
                                  path: `/workflows/folders/${folder.folderPath}`,
                                }}
                              />
                            );
                          })}
                        </div>
                      )}
                    </span>
                  );
                } else {
                  return (
                    <div
                      key={item.path}
                      className={cn(item.name === "Templates" && "-mb-2")}
                    >
                      <SidebarButton
                        onButtonClicked={() => {
                          setOpenPanSidebar(false, "inbox");
                        }}
                        onIconClicked={() => {
                          setOpenPanSidebar(false, "inbox");
                          redirect(item.path);
                        }}
                        isSelected={
                          item.name === "Templates"
                            ? pathname.startsWith("/templates")
                            : pathname === item.path
                        }
                        item={item}
                      />
                    </div>
                  );
                }
              })}
          </div>
        </div>

        {/* Icon-only Icons */}
        <div className="flex flex-col w-full h-[3rem] justify-between">
          <Separator className="mb-1" />
          <div className="flex h-full w-full m-0 p-0 pl-3 pr-2">
            <div className="flex flex-1 gap-0">
              {sidebarPaths
                .filter((item) => item.type === "icon-only")
                .map((item) => {
                  if (item.name === "Settings") {
                    return (
                      <div key={`${item.path}_settings`}>
                        <SidebarButton
                          isSelected={pathname === item.path}
                          item={item}
                          onIconClicked={() => {
                            setOpenSettingsDialog(true, "account");
                          }}
                        />
                      </div>
                    );
                  } else if (item.name === "More") {
                    return (
                      <div key={`${item.path}_more`}>
                        <MoreButton item={item} />
                      </div>
                    );
                  } else if (item.name === "Trash") {
                    return (
                      <div
                        key={`${item.path}_trash`}
                        className="flex flex-1 justify-end"
                      >
                        <SidebarButton
                          isSelected={pathname === item.path}
                          item={item}
                          onIconClicked={() => {
                            togglePanSidebar("trash");
                          }}
                        />
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
  cta,
  onIconClicked,
  onButtonClicked,
}: {
  item: sidebarPathType;
  isLink?: boolean;
  isExpanded?: boolean;
  isSelected: boolean;
  iconFillColor?: string;
  iconStrokeColor?: string;
  onIconClicked?: () => void;
  onButtonClicked?: () => void;

  cta?: React.ReactNode[];
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
          <SidebarIcon
            onIconClick={() => {
              onIconClicked && onIconClicked();
            }}
            defaultIcon={Icon}
            isExpandable={item.type === "expandable"}
            type="icon"
            isSelected={isSelected}
            isExpanded={isExpanded}
            iconFillColor={iconFillColor}
            iconStrokeColor={iconStrokeColor}
          />

          {/* Text */}
          <div
            role="button"
            onClick={() => {
              onButtonClicked && onButtonClicked();
            }}
            className={cn(
              "text-xs font-medium flex flex-1 truncate h-full items-center",
              isSelected && "font-bold text-[#333333]/90"
            )}
          >
            {item.name}
          </div>

          {/* Action Buttons */}
          {cta && cta.length > 0 && (
            <div className="flex items-center">
              {cta.map((element, idx) => {
                return <>{element}</>;
              })}
            </div>
          )}
        </div>
      </SidebarItemWrapper>
    );
  } else if (item.type === "icon-only") {
    return (
      <div
        role="button"
        onClick={() => {
          onIconClicked && onIconClicked();
        }}
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
      </div>
    );
  } else {
    return <div></div>;
  }
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
    return <div className={className}>{children}</div>;
  }
};

export type SidebarIconProps = {
  defaultIcon: LucideIcon;
  isSelected: boolean | undefined;
  isExpandable: boolean;
  isExpanded?: boolean;
  iconFillColor?: string;
  iconStrokeColor?: string;
  iconStrokeSize?: string;
  iconStrokeWidth?: number | string;
  type: "actionBtn" | "icon";
  onIconClick?: () => void;
};
export const SidebarIcon = ({
  defaultIcon,
  isSelected,
  isExpandable,
  isExpanded,
  type,
  iconFillColor,
  iconStrokeWidth,
  iconStrokeColor,
  iconStrokeSize,
  onIconClick,
}: SidebarIconProps) => {
  const Icon = defaultIcon;
  const ChevronIcon = isExpanded ? ChevronDown : ChevronRight;
  return (
    <div
      role="button"
      className=""
      onClick={(e) => {
        if (onIconClick) {
          e.preventDefault();
          onIconClick();
        }
      }}
    >
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
            isSelected ? "stroke-[#333333]" : "stroke-neutral-500",
            iconFillColor ? `stroke-none` : "fill-none",
            type === "actionBtn" && "stroke-[2.2px]"
          )}
          size={iconStrokeSize ?? "1rem"}
          fill={iconFillColor}
          strokeWidth={iconStrokeWidth ?? "1.7px"}
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
            <div key={`${i.toString()}`}>
              <DropdownMenuItem onClick={() => setOpenMoreDialog(true, p.path)}>
                <Icon className="stroke-neul-600" />
                <span className="text-neutral-600">{p.name}</span>
              </DropdownMenuItem>
              {i === 1 && <DropdownMenuSeparator />}
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
