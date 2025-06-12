import { cn } from "@/lib/utils";
import { LucideIcon, MonitorCog, Moon, Sun } from "lucide-react";
import React from "react";

export type themeType = "dark" | "light" | "system";

export const themes: Record<themeType, LucideIcon> = {
  light: Sun,
  dark: Moon,
  system: MonitorCog,
};

const SettingItemThemeSwitcher = ({
  themeSeleted,
  onSelect,
}: {
  themeSeleted: themeType;
  onSelect: (themeSelected: themeType) => void;
}) => {
  return (
    <div className="flex cursor-pointer border-2 border-gray-300 rounded-full p-0">
      {Object.entries(themes).map(([th, icon]) => {
        const Icon = icon;
        const theme = th as themeType;
        return (
          <button
            onClick={() => onSelect(theme)}
            key={theme}
            className={cn(
              "h-7 w-7 flex justify-center items-center scale-[1.07] transition-transform duration-300",
              themeSeleted === theme &&
                "bg-transparent border-2 border-gray-300 rounded-full bg-gray-100"
            )}
          >
            <Icon className="size-3" />
          </button>
        );
      })}
    </div>
  );
};

export default SettingItemThemeSwitcher;
