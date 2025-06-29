"use client";

import { useState } from "react";
import { LogoAndText, SettingItemThemeSwitcher, themeType } from "@vscrape/ui";

const WFooter = () => {
  const [themeSeleted, setThemeSeleted] = useState<themeType>("system");

  return (
    <div className="w-full h-[7vh] flex items-center px-3 border-t bg-neutral-100">
      <div className="flex flex-1 justify-between items-center">
        {/* App logo */}
        <div className="w-max">
          <LogoAndText
            logoWidth={22}
            logoHeight={22}
            textClassName={"text-sm"}
          />
        </div>

        <div className="w-max">
          {/* Theme Switcher */}
          <SettingItemThemeSwitcher
            themeSeleted={themeSeleted}
            onSelect={(theme) => setThemeSeleted(theme)}
          />
        </div>
      </div>
    </div>
  );
};

export default WFooter;
