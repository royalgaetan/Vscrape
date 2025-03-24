"use client";

import React, { useState } from "react";
import { folderType } from "./layout";
import WorkflowHeader from "./_components/workflow_header";
import SettingItemSearchBar from "../_settings/_components/settings_item_searchbar";
import { fakeWorkflows } from "@/lib/fake_data";
import WorkflowCard, {
  getTriggerModeIcon,
  getTriggerModeText,
  getWorkflowStateIcon,
  WorkflowCardType,
} from "./_components/workflow_card";
import {
  capitalizeFirstLetter,
  cn,
  formatNumber,
  getTimeAgoWithLimit,
  isSearchTermFound,
} from "@/lib/utils";
import {
  Folder,
  Pin,
  Coins,
  LucideIcon,
  PinOff,
  Text,
  UserPen,
  Clock,
  ToggleLeft,
  ToggleRight,
  ShieldCloseIcon,
  ShieldCheck,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import WorkflowList from "./_components/workflow_list";

const WorkflowDefault = () => {
  const defaultFolder: folderType = {
    folderColor: "#ffffff",
    folderName: "All",
    folderPath: "",
  };

  return (
    <div className="mt-0 pt-0">
      <WorkflowList folder={defaultFolder} workflowList={fakeWorkflows} />
    </div>
  );
};

export default WorkflowDefault;
