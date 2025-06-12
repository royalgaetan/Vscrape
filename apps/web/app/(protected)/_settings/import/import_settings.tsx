import React, { useState } from "react";
import SettingDialogHeader from "../_components/settings_dialog_header";
import SettingsItemField from "../_components/settings_item_field";
import { ImportIcon, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { fakeImportedFiles } from "@/lib/fake_data";
import ImportedFileCard, {
  getFileIcon,
} from "./_components/imported_file_card";

export type importedFileCategory = "Knowledge Base" | "Workflow";
export type importedFileType = "link" | "json" | "markdown" | "txt" | "html";

export type importedFile = {
  name: string;
  importedAt: Date;
  fileCategory: importedFileCategory;
  fileType: importedFileType;
  fileSizeInBytes: number;
  isSafe: boolean;
};

const ImportSettings = () => {
  const [storageUsed, setStorageUsed] = useState<number>(79);

  return (
    <div className="w-full h-full overflow-x-scroll flex flex-col items-start justify-start pr-7 pl-5 pb-28">
      {/* Import Anything: Workflow or Knowledge Base */}
      <div className="flex flex-col gap-2 w-full mt-7">
        <SettingDialogHeader title="Import" />
        <div className="w-full h-full">
          <SettingsItemField
            title="Import something"
            subtitle="You can import a workflow or a knowledge base by dragging and dropping your file below"
            cta={<div></div>}
          />
        </div>

        <div className="min-h-44 mx-4 mb-6 mt-3 flex flex-1 justify-center items-center rounded-2xl bg-neutral-200/60 hover:bg-neutral-200/90 cursor-pointer transition-all duration-200">
          <div className="flex flex-1 gap-2 text-neutral-500 stroke-neutral-400 justify-center items-center">
            <ImportIcon />
            <span className="font-semibold text-xs">
              Drag and drop your file here
            </span>
          </div>
        </div>

        <div className="w-full h-full mt-0">
          <SettingsItemField
            title="Quick import"
            subtitle="Or by using these shortcuts"
            cta={<div></div>}
          />
          <div className="grid grid-cols-4 gap-4 mt-4 mb-16 bg-">
            <ImportShortcut
              icon={getFileIcon("link")}
              text="From a Link"
              iconClassName="stroke-blue-600"
              onClick={() => {}}
            />
            <ImportShortcut
              icon={getFileIcon("json")}
              text="From JSON"
              iconClassName="stroke-yellow-600"
              onClick={() => {}}
            />
            <ImportShortcut
              icon={getFileIcon("txt")}
              iconClassName="stroke-red-700"
              text="From Text (.txt)"
              onClick={() => {}}
            />
            <ImportShortcut
              icon={getFileIcon("html")}
              iconClassName="stroke-emerald-700"
              text="From HTML"
              onClick={() => {}}
            />
            <ImportShortcut
              icon={getFileIcon("markdown")}
              iconClassName="stroke-pink-700"
              text="From Markdown"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>

      {/* Import Manager */}
      <div className="flex flex-col gap-2 w-full mt-0">
        <SettingDialogHeader title="Import Manager" />
        <div className="w-full h-full">
          <SettingsItemField
            title="Imported Files"
            subtitle="View and manage all your imported files."
            cta={
              <div className="w-44 flex flex-col gap-1 items-end">
                <p className="text-xs font-medium ">
                  Storage used: {storageUsed}%
                </p>
                <Progress
                  value={storageUsed}
                  className="bg-neutral-300 transition-all duration-300"
                  indicatorClassName="bg-neutral-700"
                />
              </div>
            }
          />
        </div>

        <div className="w-full h-full">
          {fakeImportedFiles.length === 0 ? (
            <div className="mt-7 text-muted-foreground text-xs font-semibold flex justify-center items-center h-36">
              No file imported yet.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {fakeImportedFiles
                .sort((a, b) => b.importedAt.getTime() - a.importedAt.getTime())
                .map((importedFile) => (
                  <ImportedFileCard ifile={importedFile} />
                ))}
            </div>
          )}
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
