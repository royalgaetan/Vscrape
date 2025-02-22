"use client";

import React, { useContext } from "react";
import Sidebar from "@/components/global/sidebar";
import { redirect } from "next/navigation";
import AuthContext from "@/providers/authProvider";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, logout } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return redirect("/login");
  }

  return (
    <div>
      <Sidebar />
      <br />

      <h1>User A</h1>
      {children}

      <br />
      <br />
      <button onClick={() => logout()}>Logout 👤</button>
    </div>
  );
};

export default RootLayout;
