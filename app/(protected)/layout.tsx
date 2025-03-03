"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import CustomLoader from "@/components/global/loader";
import AppSidebar from "@/components/global/app_sidebar";
import AppHeader from "@/components/global/app_header";
import { SidebarProvider } from "@/components/ui/sidebar";
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <CustomLoader />;
  }
  if (!isAuthenticated) {
    return redirect("/login");
  }

  return (
    <SidebarProvider>
      <div className="flex flex-1 h-full w-full">
        <AppSidebar />
        <main className="flex flex-1">
          <div className="flex flex-col w-full">
            {/* Main Header */}
            <AppHeader />

            {/* Page Content */}
            <div className="flex flex-1">{children}</div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
