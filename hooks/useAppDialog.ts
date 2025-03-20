"use client";

import { AppDialogContext } from "@/providers/appDialogProvider";
import { useContext } from "react";

export const useAppDialog = () => {
  const context = useContext(AppDialogContext);

  if (!context) {
    throw new Error("useAppDialog must be used within an AppDialogProvider");
  }

  return context;
};
