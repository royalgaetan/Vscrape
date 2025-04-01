import { format, formatDistanceToNow, subDays } from "date-fns";

export const formatDurationFromMs = (ms: number): string => {
  if (ms < 1000) return `${ms} ms`;

  const seconds = ms / 1000;
  if (seconds < 60) return `${seconds.toFixed(1)} sec`;

  const minutes = seconds / 60;
  if (minutes < 60) return `${minutes.toFixed(1)} min`;

  const hours = minutes / 60;
  if (hours < 24) return `${hours.toFixed(1)} hr`;

  const days = hours / 24;
  if (days < 7) return `${days.toFixed(1)} days`;

  const weeks = days / 7;
  if (weeks < 4) return `${weeks.toFixed(1)} weeks`;

  const months = days / 30;
  if (months < 12) return `${months.toFixed(1)} months`;

  const years = days / 365;
  return `${years.toFixed(1)} years`;
};

export const getTimeAgoWithLimit = (date: Date, suffix?: boolean) => {
  // If date if more than 1 month
  if (date.getTime() > subDays(Date.now(), 29).getTime()) {
    return formatDistanceToNow(date, {
      addSuffix: true,
    });
  } else {
    return `${suffix ? "on " : ""}${format(date, "MMM dd, yyyy")}`;
  }
};

export const formatLargeNumber = (num: number): string => {
  if (num < 1000) return num.toString(); // No abbreviation if < 1000

  const units = ["K", "M", "B", "T"]; // Kilo, Million, Billion, Trillion
  let unitIndex = -1;
  let formattedNum = num;

  while (formattedNum >= 1000 && unitIndex < units.length - 1) {
    formattedNum /= 1000;
    unitIndex++;
  }

  return `${parseFloat(formattedNum.toFixed(1))}${units[unitIndex]}`;
};
