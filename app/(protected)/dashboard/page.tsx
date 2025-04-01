"use client";
import React from "react";
import SystemHealth from "./_components/system_health";
import ActivityFeed from "./_components/activity_feed";
import DashboardPinned from "./_components/dashboard_pinned";
import StatsAndMetricsSection from "./_components/stats_section";

const Dashboard = () => {
  return (
    <div className="flex flex-1 h-full items-start justify-center w-full pr-7 pl-10">
      {/* Stats & Cards: Left Section */}
      <div className="flex flex-1 w-full mr-[19rem] -mt-4">
        <div className="flex flex-col pr-4 w-full">
          {/* Header */}
          <div className="mb-4">
            <h2 className="font-bold text-3xl mb-[0.5px] text-[#333]">
              Dashboard
            </h2>
            <p className="text-muted-foreground/80 font-normal text-sm">
              All your workflows and stats
            </p>
          </div>

          {/* Workflows & Stats */}
          <StatsAndMetricsSection />

          {/* Pinned */}
          <DashboardPinned />
        </div>
      </div>

      {/* System Health & Feed: Right Section */}
      <div className="w-72 absolute right-10 pl-5 pt-7 h-[92vh] flex flex-col border-l-[1px] border-l-muted overflow-clip ">
        {/* Systeme Health */}
        <SystemHealth />

        {/* Activity Feed */}
        <ActivityFeed />
      </div>
    </div>
  );
};

export default Dashboard;
