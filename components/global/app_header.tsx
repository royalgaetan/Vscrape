import { generateAvatar } from "@/lib/avatar";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CoinsIcon, LogOut, ReceiptCent, UserRoundCogIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Breadcrumbs from "./breadcrumbs";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SettingsDialog from "../../app/(protected)/_settings/settings_dialog";

const AppHeader = () => {
  const [avatarImage, setAvatarImage] = useState("");

  useEffect(() => {
    setAvatarImage(generateAvatar()?.toDataUri() ?? "");
  }, []);

  return (
    <div className="flex justify-between w-full h-fit">
      {/* Breadcrumbs */}
      <div className="flex flex-1 items-start text-xs py-4 px-10">
        <Breadcrumbs />
      </div>

      {/* Action Items */}
      <div className="flex justify-center items-center py-2 px-6 gap-3">
        {/* Get Free Credits */}
        <Button
          variant={"link"}
          className="rounded-3xl h-8 hover:opacity-80 hover:no-underline active:scale-[0.98] transition-all duration-200"
        >
          <span className="text-xs text-primary">Get Free Credits!</span>
        </Button>

        {/* Credits */}
        <Button variant={"outline"} className="rounded-3xl h-8 -ml-2">
          <CoinsIcon className="stroke-primary" />
          <span className="text-xs">5405</span>
        </Button>

        {/* Avatar: Profile Action Items */}
        <ProfileActionItem>
          <Avatar className="h-8 w-8 ml-1 cursor-pointer">
            <AvatarImage src={avatarImage} alt="Avatar" />
            <AvatarFallback>Vs</AvatarFallback>
          </Avatar>
        </ProfileActionItem>
      </div>
    </div>
  );
};

export default AppHeader;

const ProfileActionItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        className="w-52 px-2 py-3 bg-white border-[1px] border-gray-200 rounded-lg shadow-lg"
      >
        <SettingsDialog>
          <DropdownMenuItem>
            <UserRoundCogIcon className="stroke-neutral-600" />
            <span className="text-neutral-600">Account Settings</span>
          </DropdownMenuItem>
        </SettingsDialog>
        <DropdownMenuItem>
          <ReceiptCent className="stroke-neutral-600" />
          <span className="text-neutral-600">Plans</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogOut className="stroke-neutral-600" />
          <span className="text-neutral-600">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
