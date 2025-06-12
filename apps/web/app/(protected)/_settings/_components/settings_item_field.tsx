import { cn } from "@/lib/utils";
import React from "react";

const SettingsItemField = ({
  title,
  subtitle,
  subtitlePrefix,
  titleClassName,
  subtitleClassName,
  cta,
}: {
  title: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  subtitlePrefix?: React.ReactNode;
  cta: React.ReactNode;
}) => {
  return (
    <div className="mb-5 mt-1 flex flex-1 justify-between items-start">
      <div className="flex flex-col truncate">
        <h6 className={cn("text-sm font-medium select-none", titleClassName)}>
          {title}
        </h6>
        <p
          className={cn(
            "flex flex-1 items-center mt-1 text-muted-foreground text-xs font-normal",
            subtitleClassName
          )}
        >
          <span> {subtitlePrefix ?? subtitlePrefix}</span>
          <span>{subtitle}</span>
        </p>
      </div>

      <div>{cta}</div>
    </div>
  );
};

export default SettingsItemField;
