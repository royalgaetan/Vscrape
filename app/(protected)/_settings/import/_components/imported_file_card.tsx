import React from "react";
import { importedFile, importedFileType } from "../import_settings";
import {
  LucideIcon,
  Link,
  FileJson,
  FileText,
  FileCode,
  FileDown,
  Eye,
  MoreHorizontal,
  Database,
} from "lucide-react";
import {
  capitalizeFirstLetter,
  cn,
  formatFileSize,
  getTimeAgoWithLimit,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarIcon } from "@/components/global/app_sidebar";

export const getFileIcon = (fileType: importedFileType): LucideIcon => {
  switch (fileType) {
    case "link":
      return Link;
    case "json":
      return FileJson;
    case "markdown":
      return FileDown;
    case "txt":
      return FileText;
    case "html":
      return FileCode;
    default:
      return FileText; // Fallback icon
  }
};

const ImportedFileCard = ({ ifile }: { ifile: importedFile }) => {
  const Icon = getFileIcon(ifile.fileType);
  return (
    <div className="group/ImportedFileItem bg-transparent hover:bg-neutral-100/45 border-neutral-200 border rounded-xl px-4 py-2 cursor-pointer flex flex-1 gap-3 items-center justify-start">
      {/* Icon */}
      <div className="">
        <Icon className="stroke-neutral-700 size-8 stroke-[1px]" />
      </div>

      {/* Details */}
      <div className="flex flex-1">
        <div className="flex flex-col ">
          {/* Title */}
          <div className="font-medium text-neutral-800 text-sm">
            {capitalizeFirstLetter(ifile.name)}
          </div>

          {/* Date */}
          <span className="font-normal text-neutral-500 text-xs mt-[2px]">
            Imported {getTimeAgoWithLimit(ifile.importedAt, true)}
          </span>

          {/* File size & Category */}
          <span className="font-normal text-neutral-500 text-xs mt-[2px] flex gap-1 items-center">
            {ifile.fileCategory === "Knowledge Base" && (
              <Database className="size-3 stroke-primary" />
            )}
            <span
              className={cn(
                ifile.fileCategory === "Knowledge Base" &&
                  "text-primary font-semibold"
              )}
            >
              {" "}
              {ifile.fileCategory}
            </span>{" "}
            ● <span>{formatFileSize(ifile.fileSizeInBytes)}</span>
          </span>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex">
        {/* Preview */}
        <Button
          variant={"ghost"}
          className={cn(
            "hidden group-hover/ImportedFileItem:flex w-8 transition-all duration-300 h-8 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm"
          )}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {/* Icon */}
          <SidebarIcon
            defaultIcon={Eye}
            isExpandable={false}
            type="icon"
            isSelected={undefined}
          />
        </Button>

        {/* More Options */}
        <Button
          variant={"ghost"}
          className={cn(
            "hidden group-hover/ImportedFileItem:flex w-8 transition-all duration-300 h-8 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm"
          )}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {/* Icon */}
          <SidebarIcon
            defaultIcon={MoreHorizontal}
            isExpandable={false}
            type="icon"
            isSelected={undefined}
          />
        </Button>
      </div>
    </div>
  );
};

export default ImportedFileCard;
