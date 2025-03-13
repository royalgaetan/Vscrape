import React from "react";
import SettingDialogHeader from "../_components/settings_dialog_header";
import SettingsItemField from "../_components/settings_item_field";
import SettingItemAvatar from "../_components/settings_item_avatar";
import SettingItemButton from "../_components/settings_item_button";
import { CheckCircle2Icon } from "lucide-react";

const AccountSettings = () => {
  return (
    <div className="w-full h-full overflow-x-scroll flex flex-col items-start justify-start pr-7 pl-5 pb-28">
      {/* Update Personal Information */}
      <div className="flex flex-col gap-2 w-full mt-7">
        <SettingDialogHeader title="Personal" />
        <div className="w-full h-full">
          {/* Name */}
          <SettingsItemField
            title="Change your name"
            subtitle="Royal GAETAN"
            cta={<SettingItemButton text="Change name" onClick={() => {}} />}
          />
        </div>
        {/* Profile Picture */}
        <SettingsItemField
          title="Change your Profile Picture"
          subtitle="Click the Refresh Icon to change the profile picture"
          cta={<SettingItemAvatar />}
        />
      </div>

      {/* Update Security Informations */}
      <div className="flex flex-col gap-2 w-full">
        <SettingDialogHeader title="Security" />
        <div className="w-full h-full">
          {/* Email */}
          <SettingsItemField
            title="Change your email"
            subtitle="gaetanroyalpro@gmail.com"
            cta={<SettingItemButton text="Change email" onClick={() => {}} />}
          />
          {/* Verify Email */}
          <SettingsItemField
            title="Get your email verified"
            subtitle="Verified"
            subtitleClassName="font-bold text-primary"
            subtitlePrefix={
              <CheckCircle2Icon className="size-[0.8rem] stroke-primary stroke-2 mr-1 mb-[0.59px]" />
            }
            cta={
              <SettingItemButton
                text="Verify email"
                disabled
                onClick={() => {}}
              />
            }
          />

          {/* Password */}
          <SettingsItemField
            title="Change your password"
            subtitle="Set a new password to access to your account"
            cta={
              <SettingItemButton text="Change password" onClick={() => {}} />
            }
          />
        </div>
      </div>

      {/* Support Items */}
      <div className="flex flex-col gap-2 w-full mt-10">
        <SettingDialogHeader title="Support" />
        <div className="w-full h-full">
          {/* Delete Account */}
          <SettingsItemField
            title="Delete My Account"
            titleClassName="text-destructive"
            subtitle="Permanently delete your account, including all your workflows and chats"
            cta={<SettingItemButton text="Delete Account" onClick={() => {}} />}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
