"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import CustomLoader from "@/components/global/loader";
import Sidebar from "@/components/global/sidebar";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <CustomLoader />;
  }
  if (!isAuthenticated) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-1 h-full w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-1 h-full w-full"
      >
        <ResizablePanel
          defaultSize={17}
          maxSize={22}
          minSize={17}
          className="h-screen bg-[#F8F8F7]"
        >
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="flex flex-1">{children}</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default RootLayout;
