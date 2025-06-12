import React, { useState } from "react";
import SettingDialogHeader from "../_components/settings_dialog_header";
import SettingsItemField from "../_components/settings_item_field";
import SettingItemThemeSwitcher, {
  themeType,
} from "../_components/settings_item_theme_switcher";
import { capitalizeFirstLetter } from "@/lib/string_utils";
import SettingItemSelect from "../_components/settings_item_select";
import { appLanguages, appTimezones } from "@/lib/constants";

const PreferencesSettings = () => {
  const [themeSeleted, setThemeSeleted] = useState<themeType>("system");
  const [languageSelected, setLanguageSelected] = useState<
    (typeof appLanguages)[""][number]
  >(appLanguages[""][0]);

  const [timezoneSelected, setTimezoneSelected] = useState<
    (typeof appTimezones)[number][number]
  >(appTimezones["Africa"][4]);
  return (
    <div className="w-full h-full overflow-x-scroll flex flex-col items-start justify-start pr-7 pl-5 pb-28">
      {/* Update App Appearance */}
      <div className="flex flex-col gap-2 w-full mt-7">
        <SettingDialogHeader title="Appearance" />
        <div className="w-full h-full">
          {/* App Theme: dark | light | system */}
          <SettingsItemField
            title="App Theme"
            subtitle={capitalizeFirstLetter(themeSeleted.toString())}
            cta={
              <SettingItemThemeSwitcher
                themeSeleted={themeSeleted}
                onSelect={(theme) => setThemeSeleted(theme)}
              />
            }
          />
        </div>
      </div>

      {/* Language and Timezone */}
      <div className="flex flex-col gap-2 w-full mt-10">
        <SettingDialogHeader title="Language and Timezone" />
        <div className="w-full h-full">
          {/* App Language */}
          <SettingsItemField
            title="Language"
            subtitle={languageSelected.label}
            cta={
              <SettingItemSelect
                label="Select a Language"
                data={appLanguages}
                selectedItemValue={languageSelected.value}
                onSelect={(langValue) => {
                  let lang = Object.values(appLanguages)
                    .flat()
                    .find((lg) => lg.value === langValue);
                  if (lang) {
                    setLanguageSelected(lang);
                  }
                }}
              />
            }
          />
        </div>
        <div className="w-full h-full">
          {/* App Timezone */}
          <SettingsItemField
            title="Select your timezone"
            subtitle={timezoneSelected.label}
            cta={
              <SettingItemSelect
                label="Select a Timezone"
                selectedItemValue={timezoneSelected.value}
                data={appTimezones}
                onSelect={(timezoneValue) => {
                  let timezone = Object.values(appTimezones)
                    .flat()
                    .find((tz) => tz.value === timezoneValue);
                  if (timezone) {
                    setTimezoneSelected(timezone);
                  }
                }}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PreferencesSettings;
