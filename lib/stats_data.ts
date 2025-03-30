import { formatISO, startOfToday, startOfTomorrow } from "date-fns";
import { DateRange } from "react-day-picker";
import { statsData } from "./fake_data";

export const getStatsData = (
  periodSelected: DateRange | undefined,
  workflowsSelected: string[]
) => {
  const dateFrom = periodSelected?.from ?? startOfToday();
  const dateTo = periodSelected?.to ?? startOfTomorrow();

  // Get only data from workflows selected
  const onlyWorkflowSelectedObj = Object.fromEntries(
    Object.entries(statsData).filter(([n, vals]) =>
      workflowsSelected.includes(n)
    )
  );

  // Get only stats whose dates are within the period selected
  const onlyDatesSelectedArr = Object.values(onlyWorkflowSelectedObj)
    .flatMap((i) => i)
    .filter(
      (val) =>
        val.date.getTime() >= dateFrom.getTime() &&
        val.date.getTime() <= dateTo.getTime()
    );

  // Reduce the date, and merge data of same dates
  const mergedDates = Object.values(
    onlyDatesSelectedArr.reduce((acc, curr) => {
      const key = formatISO(curr.date);

      if (!acc[key]) {
        acc[key] = { ...curr };
      } else {
        acc[key].workflow_execution_succeed += curr.workflow_execution_succeed;
        acc[key].workflow_execution_failed += curr.workflow_execution_failed;
        acc[key].phase_execution_succeed += curr.phase_execution_succeed;
        acc[key].phase_execution_failed += curr.phase_execution_failed;
        acc[key].phase_credit_succeed += curr.phase_credit_succeed;
        acc[key].phase_credit_failed += curr.phase_credit_failed;
      }

      return acc;
    }, {} as Record<string, (typeof onlyDatesSelectedArr)[number]>)
  );

  return mergedDates.sort((a, b) => a.date.getTime() - b.date.getTime());
};

export const statsNumber = (
  periodSelected: DateRange | undefined,
  workflowsSelected: string[]
) => {
  if (workflowsSelected.length === 0 || periodSelected === undefined) {
    return {
      workflow_execution_number: null,
      phase_execution_number: null,
      phase_credit_succeed: null,
    };
  }
  const sum = getStatsData(periodSelected, workflowsSelected).reduce(
    (acc, curr) => {
      acc.workflow_execution_number +=
        curr.workflow_execution_succeed + curr.workflow_execution_failed;
      acc.phase_execution_number +=
        curr.phase_execution_succeed + curr.phase_execution_failed;

      acc.phase_credit_succeed += curr.phase_credit_succeed;

      return acc;
    },
    {
      workflow_execution_number: 0,
      phase_execution_number: 0,
      phase_credit_succeed: 0,
    }
  );

  return {
    workflow_execution_number: sum.workflow_execution_number,
    phase_execution_number: sum.phase_execution_number,
    phase_credit_succeed: sum.phase_credit_succeed,
  };
};
