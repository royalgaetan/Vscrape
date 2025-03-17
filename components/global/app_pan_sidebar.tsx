"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePanSidebar } from "@/hooks/usePanSidebar";
import Trash from "@/app/(protected)/_trash/trash";
import Inbox from "@/app/(protected)/_inbox/inbox";

export const AppPanSidebar = () => {
  const { panSidebarType, isPanSidebarOpen } = usePanSidebar();
  return (
    <AnimatePresence>
      {isPanSidebarOpen && (
        <motion.div
          initial={{ opacity: 0.2, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0.2, x: -400 }}
          transition={{ duration: 0.2 }}
          className="absolute top-0 left-0 z-30 h-full overflow-x-clip w-[22rem] shadow-[6px_0_12px_-4px_rgba(0,0,0,0.2)] bg-white border-neutral-300 border-r-2 flex justify-start items-start"
        >
          {panSidebarType === "trash" && <Trash />}
          {panSidebarType === "inbox" && <Inbox />}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
