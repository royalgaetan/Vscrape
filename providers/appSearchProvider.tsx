"use client";
import { useAuth } from "@/hooks/useAuth";
import { Filter, Inbox, Settings, Workflow, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const AppSearchContext = createContext<AppSearchContextValues | null>(
  null
);

type AppSearchContextValues = {
  isSearchDialogOpen: boolean;
  setOpenSearchDialog: (val: boolean) => void;
};

export const AppSearchProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSearchDialogOpen, setOpenSearchDialog] = useState(false);

  return (
    <AppSearchContext.Provider
      value={{ isSearchDialogOpen, setOpenSearchDialog }}
    >
      {children}
    </AppSearchContext.Provider>
  );
};

export default AppSearchProvider;
