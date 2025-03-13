"use client";

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
  ArrowDownToLineIcon,
  CreditCard,
  KeyRound,
  LogIn,
  Package,
  Puzzle,
  SlidersHorizontal,
  UserCog,
} from "lucide-react";
import { Separator } from "../../../components/ui/separator";
import { sidebarPathType } from "@/lib/types";
import { cn } from "@/lib/utils";
import SessionsSettings from "./sessions/sessions_settings";
import PreferencesSettings from "./preferences/preferences_settings";
import BillingSettings from "./billing/billing_settings";
import IntegrationSettings from "./integrations/integration_settings";
import PlansSettings from "./plans/plans_settings";
import ApiSettings from "./api/api_settings";
import AccountSettings from "./account/account_settings";
import { COLORS } from "@/lib/colors";
import ImportSettings from "./import/import_settings";

type settingsDialogItemType = sidebarPathType & {
  component: React.JSX.Element;
};

export const settingSidebarPaths: settingsDialogItemType[] = [
  {
    name: "Account Settings",
    path: "account",
    icon: UserCog,
    type: "main",
    component: <AccountSettings />,
  },
  {
    name: "Sessions & Logins",
    path: "sessions",
    icon: LogIn,
    type: "main",
    component: <SessionsSettings />,
  },
  {
    name: "Preferences",
    path: "preferences",
    icon: SlidersHorizontal,
    type: "main",
    component: <PreferencesSettings />,
  },
  {
    name: "Billings",
    path: "billings",
    icon: CreditCard,
    type: "main",
    component: <BillingSettings />,
  },
  {
    name: "Plans",
    path: "plans",
    icon: Package,
    type: "main",
    component: <PlansSettings />,
  },
  {
    name: "Import",
    path: "import",
    icon: ArrowDownToLineIcon,
    type: "main",
    component: <ImportSettings />,
  },
  {
    name: "Integrations",
    path: "integrations",
    icon: Puzzle,
    type: "main",
    component: <IntegrationSettings />,
  },
  {
    name: "API Connections & Keys",
    path: "apis",
    icon: KeyRound,
    type: "main",
    component: <ApiSettings />,
  },
] as const;

const SettingsDialog = ({ children }: { children: React.ReactNode }) => {
  const [itemSelected, setItemSelected] = useState<settingsDialogItemType>(
    settingSidebarPaths[0]
  );

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent
        hideCloseButton
        className="h-[90vh] w-[70vw] max-w-none overflow-clip p-0"
      >
        <SidebarProvider>
          {/* Sidebar */}
          <SettingDialogSidebar
            onItemSelected={(item) => setItemSelected(item)}
            selectedItemPath={itemSelected.path}
          />

          <main className="flex flex-1 w-[0px]  p-0 bg-white">
            {/* Main Content */}
            {itemSelected.component}
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;

export const SettingDialogSidebar = ({
  onItemSelected,
  selectedItemPath,
}: {
  onItemSelected: (val: settingsDialogItemType) => void;
  selectedItemPath: string;
}) => {
  return (
    <div className={cn("flex w-[15vw] p-3 pt-7", `bg-[#F8F8F7]`)}>
      {/* Main Icons */}
      <div className="flex flex-col w-full h-full">
        <SidebarGroupLabel className="mb-4 text-lg">Settings</SidebarGroupLabel>
        {settingSidebarPaths
          .filter((item) => item.type === "main")
          .map((item, i) => {
            return (
              <>
                <button key={item.path} onClick={() => onItemSelected(item)}>
                  <SidebarButton
                    item={item}
                    isLink={false}
                    isSelected={selectedItemPath === item.path}
                  />
                </button>
                {i === 2 && (
                  <Separator className="my-2 h-[0.1px] bg-gray-200" />
                )}
                {i === 4 && (
                  <Separator className="my-2 h-[0.1px] bg-gray-200" />
                )}
              </>
            );
          })}
      </div>
    </div>
  );
};
