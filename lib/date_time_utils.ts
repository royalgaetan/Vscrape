import {
  Duration,
  DurationUnit,
  format,
  formatDistanceToNow,
  subDays,
} from "date-fns";
import { twoDigits } from "./string_utils";

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = MS_PER_SECOND * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;
const MS_PER_WEEK = MS_PER_DAY * 7;
const MS_PER_MONTH = MS_PER_DAY * 30.44; // Average month length
const MS_PER_YEAR = MS_PER_DAY * 365.25; // Average year length with leap years

export const getDurationLabel = (unit: DurationUnit) => {
  switch (unit) {
    case "days":
      return "d";
    case "hours":
      return "hrs";
    case "minutes":
      return "min";
    case "seconds":
      return "sec";
    default:
      return "";
  }
};

export const formatDurationMs = (
  durationMs: number,
  display: (
    | "years"
    | "months"
    | "weeks"
    | "days"
    | "hours"
    | "minutes"
    | "seconds"
  )[]
) => {
  const _fullDuration = millisecondsToDuration(durationMs);
  const y = display.includes("years")
    ? `:${twoDigits(_fullDuration.years)}`
    : "";
  const m = display.includes("months")
    ? `:${twoDigits(_fullDuration.months)}`
    : "";
  const w = display.includes("weeks")
    ? `:${twoDigits(_fullDuration.weeks)}`
    : "";
  const d = display.includes("days") ? `:${twoDigits(_fullDuration.days)}` : "";
  const hrs = display.includes("hours")
    ? `:${twoDigits(_fullDuration.hours)}`
    : "";
  const min = display.includes("minutes")
    ? `:${twoDigits(_fullDuration.minutes)}`
    : "";
  const sec = display.includes("seconds")
    ? `:${twoDigits(_fullDuration.seconds)}`
    : "";
  const format = `${y}${m}${w}${d}${hrs}${min}${sec}`;
  if (format.startsWith(":")) {
    return format.slice(1);
  }
  return format;
};

export const durationToMilliseconds = (duration: Duration): number => {
  return (
    (duration.years ?? 0) * MS_PER_YEAR +
    (duration.months ?? 0) * MS_PER_MONTH +
    (duration.weeks ?? 0) * MS_PER_WEEK +
    (duration.days ?? 0) * MS_PER_DAY +
    (duration.hours ?? 0) * MS_PER_HOUR +
    (duration.minutes ?? 0) * MS_PER_MINUTE +
    (duration.seconds ?? 0) * MS_PER_SECOND
  );
};

export const millisecondsToDuration = (ms: number): Duration => {
  const duration: Duration = {};

  duration.years = Math.floor(ms / MS_PER_YEAR);
  ms -= duration.years * MS_PER_YEAR;

  duration.months = Math.floor(ms / MS_PER_MONTH);
  ms -= duration.months * MS_PER_MONTH;

  duration.weeks = Math.floor(ms / MS_PER_WEEK);
  ms -= duration.weeks * MS_PER_WEEK;

  duration.days = Math.floor(ms / MS_PER_DAY);
  ms -= duration.days * MS_PER_DAY;

  duration.hours = Math.floor(ms / MS_PER_HOUR);
  ms -= duration.hours * MS_PER_HOUR;

  duration.minutes = Math.floor(ms / MS_PER_MINUTE);
  ms -= duration.minutes * MS_PER_MINUTE;

  duration.seconds = Math.floor(ms / MS_PER_SECOND);

  return duration;
};

export const isValidISODateString = (
  testDate: string | undefined | null
): boolean => {
  if (!testDate) return false;

  const parsed = new Date(testDate);
  return !isNaN(parsed.getTime());
};

export const isValidDateString = (input: string): boolean => {
  if (!input || typeof input !== "string") return false;

  const normalized = input.trim();

  // Match common formats: YYYY-MM-DD, YYYY/MM/DD, DD/MM/YYYY, MM/DD/YYYY
  const datePatterns = [
    {
      regex: /^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?$/,
      format: "YYYY-MM-DD",
    },
    {
      regex: /^(\d{4})\/(\d{2})\/(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?$/,
      format: "YYYY/MM/DD",
    },
    {
      regex: /^(\d{2})\/(\d{2})\/(\d{4})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?$/,
      format: "DD/MM/YYYY or MM/DD/YYYY",
    },
  ];

  for (const { regex } of datePatterns) {
    const match = normalized.match(regex);
    if (match) {
      let [_, y, m, d] = match;

      // Try to detect which field is year/month/day based on format
      if (y.length === 4) {
        // YYYY-MM-DD format
        const year = parseInt(y, 10);
        const month = parseInt(m, 10);
        const day = parseInt(d, 10);
        if (month < 1 || month > 12) return false;
        if (day < 1 || day > 31) return false;
        return true;
      } else {
        // Possibly DD/MM/YYYY or MM/DD/YYYY
        const day = parseInt(y, 10); // y = dd
        const month = parseInt(m, 10);
        const year = parseInt(d, 10); // d = yyyy

        if (month < 1 || month > 12) return false;
        if (day < 1 || day > 31) return false;
        return true; // could enhance with more logic to distinguish DD/MM vs MM/DD
      }
    }
  }

  return false;
};

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

// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------

//  Minute labels (0 minute, 1 minute, 2 minutes, ...)
export const minuteLabels: string[] = Array.from(
  { length: 60 },
  (_, i) => `${i}`
);

// Hour labels (11AM, 12PM, 1PM, ..., 10PM)
export const hourLabels: string[] = Array.from({ length: 24 }, (_, i) => {
  const hour12 = i % 12 || 12; // Convert to 12-hour format (1 - 12)
  const period = i < 12 ? "AM" : "PM"; // AM for hours 0-11, PM for hours 12-23
  return `${hour12} ${period}`;
});

// Day of the Month labels (1st, 2nd, 3rd, ..., 31st)
export const DayOfMonthLabels: string[] = Array.from({ length: 31 }, (_, i) => {
  const day = i + 1;
  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";
  return `${day}${suffix}`;
});

// Month labels (January, February, ...)
export const monthLabels: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// 5. Day of the Week labels (Monday, Tuesday, ...)
export const dayOfWeekLabels: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const cronPresets: { label: string; value: string }[] = [
  { label: "Every Minute", value: "* * * * *" },
  { label: "Every 5 Minutes", value: "*/5 * * * *" },
  { label: "Every 15 Minutes", value: "*/15 * * * *" },
  { label: "Every 30 Minutes", value: "*/30 * * * *" },

  { label: "Hourly", value: "0 * * * *" },
  { label: "Every 2 Hours", value: "0 */2 * * *" },
  { label: "Every 6 Hours", value: "0 */6 * * *" },

  { label: "At 9 AM Daily", value: "0 9 * * *" },
  { label: "At 6 PM Daily", value: "0 18 * * *" },
  { label: "At 11:30 PM Daily", value: "30 23 * * *" },

  { label: "Every Monday at 9 AM", value: "0 9 * * 1" },
  { label: "Weekdays at 8 AM", value: "0 8 * * 1-5" },
  { label: "Weekends at 10 AM", value: "0 10 * * 6,0" },

  { label: "1st of Every Month at Midnight", value: "0 0 1 * *" },
  { label: "Last Day of the Month at 11 PM", value: "0 23 28-31 * *" }, // depends on extra logic
  {
    label: "Quarterly (1st Jan/Apr/Jul/Oct) at 6 AM",
    value: "0 6 1 1,4,7,10 *",
  },
  { label: "Yearly (Jan 1st at Midnight)", value: "0 0 1 1 *" },
];
