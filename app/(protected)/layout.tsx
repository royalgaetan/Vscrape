"use client";

import React, { useEffect, useRef } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import CustomLoader from "@/components/global/loader";
import AppSidebar from "@/components/global/app_sidebar";
import AppHeader from "@/components/global/app_header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SIDEBAR_WIDTH } from "@/lib/values";
import { AppPanSidebar } from "@/components/global/app_pan_sidebar";
import { usePanSidebar } from "@/hooks/usePanSidebar";
import MoreDialog from "./_more/more_dialog";
import SearchModal from "./_search/search";
import SettingsDialog from "./_settings/settings_dialog";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, isLoading } = useAuth();
  const { setOpenPanSidebar } = usePanSidebar();

  useEffect(() => {
    if (mainContainerRef.current) {
      mainContainerRef.current.addEventListener("click", () => {
        setOpenPanSidebar(false, "inbox");
      });
    }
  }, []);

  if (isLoading) {
    return <CustomLoader />;
  }
  if (!isAuthenticated) {
    return redirect("/login");
  }

  return (
    <SidebarProvider
      style={{ "--sidebar-width": SIDEBAR_WIDTH } as React.CSSProperties}
    >
      <div className="flex flex-1 h-full w-full">
        <div className="relative top-0 left-0 z-50 h-full">
          <AppSidebar />
        </div>
        <main className="flex flex-1 m-0 pl-5 relative">
          {/* Pan Sidebar */}
          <AppPanSidebar />

          <div ref={mainContainerRef} className="flex flex-col w-full">
            {/* Main Header */}
            <AppHeader />

            {/* Page Content */}
            <div className="flex flex-1">{children}</div>
          </div>
        </main>
      </div>

      {/* Search Modal */}
      <SearchModal />

      {/* More Modal  */}
      <MoreDialog />

      {/* Settings Modal */}
      <SettingsDialog />
    </SidebarProvider>
  );
};

export default RootLayout;
