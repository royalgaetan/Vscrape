"use client";

import CustomButton from "@/components/global/custom_button";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <h2 className="my-2 font-bold text-lg">Dashboard 📉</h2>
      <br />
      <CustomButton
        text="Go to settings"
        onClick={() => redirect("/settings")}
        emoji="⚙️"
      />
      <CustomButton
        text="Go to Wizard"
        onClick={() => redirect("/wizard")}
        emoji="🪄"
      />
    </>
  );
};

export default Dashboard;
