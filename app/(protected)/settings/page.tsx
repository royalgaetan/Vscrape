"use client";

import CustomButton from "@/components/global/custom_button";
import { redirect } from "next/navigation";
import React from "react";

const SettingsPage = () => {
  return (
    <>
      <h2 className="my-2 font-bold text-lg">Settings ⚙️</h2>
      <br />
      <CustomButton
        text="Up to Dashboard"
        onClick={() => redirect("/dashboard")}
        emoji="📈"
      />
    </>
  );
};

export default SettingsPage;
