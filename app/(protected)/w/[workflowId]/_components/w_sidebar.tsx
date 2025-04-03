"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { getWMode } from "./w_header";
import WEditorSidebar from "../editor/_components/w_sidebar_editor";
import WRunsSidebar from "../runs/_components/w_sidebar_runs";
import WVersionsSidebar from "../versions/_components/w_sidebar_versions";

const WSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-[18rem] h-full">
      {getWMode(pathname) === "Editor" && <WEditorSidebar />}
      {getWMode(pathname) === "Runs" && <WRunsSidebar />}
      {getWMode(pathname) === "Versions" && <WVersionsSidebar />}
    </div>
  );
};

export default WSidebar;
