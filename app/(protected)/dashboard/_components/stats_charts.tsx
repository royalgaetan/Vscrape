import { XAxis, CartesianGrid, AreaChart, Area, Bar, BarChart } from "recharts";

import React from "react";
import { getFakeStatData } from "@/lib/fake_data";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { format } from "date-fns";
import { statsMetricType } from "./stats_section";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { getStatsData } from "@/lib/stats_data";

export type statsDataItemType = Record<
  string,
  {
    date: Date;
    workflow_execution_succeed: number;
    workflow_execution_failed: number;
    phase_execution_succeed: number;
    phase_execution_failed: number;
    phase_credit_succeed: number;
    phase_credit_failed: number;
  }[]
>;

export const statConfig = {
  workflow_execution: {
    workflow_execution_succeed: {
      label: "Workflow Success",
      color: "#6460aa",
    },
    workflow_execution_failed: {
      label: "Workflow Failed",
      color: "#d1cfe6",
    },
  } satisfies ChartConfig,

  phase_execution: {
    phase_execution_succeed: {
      label: "Phase Success",
      color: "#6460aa",
    },
    phase_execution_failed: {
      label: "Phase Failed",
      color: "#d1cfe6",
    },
  } satisfies ChartConfig,
  credit_consumed: {
    phase_credit_succeed: {
      label: "Credit Success",
      color: "#6460aa",
    },
    phase_credit_failed: {
      label: "Credit Failed",
      color: "#d1cfe6",
    },
  } satisfies ChartConfig,
};

const StatsCharts = ({
  metricType,
  periodSelected,
  workflowsSelected,
}: {
  metricType: statsMetricType;
  periodSelected: DateRange | undefined;
  workflowsSelected: string[];
}) => {
  const ChartType = metricType === "credit_consumed" ? BarChart : AreaChart;
  const ChartChild = metricType === "credit_consumed" ? Bar : Area;
  const radiusProps = (type: "success" | "failed") =>
    ChartChild === Bar
      ? {
          radius:
            type === "success"
              ? [0, 0, 4, 4]
              : ([4, 4, 0, 0] as [number, number, number, number]),
        }
      : { radius: 3 };

  return (
    <div className="w-full max-w-full p-4 relative">
      <ChartContainer
        config={statConfig[metricType]}
        className={cn(
          "w-full max-h-[16.3rem] relative z-10",
          workflowsSelected.length === 0 || periodSelected === undefined
            ? "opacity-20"
            : ""
        )}
      >
        <ChartType
          accessibilityLayer
          data={
            workflowsSelected.length > 0 && periodSelected !== undefined
              ? getStatsData(periodSelected, workflowsSelected)
              : getFakeStatData()
          }
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={"date"}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => format(value, "dd MMM")}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="min-w-[10rem] bg-neutral-700/80 text-white text-xs p-2"
                indicator="line"
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <ChartChild
            dataKey={Object.keys(statConfig[metricType])[0]}
            type={"basis"}
            stackId={"a"}
            fill={Object.values(statConfig[metricType])[0].color}
            stroke={Object.values(statConfig[metricType])[0].color}
            {...(radiusProps("success") as any)}
          />
          <ChartChild
            dataKey={Object.keys(statConfig[metricType])[1]}
            type={"basis"}
            stackId={"a"}
            fill={Object.values(statConfig[metricType])[1].color}
            stroke={Object.values(statConfig[metricType])[1].color}
            {...(radiusProps("failed") as any)}
          />
        </ChartType>
      </ChartContainer>

      {/* No workflow selected */}
      {workflowsSelected.length === 0 || periodSelected === undefined ? (
        <div className="absolute top-0 w-full h-full z-20 flex justify-center items-center">
          <div className="w-80 -translate-y-6 text-center text-muted-foreground text-base font-semibold flex justify-center items-center h-36 break-before-all">
            Please selected at least one workflow and a valid period to see
            stats...
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default StatsCharts;
