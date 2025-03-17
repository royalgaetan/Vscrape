"use client";
import { createContext, useState } from "react";

export const panSidebarContext = createContext<panSidebarContextType | null>(
  null
);

export type panSidebarType = "trash" | "inbox";

type panSidebarContextType = {
  isPanSidebarOpen: boolean;
  setIsPanSidebarOpen: (val: boolean) => void;
  panSidebarType: panSidebarType;
  setPanSidebarType: (type: panSidebarType) => void;
};

export const PanSidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isPanSidebarOpen, setIsPanSidebarOpen] = useState<boolean>(false);
  const [panSidebarType, setPanSidebarType] = useState<panSidebarType>("inbox");

  return (
    <panSidebarContext.Provider
      value={{
        isPanSidebarOpen,
        setIsPanSidebarOpen,
        panSidebarType,
        setPanSidebarType,
      }}
    >
      {children}
    </panSidebarContext.Provider>
  );
};
