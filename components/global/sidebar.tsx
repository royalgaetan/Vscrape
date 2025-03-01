import React from "react";
import CustomButton from "./custom_button";
import { useAuth } from "@/hooks/useAuth";

const Sidebar = () => {
  const { isAuthenticated, isLoading, logout } = useAuth();

  return (
    <div className="h-screen bg-neutral-100 font-bold w-[200px] text-neutral-500 p-4 flex flex-col justify-between">
      <div>Sidebar</div>
      <div>
        <CustomButton
          key={"logout"}
          text="Logout"
          onClick={logout}
          emoji="📴"
        />
      </div>
    </div>
  );
};

export default Sidebar;
