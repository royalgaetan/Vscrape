"use client";
import { inboxFilterOptions } from "@/app/(protected)/_inbox/inbox";
import { createContext, useState } from "react";

export const PanSidebarContext = createContext<panSidebarContextType | null>(
  null
);

export type panSidebarType = "trash" | "inbox" | "chats";
export type inboxOptionsType = {
  filter?: keyof typeof inboxFilterOptions;
  scrollToId?: string;
};

type panSidebarContextType = {
  isPanSidebarOpen: boolean;
  panSidebarType: panSidebarType;
  panSidebarOptions?: inboxOptionsType;
  setOpenPanSidebar: (
    isOpen: boolean,
    type: panSidebarType,
    inboxOptions?: inboxOptionsType
  ) => void;
};

export const PanSidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isPanSidebarOpen, setIsPanSidebarOpen] = useState<boolean>(false);
  const [panSidebarType, setPanSidebarType] = useState<panSidebarType>("inbox");
  const [panSidebarOptions, setPanSidebarOptions] = useState<
    inboxOptionsType | undefined
  >({});

  const setOpenPanSidebar = (
    isOpen: boolean,
    type: panSidebarType,
    inboxOptions?: inboxOptionsType
  ) => {
    setPanSidebarOptions(inboxOptions);
    setPanSidebarType(type);
    setIsPanSidebarOpen(isOpen);
  };

  return (
    <PanSidebarContext.Provider
      value={{
        isPanSidebarOpen,
        panSidebarType,
        panSidebarOptions,
        setOpenPanSidebar,
      }}
    >
      {children}
    </PanSidebarContext.Provider>
  );
};
