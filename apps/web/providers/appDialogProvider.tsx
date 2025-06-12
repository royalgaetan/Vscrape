"use client";
import { moreTabValue } from "@/app/(protected)/_more/more_dialog";
import { createContext, useState } from "react";

export const AppDialogContext = createContext<AppDialogContextValues | null>(
  null
);

type AppDialogContextValues = {
  // Search
  isSearchDialogOpen: boolean;
  setOpenSearchDialog: (isOpen: boolean) => void;
  searchDialogSearchContent: string;
  setSearchDialogSearchContent: (val: string) => void;

  // More
  isMoreDialogOpen: boolean;
  setOpenMoreDialog: (isOpen: boolean, tab: moreTabValue) => void;
  moreDialogCurrentTab: moreTabValue;

  // Settings
  setOpenSettingsDialog: (isOpen: boolean, tabIndex: string) => void;
  isSettingDialogOpen: boolean;
  settingsDialogCurrentTab: string;

  // Create A Workflow
  isCreateWorkflowDialogOpen: boolean;
  setCreateWorkflowDialogOpen: (isOpen: boolean) => void;
};

export const AppDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Search Dialog States
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [searchDialogSearchContent, setSearchDialogSearchContent] =
    useState("");
  const setOpenSearchDialog = (isOpen: boolean) => {
    setSearchDialogSearchContent("");
    setIsSearchDialogOpen(isOpen);
  };

  // More Dialog States
  const [isMoreDialogOpen, setIsMoreDialogOpen] = useState(false);
  const [moreDialogCurrentTab, setMoreDialogCurrentTab] =
    useState<moreTabValue>("report");
  const setOpenMoreDialog = (isOpen: boolean, tab: moreTabValue) => {
    setMoreDialogCurrentTab(tab);
    setIsMoreDialogOpen(isOpen);
  };

  // Settings Dialog States
  const [isSettingDialogOpen, setIsSettingDialogOpen] = useState(false);
  const [settingsDialogCurrentTab, setSettingsDialogCurrentTab] =
    useState<string>("");

  const setOpenSettingsDialog = (isOpen: boolean, tab: string) => {
    setSettingsDialogCurrentTab(tab);
    setIsSettingDialogOpen(isOpen);
  };

  // Create A Workflow Dialog States
  const [isCreateWorkflowDialogOpen, setCreateWorkflowDialogOpen] =
    useState(false);

  return (
    <AppDialogContext.Provider
      value={{
        isSearchDialogOpen,
        setOpenSearchDialog,
        searchDialogSearchContent,
        setSearchDialogSearchContent,
        isMoreDialogOpen,
        setOpenMoreDialog,
        moreDialogCurrentTab,
        setOpenSettingsDialog,
        isSettingDialogOpen,
        settingsDialogCurrentTab,
        isCreateWorkflowDialogOpen,
        setCreateWorkflowDialogOpen,
      }}
    >
      {children}
    </AppDialogContext.Provider>
  );
};

export default AppDialogProvider;
