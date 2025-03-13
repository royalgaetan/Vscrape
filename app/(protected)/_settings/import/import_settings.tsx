import React from "react";
import SettingDialogHeader from "../_components/settings_dialog_header";
import SettingItemButton from "../_components/settings_item_button";
import SettingsItemField from "../_components/settings_item_field";
import {
  Code2,
  FileJson,
  FileText,
  ImportIcon,
  Link,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ImportSettings = () => {
  return (
    <div className="w-full h-full overflow-x-scroll flex flex-col items-start justify-start pr-7 pl-5 pb-28">
      {/* Import Anything */}
      <div className="flex flex-col gap-2 w-full mt-7">
        <SettingDialogHeader title="Import" />
        <div className="w-full h-full">
          <SettingsItemField
            title="Import a Workflow"
            subtitle="You can import a workflow by dragging and dropping your file below"
            cta={<div></div>}
          />
        </div>

        <div className="min-h-44 mx-4 mb-10 mt-3 flex flex-1 justify-center items-center rounded-2xl bg-neutral-200/60 hover:bg-neutral-200/90 cursor-pointer transition-all duration-200">
          <div className="flex flex-1 gap-2 text-neutral-500 stroke-neutral-400 justify-center items-center">
            <ImportIcon />
            <span className="font-semibold text-xs">
              Drag and drop your file here
            </span>
          </div>
        </div>

        <div className="w-full h-full mt-7">
          <SettingsItemField
            title="Quick import"
            subtitle="Or by using these shortcuts"
            cta={<div></div>}
          />
          <div className="grid grid-cols-4 gap-4 mt-4 mb-24 bg-">
            <ImportShortcut
              icon={Link}
              text="From a Link"
              iconClassName="stroke-blue-600"
              onClick={() => {}}
            />
            <ImportShortcut
              icon={FileJson}
              text="From JSON"
              iconClassName="stroke-yellow-600"
              onClick={() => {}}
            />
            <ImportShortcut
              icon={FileText}
              iconClassName="stroke-red-700"
              text="From Text (.txt)"
              onClick={() => {}}
            />
            <ImportShortcut
              icon={Code2}
              iconClassName="stroke-emerald-700"
              text="From HTML"
              onClick={() => {}}
            />
            <ImportShortcut
              icon={FileText}
              iconClassName="stroke-pink-700"
              text="From Markdown"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportSettings;

const ImportShortcut = ({
  text,
  icon,
  iconClassName,
  textClassName,
  onClick,
}: {
  text: string;
  iconClassName?: string;
  textClassName?: string;
  icon: LucideIcon;
  onClick: () => void;
}) => {
  const Icon = icon;
  return (
    <button
      onClick={() => onClick()}
      className="col-span-1 flex flex-1 gap-2 h-10 px-3 items-center justify-start hover:hover:bg-neutral-200/60 transition-all duration-200 cursor-pointer border-[2px] bg-white border-neutral-300 rounded-xl"
    >
      <Icon className={cn("size-4 stroke-[#333]", iconClassName)} />
      <span className={cn("font-semibold text-xs text-[#333]", textClassName)}>
        {text}
      </span>
    </button>
  );
};
