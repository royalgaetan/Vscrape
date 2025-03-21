import React from "react";
import SettingItemSelect from "../../_settings/_components/settings_item_select";
import { Separator } from "@/components/ui/separator";
import StatsCard from "./fake_stats";
import DashboardHeader from "./dashboard_header";
import { CoinsIcon, LucideIcon, Play, RouteIcon, Zap } from "lucide-react";

const Stats = () => {
  return (
    <div className="mt-4 w-full flex flex-col gap-3">
      {/* Header */}
      <DashboardHeader
        headerText={"Workflows and Metrics"}
        buttons={
          <div className="w-min flex gap-2">
            {/* Select a Workflow */}
            <SettingItemSelect
              label="Select a workflow"
              selectedItemValue={"timezoneSelected.value"}
              data={{
                Workflows: [
                  {
                    label: "All",
                    value: "all",
                  },
                  {
                    label: "Shopify Store",
                    value: "gljnr390Fgpnegr290VN0beKLZKaap",
                  },
                  {
                    label: "New users (FB Ads)",
                    value: "ldk20FLMAdfrop$lkdf&lm0vOIm012",
                  },
                ],
              }}
              onSelect={(workflowSelected) => {}}
            />

            {/* Select a Period */}
            <SettingItemSelect
              label="Select a period"
              selectedItemValue={"timezoneSelected.value"}
              data={{
                Periods: [
                  {
                    label: "Today",
                    value: "21-03-2025",
                  },
                  {
                    label: "Yesterday",
                    value: "21-03-2025",
                  },
                ],
              }}
              onSelect={(periodSelected) => {}}
            />
          </div>
        }
      />

      <div className="flex flex-flex-1 gap-6">
        <div className="flex flex-col justify-evenly h-full gap-5">
          <MetricButton text="Workflow executions" value={402} bgIcon={Zap} />
          <MetricButton
            text="Phases executions"
            value={593}
            bgIcon={RouteIcon}
          />
          <MetricButton
            text="Credits consumed"
            value={3941}
            bgIcon={CoinsIcon}
          />
        </div>
        {/* Stats Card */}
        <StatsCard />
      </div>
    </div>
  );
};

export default Stats;

export const MetricButton = ({
  text,
  value,
  bgIcon,
}: {
  text: string;
  value: number;
  bgIcon?: LucideIcon;
}) => {
  const Icon = bgIcon;
  return (
    <div className="relative overflow-clip rounded-2xl w-56 h-full cursor-pointer border-[2.1px] hover:bg-primary/5 bg-white border-gray-200 px-5 py-4">
      <div className="flex flex-col">
        <h3 className="text-base font-semibold text-[#333]">{text}</h3>
        <p className="text-primary/80 font-bold text-lg -mt-1">{value}</p>
      </div>
      {Icon && (
        <div className="absolute -top-6 -right-6 opacity-20">
          <Icon className="size-20 rotate-[30deg] stroke-primary/70" />
        </div>
      )}
    </div>
  );
};
