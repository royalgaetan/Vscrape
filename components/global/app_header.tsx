"use client";

import { generateAvatar } from "@/lib/avatar";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  CoinsIcon,
  LogOut,
  PlusIcon,
  ReceiptCent,
  UserRoundCogIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Breadcrumbs from "./breadcrumbs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useAppDialog } from "@/hooks/useAppDialog";
import { formatNumber } from "@/lib/utils";

const AppHeader = () => {
  const { setOpenSettingsDialog } = useAppDialog();
  const [avatarImage, setAvatarImage] = useState("");

  useEffect(() => {
    setAvatarImage(generateAvatar()?.toDataUri() ?? "");
  }, []);

  return (
    <div className="flex justify-between w-full h-fit">
      {/* Breadcrumbs */}
      <div className="flex flex-1 items-start text-xs py-4 pr-10">
        <Breadcrumbs />
      </div>

      {/* Action Items */}
      <div className="flex justify-center items-center py-2 px-6 gap-3">
        {/* Create a new Workflow */}
        <Button variant={"outline"} className="rounded-3xl h-8 mr-2 gap-1 px-3">
          <PlusIcon className="stroke-primary" />
          <span className="text-xs">Create a workflow</span>
        </Button>

        {/* Get Free Credits */}
        {/* <Button
          variant={"link"}
          className="rounded-3xl h-8 hover:opacity-80 hover:no-underline active:scale-[0.98] transition-all duration-200"
        >
          <span className="text-xs text-primary">Get Free Credits!</span>
        </Button> */}

        {/* Credits */}
        <Button
          variant={"default"}
          className="rounded-3xl h-8 -ml-2 gap-1 px-3"
          onClick={() => {
            setOpenSettingsDialog(true, "plans");
          }}
        >
          <CoinsIcon className="stroke-white" />
          <span className="text-xs">{formatNumber(13403)} </span>
        </Button>

        {/* Avatar: Profile Action Items */}
        <ProfileActionItem avatarImage={avatarImage} />
      </div>
    </div>
  );
};

export default AppHeader;

const ProfileActionItem = ({ avatarImage }: { avatarImage: string }) => {
  const { logout } = useAuth();
  const { setOpenSettingsDialog } = useAppDialog();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8 ml-1 cursor-pointer">
          <AvatarImage src={avatarImage} alt="Avatar" />
          <AvatarFallback>Vs</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" className="w-52 px-2 py-3">
        <DropdownMenuItem
          onClick={() => {
            setOpenSettingsDialog(true, "account");
          }}
        >
          <UserRoundCogIcon className="stroke-neutral-600" />
          <span className="text-neutral-600">Account Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            setOpenSettingsDialog(true, "plans");
          }}
        >
          <ReceiptCent className="stroke-neutral-600" />
          <span className="text-neutral-600">Plans</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        >
          <LogOut className="stroke-neutral-600" />
          <span className="text-neutral-600">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
