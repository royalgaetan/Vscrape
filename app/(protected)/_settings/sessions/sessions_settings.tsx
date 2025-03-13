import React, { useEffect, useState } from "react";
import SettingDialogHeader from "../_components/settings_dialog_header";
import SettingItemButton from "../_components/settings_item_button";
import SettingsItemField from "../_components/settings_item_field";
import SettingItemTable from "../_components/settings_item_table";
import { HelpCircle, Monitor, Smartphone, Tablet, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";

export type SessionType = {
  deviceType: React.ReactNode;
  deviceName: string;
  lastActive: string;
  location: string;
  action: React.ReactNode;
  isActive: boolean;
};

const getLogoutButton = (): React.ReactNode => {
  return (
    <Button
      className="hover:opacity-80 hover:no-underline"
      size={"xs"}
      variant={"outline"}
      onClick={() => {}}
    >
      Log out
    </Button>
  );
};

export const getDeviceIcon = (deviceType: string): React.ReactNode => {
  let className = "stroke-muted-foreground mb-[0.13rem] size-[1.1rem]";
  switch (deviceType.toLowerCase()) {
    case "computer":
      return <Monitor className={className} />;
    case "mobile":
      return <Smartphone className={className} />;
    case "tablet":
      return <Tablet className={className} />;
    case "smart tv":
      return <Tv className={className} />;
    default:
      return <HelpCircle className={className} />;
  }
};

export const userSessions: SessionType[] = [
  {
    deviceType: getDeviceIcon("Computer"),
    deviceName: "Windows 11",
    lastActive: "now",
    location: "St Pierre, Mauritius",
    action: getLogoutButton(),
    isActive: true,
  },
  {
    deviceType: getDeviceIcon("Mobile"),
    deviceName: "iPhone 14 Pro",
    lastActive: "2 hours ago",
    location: "Port Louis, Mauritius",
    action: getLogoutButton(),
    isActive: false,
  },
  {
    deviceType: getDeviceIcon("Mobile"),
    deviceName: "iPad Air (5th Gen)",
    lastActive: "yesterday",
    location: "Beau Bassin, Mauritius",
    action: getLogoutButton(),
    isActive: false,
  },
  {
    deviceType: getDeviceIcon(""),
    deviceName: "MacBook Pro M1",
    lastActive: "3 days ago",
    location: "Rose Hill, Mauritius",
    action: getLogoutButton(),
    isActive: false,
  },
  {
    deviceType: getDeviceIcon("Smart TV"),
    deviceName: "Samsung Tizen OS",
    lastActive: "5 days ago",
    location: "Quatre Bornes, Mauritius",
    action: getLogoutButton(),
    isActive: false,
  },
];

const SessionsSettings = () => {
  const [sessionData, setSessionData] = useState<SessionType[]>([]);
  const [isLoading, setLoading] = useState(false);

  const getSessions = async () => {
    setLoading(true);
    setSessionData([]);
    setTimeout(() => {
      setSessionData(userSessions);
      setLoading(false);
    }, 700);
  };

  useEffect(() => {
    getSessions();
  }, []);

  return (
    <div className="w-full h-full overflow-x-scroll flex flex-col items-start justify-start pr-7 pl-5 pb-28">
      {/* Sessions */}
      <div className="flex flex-col gap-2 w-full mt-7">
        <SettingDialogHeader title="Devices" />
        <div className="w-full h-full">
          {/* Active Devices */}
          <SettingItemTable
            dataType="sessions"
            isLoading={isLoading}
            tableCaption="All devices where you're logged in have been loaded."
            data={sessionData}
            onRefresh={() => getSessions()}
          />
        </div>
      </div>

      {/* Sessions */}
      <div className="flex flex-col gap-2 w-full mt-10">
        <SettingDialogHeader title="More" />
        <div className="w-full h-full">
          {/* Revoke All Sessions */}
          <SettingsItemField
            title="Revoke All Sessions"
            titleClassName="text-destructive"
            subtitle="Log out from all devices except this one"
            cta={
              <SettingItemButton
                text="Revoke Other Sessions"
                onClick={() => {}}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SessionsSettings;
