"use client";

import React, { useContext } from "react";
import Sidebar from "@/components/global/sidebar";
import { redirect } from "next/navigation";
import AuthContext from "@/providers/authProvider";
import CustomButton from "@/components/global/custom_button";
import CustomLoader from "@/components/global/loader";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, logout } = useContext(AuthContext);

  if (isLoading) {
    return <CustomLoader />;
  }
  if (!isAuthenticated) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-1 ">
      <Sidebar />
      <div className="pl-4 pt-5 flex flex-col gap-3">
        <div>{children}</div>

        <div>
          <CustomButton
            key={"logout"}
            text="Logout"
            onClick={logout}
            emoji="📴"
          />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
