"use client";

import { AppSearchContext } from "@/providers/appSearchProvider";
import { useContext } from "react";

export const useSearch = () => {
  const context = useContext(AppSearchContext);

  if (!context) {
    throw new Error("useSearch must be used within an AppSearchProvider");
  }

  return context;
};
