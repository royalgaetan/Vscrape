import React, { useEffect, useState } from "react";
import CustomButton from "./custom_button";
import { useAuth } from "@/hooks/useAuth";
import {
  HelpCircle,
  Home,
  Inbox,
  LayoutDashboard,
  LucideIcon,
  MessagesSquare,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Trash2,
  Workflow,
} from "lucide-react";
import LogoAndText from "@/app/(auth)/_components/logo_and_text";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

type sidebarPathType = {
  name: string;
  path: string;
  icon: LucideIcon;
  type: "expandable" | "icon-only" | "main";
};

const Sidebar = () => {
  const { logout } = useAuth();

  const sidebarPaths: sidebarPathType[] = [
    { name: "Home", path: "/home", icon: Home, type: "main" },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      type: "main",
    },
    { name: "Search", path: "/search", icon: Search, type: "main" },
    { name: "Inbox", path: "/inbox", icon: Inbox, type: "main" },
    {
      name: "Marketplace",
      path: "/marketplace",
      icon: ShoppingBag,
      type: "main",
    },
    {
      name: "Workflows",
      path: "/workflows",
      icon: Workflow,
      type: "expandable",
    },
    { name: "Chats", path: "/chats", icon: MessagesSquare, type: "expandable" },
    { name: "Settings", path: "/settings", icon: Settings, type: "icon-only" },
    { name: "Trash", path: "/trash", icon: Trash2, type: "icon-only" },
    { name: "Help", path: "/help", icon: HelpCircle, type: "icon-only" },
  ];

  return (
    <div className="flex flex-col h-full items-start font-bold pt-4 pb-3 pl-2 pr-4">
      <div className="mb-4 ml-2">
        <LogoAndText />
      </div>
      {/* Main Icons */}
      <div className="flex flex-col w-full h-auto">
        {sidebarPaths
          .filter((item) => item.type === "main")
          .map((item) => {
            return <SidebarButton key={item.path} item={item} />;
          })}
      </div>
      <Separator className="my-3" />
      {/* Expandable Icons */}
      <div className="flex flex-1 w-full ">
        <div className="flex flex-col w-full overflow-x-auto">
          {sidebarPaths
            .filter((item) => item.type === "expandable")
            .map((item) => {
              return <SidebarButton key={item.path} item={item} />;
            })}
        </div>
      </div>

      <Separator className="mb-2" />
      {/* Icon-only Icons */}
      <div className="flex w-full">
        <div className="flex flex-1">
          {sidebarPaths
            .filter((item) => item.type === "icon-only")
            .map((item) => {
              return (
                <div
                  key={item.path}
                  className={cn(
                    item.name === "Help" && "flex flex-1 justify-end"
                  )}
                >
                  <SidebarButton item={item} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

export const SidebarButton = ({ item }: { item: sidebarPathType }) => {
  const pathname = usePathname();

  const Icon = item.icon;
  return (
    <Link
      href={item.path}
      className={cn(
        "w-full group transition-all duration-300",
        item.type === "icon-only" && "w-auto"
      )}
    >
      <div
        className={cn(
          "transition-all duration-300 h-8 flex flex-1 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm",
          pathname === item.path && "bg-neutral-200/60"
        )}
      >
        {/* Icon */}
        <div className="">
          <Icon
            className={cn(
              pathname === item.path
                ? "stroke-[#333333]"
                : "stroke-neutral-500",
              item.type === "expandable" && "block group-hover:hidden "
            )}
            strokeWidth={pathname === item.path ? "1.7px" : "1.4px"}
            size={"1rem"}
          />
          {item.type === "expandable" && (
            <div className="hidden group-hover:block hover:bg-neutral-300/60 rounded-[5px] p-[2.7px] transition-all duration-300">
              <Plus
                className="text-neutral-500"
                strokeWidth="2px"
                size={"1rem"}
              />
            </div>
          )}
        </div>

        {/* Text */}
        {item.type !== "icon-only" && (
          <span
            className={cn(
              "text-xs font-medium flex flex-1",
              pathname === item.path && "font-bold text-[#333333]/90"
            )}
          >
            {item.name}
          </span>
        )}

        {/* Action Buttons */}
        {item.type === "expandable" && (
          <div className="hidden group-hover:block hover:bg-neutral-300/60 rounded-[5px] p-[2.7px] transition-all duration-300">
            <Plus
              className="text-neutral-500"
              strokeWidth="2px"
              size={"1rem"}
            />
          </div>
        )}
      </div>
    </Link>
  );
};
