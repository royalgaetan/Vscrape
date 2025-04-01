"use client";

import AppSidebar from "@/components/global/app_sidebar";
import NotFoundComponent from "@/components/global/not_found_component";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { SIDEBAR_WIDTH } from "@/lib/constants";
import React from "react";

const NotFound = () => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? (
    <NotFoundComponent />
  ) : (
    <SidebarProvider
      style={{ "--sidebar-width": SIDEBAR_WIDTH } as React.CSSProperties}
    >
      <div className="flex flex-1 h-full w-full">
        <div>
          <AppSidebar />
        </div>
        <main className="flex flex-1">
          <div className="flex flex-col w-full">
            {/* Page Content */}
            <div className="flex flex-1">
              <NotFoundComponent showBackButton={false} />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default NotFound;
