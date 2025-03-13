import React from "react";
import SettingDialogHeader from "../_components/settings_dialog_header";
import SettingItemButton from "../_components/settings_item_button";
import SettingsItemField from "../_components/settings_item_field";

const ApiSettings = () => {
  return (
    <div className="w-full h-full overflow-x-scroll flex flex-col items-start justify-start pr-7 pl-5 pb-28">
      {/* Connected Apps */}
      <div className="flex flex-col gap-2 w-full mt-7">
        <SettingDialogHeader title="API" />
        <div className="w-full h-full">
          {/* Apps Connected list */}
          <SettingsItemField
            title="API Keys"
            subtitle="Manage, add, or remove your APIs keys"
            cta={
              <SettingItemButton text="Add a new API key" onClick={() => {}} />
            }
          />
        </div>
      </div>

      {/* Webhook Apps */}
      <div className="flex flex-col gap-2 w-full mt-7">
        <SettingDialogHeader title="Webhooks" />
        <div className="w-full h-full">
          {/* Webhooks list */}
          <SettingsItemField
            title="Your webhooks"
            subtitle="Manage, add, or remove your different webhooks"
            cta={<SettingItemButton text="Add a webhook" onClick={() => {}} />}
          />
        </div>
      </div>
    </div>
  );
};

export default ApiSettings;
