import React, { useEffect, useState } from "react";
import SettingItemButton from "../_components/settings_item_button";
import SettingsItemField from "../_components/settings_item_field";
import SettingDialogHeader from "../_components/settings_dialog_header";
import { Button } from "@/components/ui/button";
import SettingItemTable from "../_components/settings_item_table";
import { SessionType, userSessions } from "../sessions/sessions_settings";
import { scrollToEl } from "@/lib/utils";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { appsConnectionList } from "@/lib/constants";
import SettingItemSearchBar from "../_components/settings_item_searchbar";

export type ConnectedAppType = {
  appLogoPath: string;
  name: string;
  connectionDate: Date;
  status: "Active" | "Expired";
  action: React.ReactNode;
};

const getRemoveConnectedAppButton = (): React.ReactNode => {
  return (
    <Button
      className="hover:opacity-80 hover:no-underline"
      size={"xs"}
      variant={"outline"}
      onClick={() => {}}
    >
      Remove App
    </Button>
  );
};

export const connectedApps: ConnectedAppType[] = [
  {
    appLogoPath: "/logos/google drive.svg",
    name: "Google Drive",
    connectionDate: new Date(2024, 3, 1, 12, 5),
    status: "Active",
    action: getRemoveConnectedAppButton(),
  },
  {
    appLogoPath: "/logos/slack.svg",
    name: "Slack",
    connectionDate: new Date(2025, 1, 19, 1, 33),
    status: "Expired",
    action: getRemoveConnectedAppButton(),
  },
  {
    appLogoPath: "/logos/dropbox.svg",
    name: "Dropbox",
    connectionDate: new Date(2024, 11, 17, 16, 3),
    status: "Active",
    action: getRemoveConnectedAppButton(),
  },
  {
    appLogoPath: "/logos/github.svg",
    name: "GitHub",
    connectionDate: new Date(2024, 3, 9, 23, 46),
    status: "Active",
    action: getRemoveConnectedAppButton(),
  },
  {
    appLogoPath: "/logos/zoom.svg",
    name: "Zoom",
    connectionDate: new Date(2024, 2, 18, 21, 47),
    status: "Expired",
    action: getRemoveConnectedAppButton(),
  },
  {
    appLogoPath: "/logos/airtable.svg",
    name: "Airtable",
    connectionDate: new Date(2024, 0, 3, 1, 49),
    status: "Active",
    action: getRemoveConnectedAppButton(),
  },
];

const IntegrationSettings = () => {
  const [connectedAppsData, setConnecconnectedAppsData] = useState<
    ConnectedAppType[]
  >([]);
  const [isLoadingConnectedApps, setLoadingConnectedApps] = useState(false);

  const getConnectedApps = async () => {
    setLoadingConnectedApps(true);
    setConnecconnectedAppsData([]);
    setTimeout(() => {
      setConnecconnectedAppsData(connectedApps);
      setLoadingConnectedApps(false);
    }, 700);
  };

  useEffect(() => {
    getConnectedApps();
  }, []);

  return (
    <div
      className="w-full h-full overflow-x-scroll flex flex-col items-start justify-start pr-7 pl-5 pb-28"
      id="integrationSettingsContainer"
    >
      {/* Connected Apps */}
      <div className="flex flex-col gap-2 w-full mt-7">
        <SettingDialogHeader title="Connections" />
        <div className="w-full h-full">
          {/* Apps Connected list */}
          <SettingsItemField
            title="Connected Apps"
            subtitle="Manage, add, or remove connections to third-party apps"
            cta={
              <SettingItemButton
                text="Connect a new App"
                onClick={() => {
                  scrollToEl({
                    parentId: "integrationSettingsContainer",
                    id: "discoverNewConnection",
                  });
                }}
              />
            }
          />

          <SettingItemTable
            dataType="connectedApps"
            isLoading={isLoadingConnectedApps}
            tableCaption="All third-party apps you've connected are loaded. Refresh to sync."
            data={connectedAppsData}
            onRefresh={() => getConnectedApps()}
          />
        </div>
      </div>

      {/* Discover new connections */}
      <div
        className="flex flex-col gap-2 w-full mt-14"
        id="discoverNewConnection"
      >
        <SettingDialogHeader title="Discover new connections" />

        <div className="w-full h-full">
          {/* All Available App Connections */}
          <SettingsItemField
            title="All Connections"
            subtitle="Scroll through the list or quickly search for an app you’d like to connect"
            cta={
              <SettingItemSearchBar
                inputType="search"
                placeholder="Search for an app to connect..."
                onTextChange={(val) => {}}
                onSubmit={(val) => {}}
                onCancel={() => {}}
              />
            }
          />
        </div>

        <div className="w-full h-full grid grid-cols-3 gap-3">
          {appsConnectionList
            .sort((a, b) => a.appName.localeCompare(b.appName))
            .map((app, i) => {
              return (
                <div
                  key={app.appName}
                  className="flex flex-col h-[10rem] px-5 py-5 items-start justify-start relative hover:hover:bg-neutral-200/60 transition-all duration-200 group/newApp cursor-pointer border-[2px] bg-white border-neutral-300 rounded-xl"
                >
                  <div className="absolute z-50 top-4 right-4 group-hover/newApp:block hidden transition-all duration-300">
                    <ArrowUpRight className="size-5 stroke-primary/60 stroke-2" />
                  </div>
                  <div className="relative h-10 w-10 mb-2">
                    <Image
                      src={app.appLogoPath}
                      alt={app.appLogoPath}
                      className="select-none object-contain"
                      fill
                    />
                  </div>

                  <h3 className="w-full text-black font-semibold text-base truncate">
                    {app.appName}
                  </h3>
                  <p className="text-muted-foreground mt-1 text-xs line-clamp-3">
                    {app.description}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default IntegrationSettings;
