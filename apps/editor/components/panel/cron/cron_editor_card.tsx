import React, { useEffect, useState } from "react";
import {
  AlarmClockIcon,
  Calendar1Icon,
  CalendarDaysIcon,
  CalendarFoldIcon,
  Clock,
  Clock9,
  LucideIcon,
} from "lucide-react";
import { MultiSelect, Input, cn, cronSectionList } from "@vscrape/ui";
import {
  getCronExpFromValues,
  getCronSectionValues,
  getValuesFromCronExp,
} from "@vscrape/engine/src";

const CronEditorCard = ({
  initialValue,
  cronSection,
  onChange,
  mainValuesHaveError,
  stepValueHasError,
  cleanMainValuesErrors,
  cleanStepValueError,
}: {
  cronSection: (typeof cronSectionList)[number];
  initialValue?: string;
  onChange: (cronSectionExp: string) => void;
  mainValuesHaveError?: boolean;
  stepValueHasError?: boolean;
  cleanMainValuesErrors?: () => void;
  cleanStepValueError?: () => void;
}) => {
  const [mainValues, setMainValues] = useState<number[]>([]);
  const [stepValue, setStepValue] = useState<number>(0);

  useEffect(() => {
    if (initialValue) {
      setMainValues(getValuesFromCronExp(cronSection, initialValue).main);
      setStepValue(getValuesFromCronExp(cronSection, initialValue).step);
    }
  }, [initialValue]);

  const getLabelAndIcon = (): { label: string; icon: LucideIcon } => {
    switch (cronSection) {
      case "Minute":
        return {
          label: "Minutes",
          icon: Clock,
        };
      case "Hour":
        return {
          label: "Hours",
          icon: Clock9,
        };
      case "Day of Month":
        return {
          label: "What Days",
          icon: Calendar1Icon,
        };
      case "Month":
        return {
          label: "Month",
          icon: CalendarDaysIcon,
        };
      case "Day of Week":
        return {
          label: "Week's day",
          icon: CalendarFoldIcon,
        };

      default:
        return {
          label: "",
          icon: AlarmClockIcon,
        };
    }
  };
  const Icon = getLabelAndIcon().icon;

  const getFirstSentenceTerm = (): string => {
    const isFull =
      mainValues.length === getCronSectionValues(cronSection).length;
    let term = "";
    if (isFull) {
      if (cronSection === "Day of Week") {
        term = "from";
      } else if (cronSection === "Day of Month") {
        term = "on";
      }
    } else if (!isFull) {
      if (cronSection === "Day of Week" || cronSection === "Month") {
        term = "on";
      } else {
        term = "at";
      }
    }

    return `Runs ${term}`;
  };

  return (
    <div className="flex flex-col w-full hover:bg-neutral-200/20 transition-all duration-200 px-4 pt-2 pb-5">
      {/* Icon + Label */}
      <div className="flex flex-1  line-clamp-1 items-center gap-2 text-neutral-700 text-sm font-medium mb-2">
        <Icon className="!size-4 stroke-neutral-600" />
        <span>{getLabelAndIcon().label}</span>
      </div>
      <div className="w-full flex-col text-xs text-neutral-600">
        <div className="flex flex-1 max-w-full">
          {/* Initial Value */}

          <div className="min-w-fit">{getFirstSentenceTerm()}</div>
          <InlineSelector
            cronSection={cronSection}
            initialValue={mainValues}
            hasError={mainValuesHaveError}
            onSelect={(range) => {
              cleanMainValuesErrors && cleanMainValuesErrors();
              // Handle Range Values: 5-10 | 6,7,8
              if (!Array.isArray(range)) return;
              setMainValues(range);
              onChange(getCronExpFromValues(cronSection, range, stepValue));
            }}
            type="Multi"
          />
        </div>
        {mainValues.length > 0 && (
          <div className="flex flex-1 max-w-full">
            With
            <InlineSelector
              cronSection={cronSection}
              initialValue={stepValue}
              hasError={stepValueHasError}
              type="Number"
              onSelect={(step) => {
                cleanStepValueError && cleanStepValueError();
                // Handle Step Values: */5
                if (typeof step !== "number") return;
                setStepValue(step);
                onChange(getCronExpFromValues(cronSection, mainValues, step));
              }}
            />
            of interval.
          </div>
        )}
      </div>
    </div>
  );
};

export default CronEditorCard;

const InlineSelector = ({
  type,
  cronSection,
  onSelect,
  initialValue,
  hasError,
}: {
  type: "Multi" | "Number";
  cronSection: (typeof cronSectionList)[number];
  initialValue: number | number[];
  onSelect: (val: number | number[]) => void;
  hasError?: boolean;
}) => {
  const [localValue, setLocalValue] = useState<number[] | number>(initialValue);

  const valuesToSelectFrom = getCronSectionValues(cronSection);
  const numberInputMax =
    cronSection === "Hour" || cronSection === "Minute"
      ? valuesToSelectFrom.length - 1
      : valuesToSelectFrom.length;

  const getTerminology = (): string => {
    const addPlural =
      (Array.isArray(localValue) &&
        ((localValue.length === 1 && localValue[0] < 2) ||
          localValue.length === 0)) ||
      (typeof localValue === "number" && localValue < 2)
        ? ""
        : "s";
    switch (cronSection) {
      case "Minute":
        return `minute${addPlural}`;
      case "Hour":
        return `hour${
          Array.isArray(localValue) && localValue.length > 1 ? "s" : ""
        }`;
      case "Day of Month":
        return Array.isArray(localValue) ? "of the month" : `day${addPlural}`;
      case "Month":
        return Array.isArray(localValue) ? "" : `month${addPlural}`;
      case "Day of Week":
        return Array.isArray(localValue) ? "" : `day${addPlural}`;

      default:
        return "";
    }
  };

  const getLabel = (): string => {
    if (
      Array.isArray(localValue) &&
      localValue.length === valuesToSelectFrom.length
    ) {
      if (cronSection === "Minute") return "every";
      if (cronSection === "Hour") return "every";
      if (cronSection === "Day of Week") return "Monday to Sunday";
      if (cronSection === "Day of Month") return "any day";
      if (cronSection === "Month") return "every month";
      else return "each";
    } else if (Array.isArray(localValue) && localValue.length > 0) {
      return valuesToSelectFrom
        .filter((r) => localValue.includes(parseInt(Object.keys(r)[0])))
        .map((r) => Object.values(r)[0])
        .join(", ");
    } else {
      return "Select...";
    }
  };

  useEffect(() => {
    setLocalValue(initialValue);
  }, [initialValue]);

  return (
    <div className="flex">
      <div className="mx-1 cursor-pointer hover:opacity-70 transition-all duration-150">
        {type === "Multi" && Array.isArray(localValue) && (
          <MultiSelect
            popoverTriggerClassName={`bg-neutral-200 rounded-[6px] text-center pt-[2px] h-[1.2rem] w-fit px-2 border-b border-border mb-1`}
            triggerClassName={`pb-3 max-w-full ${
              cronSection === "Month" || cronSection === "Day of Week"
                ? "min-w-[8rem]"
                : "min-w-[4rem]"
            } line-clamp-1 ${hasError && "ring-[2px] ring-destructive/60"}`}
            triggerInline={true}
            dismissChevron={true}
            popoverAlignment="center"
            selectionMode={"multi"}
            popoverClassName="max-h-60 min-h-fit mr-5"
            label={getLabel()}
            itemTooltipClassname="w-52"
            data={{
              "": valuesToSelectFrom.map((record) => ({
                label: Object.values(record)[0],
                value: Object.keys(record)[0],
              })),
            }}
            selectedValues={localValue.map((i) => i.toString())}
            handleSelect={(cronSectionValueSelect) => {
              let enteredValues = [...localValue];
              const selectedValue: number = parseInt(cronSectionValueSelect);
              if (enteredValues.includes(selectedValue)) {
                enteredValues = enteredValues.filter(
                  (p) => p !== selectedValue
                );
              } else {
                enteredValues = [...enteredValues, selectedValue];
              }
              // Save Changes:
              setLocalValue(enteredValues);
              onSelect(enteredValues);
            }}
          />
        )}

        {type === "Number" && typeof localValue === "number" && (
          <Input
            onChange={(e) => {
              const valueEntered = parseInt(e.target.value);

              if (valueEntered > numberInputMax) return;
              setLocalValue(valueEntered);
              onSelect(valueEntered);
            }}
            onKeyDown={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
            type="number"
            defaultValue={localValue}
            min={0}
            max={numberInputMax}
            className={cn(
              "inline h-[1.2rem] w-[2.5rem] text-end !px-0 rounded-none bg-transparent border-0 ring-0 outline-none border-b border-border focus:outline-none focus:ring-0 active:outline-none active:ring-0 transition-all duration-300",
              hasError && "ring-[2px] ring-destructive/60 rounded-[6px]"
            )}
          />
        )}
      </div>
      <div className="mr-1 min-w-fit">{getTerminology()}</div>
    </div>
  );
};
