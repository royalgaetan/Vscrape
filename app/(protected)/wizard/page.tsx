"use client";

import CustomButton from "@/components/global/custom_button";
import { redirect } from "next/navigation";
import React from "react";

const Wizard = () => {
  return (
    <>
      <h2 className="my-2 font-bold text-lg">Wizard 🪄</h2>
      <br />
      <CustomButton
        text="Go to Dashboard"
        onClick={() => redirect("/dashboard")}
        emoji="📈"
      />
      <br />
      <br />
      <CustomButton
        text="Go to settings"
        onClick={() => redirect("/settings")}
        emoji="⚙️"
      />
    </>
  );
};

export default Wizard;
