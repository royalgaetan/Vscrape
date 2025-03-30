import React, { useState } from "react";
import SettingItemSelect from "../../_settings/_components/settings_item_select";
import DashboardHeader from "./dashboard_header";
import { CoinsIcon, LucideIcon, RouteIcon, Zap } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import StatsCharts from "./stats_charts";
import { statsData } from "@/lib/fake_data";
import { max, min, startOfToday, subDays } from "date-fns";
import DatePickerWithRange from "@/components/global/date_range_picker";
import { DateRange } from "react-day-picker";
import MultiSelect from "@/components/global/multi_select";
import { statsNumber } from "@/lib/stats_data";

export type statsMetricType =
  | "workflow_execution"
  | "phase_execution"
  | "credit_consumed";

const StatsAndMetricsSection = () => {
  const statsWorkflowsNames = Object.keys(statsData);
  const [periodSelected, setPeriodSelected] = useState<DateRange | undefined>({
    from: subDays(Date.now(), 10),
    to: startOfToday(),
  });
  const [workflowsSelected, setWorkflowsSelected] =
    useState<string[]>(statsWorkflowsNames);

  const statsDates = Object.values(statsData).flatMap((item) =>
    item.map((i) => i.date)
  );

  const [metricTypeSelected, setMetricTypeSelected] =
    useState<statsMetricType>("workflow_execution");

  const handleSelect = (value: string) => {
    if (value === "all") {
      if (areAllWorkflowsSelected()) {
        setWorkflowsSelected([]);
      } else {
        setWorkflowsSelected(statsWorkflowsNames);
      }
    } else {
      setWorkflowsSelected((prev) => {
        if (prev.includes(value)) {
          return prev.filter((v) => v !== value);
        } else {
          return [...prev, value];
        }
      });
    }
  };

  const areAllWorkflowsSelected = (): boolean => {
    return (
      workflowsSelected.filter((v) => v !== "all").length ===
      statsWorkflowsNames.length
    );
  };

  const getWorkflowSelectLabel = () => {
    if (workflowsSelected.length === 0) {
      return "Select a workflow";
    } else if (workflowsSelected.length === 1) {
      const val = Object.keys(statsData).find(
        (s) => s === workflowsSelected[0]
      );
      if (val) {
        return val;
      } else {
        return "1 workflow selected";
      }
    } else if (areAllWorkflowsSelected()) {
      return "All";
    } else {
      return `${workflowsSelected.length} workflows selected`;
    }
  };

  return (
    <div className="mt-4 w-full flex flex-col gap-3">
      {/* Header */}

      <DashboardHeader
        headerText={"Workflows and Metrics"}
        buttons={
          <div className="w-min flex gap-2">
            {/* Select a Workflow */}
            <MultiSelect
              triggerClassName="w-44"
              label={getWorkflowSelectLabel()}
              data={{
                "": [
                  {
                    label: "Select All",
                    value: "all",
                  },
                ],
                "Your Workflows": statsWorkflowsNames.map((w) => ({
                  value: w,
                  label: w,
                })),
              }}
              selectedValues={
                areAllWorkflowsSelected()
                  ? workflowsSelected.concat(["all"])
                  : workflowsSelected
              }
              handleSelect={handleSelect}
            />

            {/* Select a Period */}
            <DatePickerWithRange
              showPresets
              fromDate={min(statsDates)}
              toDate={max(statsDates)}
              date={periodSelected}
              onSelect={(dateRange) => setPeriodSelected(dateRange)}
            />
          </div>
        }
      />
      <div className="flex flex-flex-1 gap-2">
        <div className="flex flex-col justify-start h-full gap-3">
          <MetricButton
            text="Workflow executions"
            value={
              statsNumber(periodSelected, workflowsSelected)
                .workflow_execution_number
            }
            bgIcon={Zap}
            isSelected={metricTypeSelected === "workflow_execution"}
            onSelect={() => {
              setMetricTypeSelected("workflow_execution");
            }}
          />
          <MetricButton
            text="Phases executions"
            value={
              statsNumber(periodSelected, workflowsSelected)
                .phase_execution_number
            }
            bgIcon={RouteIcon}
            isSelected={metricTypeSelected === "phase_execution"}
            onSelect={() => {
              setMetricTypeSelected("phase_execution");
            }}
          />
          <MetricButton
            text="Credits consumed"
            value={
              statsNumber(periodSelected, workflowsSelected)
                .phase_credit_succeed
            }
            bgIcon={CoinsIcon}
            isSelected={metricTypeSelected === "credit_consumed"}
            onSelect={() => {
              setMetricTypeSelected("credit_consumed");
            }}
          />
        </div>
        {/* Stats Card */}
        <StatsCharts
          metricType={metricTypeSelected}
          periodSelected={periodSelected}
          workflowsSelected={workflowsSelected}
        />
      </div>
    </div>
  );
};

export default StatsAndMetricsSection;

export const MetricButton = ({
  text,
  value,
  bgIcon,
  isSelected,
  onSelect,
}: {
  text: string;
  value: number | null;
  bgIcon?: LucideIcon;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const Icon = bgIcon;
  return (
    <button
      onClick={() => onSelect()}
      className={cn(
        "relative overflow-clip rounded-lg w-40 h-16 px-5 py-1 cursor-pointer hover:bg-primary/10 bg-primary/5 border border-gray-200 transition-all duration-100",
        isSelected && "bg-primary/80 hover:bg-primary/80 border-none"
      )}
    >
      <div className="flex flex-col items-start">
        <h3
          className={cn(
            "text-xs font-semibold text-gray-600",
            isSelected && "text-white/90"
          )}
        >
          {text}
        </h3>
        <p
          className={cn(
            "text-gray-800 font-bold text-base mt-0",
            isSelected && "text-white"
          )}
        >
          {value === null ? "—" : formatNumber(value)}
        </p>
      </div>
      {Icon && (
        <div className="absolute -top-6 -right-6">
          <Icon
            className={cn(
              "size-20 rotate-[30deg] stroke-primary/5",
              isSelected && "stroke-white/10"
            )}
          />
        </div>
      )}
    </button>
  );
};
