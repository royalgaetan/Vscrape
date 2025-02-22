"use client";

import { redirect } from "next/navigation";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <div>Here the Dashboard</div>
      <br />
      <button onClick={() => redirect("/settings")}>Go to settings ⚙️</button>
    </>
  );
};

export default Dashboard;
