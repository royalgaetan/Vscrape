import { panSidebarContext } from "@/providers/panSidebarProvider";
import { useContext } from "react";

export const usePanSidebar = () => {
  const context = useContext(panSidebarContext);

  if (!context) {
    throw new Error("usePanSidebar must be used within an PanSidebarProvider");
  }

  return context;
};
