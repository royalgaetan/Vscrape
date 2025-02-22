"use client";

import { redirect } from "next/navigation";
import React from "react";

const SettingsPage = () => {
  return (
    <>
      <div>SettingsPage</div>
      <br />
      <button onClick={() => redirect("/dashboard")}>Up to Dashboard 📈</button>
    </>
  );
};

export default SettingsPage;
