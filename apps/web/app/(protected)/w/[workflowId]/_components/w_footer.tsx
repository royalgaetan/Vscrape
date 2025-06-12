"use client";
import LogoAndText from "@/app/(auth)/_components/logo_and_text";
import SettingItemThemeSwitcher, {
  themeType,
} from "@/app/(protected)/_settings/_components/settings_item_theme_switcher";
import React, { useState } from "react";

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
