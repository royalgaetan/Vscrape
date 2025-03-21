import React from "react";
import DashboardHeader from "./dashboard_header";
import SettingItemButton from "../../_settings/_components/settings_item_button";

const DashboardPinned = () => {
  return (
    <div className="mt-14 mb-44">
      {/* Header */}
      <DashboardHeader
        headerText={"Pinned"}
        buttons={
          <div className="w-min flex gap-2">
            <SettingItemButton text="Pin a workflow" onClick={() => {}} />
          </div>
        }
      />

      {/* Pinned Workflows */}
      <div className="mt-2 rounded-3xl bg-orange-300 h-44 w-full"></div>
    </div>
  );
};

export default DashboardPinned;
