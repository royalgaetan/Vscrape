"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import CustomLoader from "@/components/global/loader";
import Sidebar from "@/components/global/sidebar";
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
      <Sidebar />
      <div className="flex flex-1">{children}</div>
    </div>
  );
};

export default RootLayout;
