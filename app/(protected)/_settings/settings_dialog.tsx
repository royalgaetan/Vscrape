import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "../../../components/ui/dialog";
import { SidebarButton } from "../../../components/global/app_sidebar";
import {
  SidebarGroupLabel,
  SidebarProvider,
} from "../../../components/ui/sidebar";
import {
  CreditCard,
  KeyRound,
  LogIn,
  Package,
  Puzzle,
  SlidersHorizontal,
  UserCog,
} from "lucide-react";
import { Separator } from "../../../components/ui/separator";
import { cn } from "@/lib/utils";
import { sidebarColor } from "@/lib/colors";
import { sidebarPathType } from "@/lib/types";

export const settingSidebarPaths: sidebarPathType[] = [
  {
    name: "Account Settings",
    path: "account",
    icon: UserCog,
    type: "main",
  },
  {
    name: "Sessions & Logins",
    path: "sessions",
    icon: LogIn,
    type: "main",
  },
  {
    name: "Preferences",
    path: "preferences",
    icon: SlidersHorizontal,
    type: "main",
  },
  {
    name: "Billings",
    path: "billings",
    icon: CreditCard,
    type: "main",
  },
  { name: "Plans", path: "plans", icon: Package, type: "main" },
  {
    name: "Integrations",
    path: "integrations",
    icon: Puzzle,
    type: "main",
  },
  {
    name: "API Connections & Keys",
    path: "apis",
    icon: KeyRound,
    type: "main",
  },
];

const SettingsDialog = ({ children }: { children: React.ReactNode }) => {
  const [itemSelected, setItemSelected] = useState<sidebarPathType>(
    settingSidebarPaths[0]
  );

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="h-[90vh] w-[70vw] max-w-none overflow-clip p-0">
        <SidebarProvider>
          {/* Sidebar */}
          <SettingDialogSidebar
            onItemSelected={(item) => setItemSelected(item)}
          />

          <main className="flex flex-col w-full pl-5 pr-5 pt-5 pb-0">
            {/* Dialog Header */}
            <div className="w-full">
              <h2 className="text-2xl font-semibold ">Settings</h2>
              <Separator className="w-full ml-0 mr-5 my-2" />
            </div>

            {/* Main Content */}
            <div className="flex flex-col w-full">
              <div className="flex flex-1 justify-center items-center">
                Main Content
              </div>
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;

export const SettingDialogSidebar = ({
  onItemSelected,
}: {
  onItemSelected: (val: sidebarPathType) => void;
}) => {
  return (
    <div className={`bg-[${sidebarColor}] w-[30%] p-3 pt-7 mr-2`}>
      {/* Main Icons */}
      <div className="flex flex-col w-full h-full">
        <SidebarGroupLabel className="mb-3">Settings</SidebarGroupLabel>
        {settingSidebarPaths
          .filter((item) => item.type === "main")
          .map((item) => {
            return (
              <button key={item.path} onClick={() => onItemSelected(item)}>
                <SidebarButton item={item} />
              </button>
            );
          })}
      </div>
    </div>
  );
};
