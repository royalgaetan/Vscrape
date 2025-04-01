"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { getWMode } from "./w_header";
import WEditorSidebar from "../editor/_components/w_sidebar_editor";
import WRunsSidebar from "../runs/_components/w_sidebar_runs";

const WSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-[17rem] h-full">
      {getWMode(pathname) === "Editor" && <WEditorSidebar />}
      {getWMode(pathname) === "Runs" && <WRunsSidebar />}
    </div>
  );
};

export default WSidebar;
