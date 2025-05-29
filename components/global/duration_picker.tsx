import React, { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  LucideIcon,
} from "lucide-react";
import { Duration, DurationUnit } from "date-fns";
import {
  durationToMilliseconds,
  getDurationLabel,
  millisecondsToDuration,
} from "@/lib/date_time_utils";
import { twoDigits } from "@/lib/string_utils";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const DurationPicker = ({
  children,
  onSelect,
  initialDurationMs,
  setOpen,
  isTimePicker,
}: {
  children: React.ReactNode;
  onSelect: (durationMs: number) => void;
  initialDurationMs: number;
  setOpen?: boolean;
  isTimePicker?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDuration, setCurrentDuration] = useState<
    Duration | undefined
  >();

  useEffect(() => {
    if (isOpen === true) {
      setCurrentDuration(
        typeof initialDurationMs === "number"
          ? millisecondsToDuration(initialDurationMs)
          : undefined
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (setOpen) setIsOpen(setOpen);
  }, [setOpen]);

  const increase = (unit: DurationUnit) => {
    let _duration: Duration = { ...currentDuration };

    // Increase Seconds
    if (unit === "seconds") {
      if (
        typeof _duration.seconds !== "undefined" &&
        !isNaN(_duration.seconds)
      ) {
        if (_duration.seconds < 59) {
          _duration.seconds += 1;
        }
      } else {
        _duration.seconds = 0;
      }
    }
    // Increase Minutes
    else if (unit === "minutes") {
      if (
        typeof _duration.minutes !== "undefined" &&
        !isNaN(_duration.minutes)
      ) {
        if (_duration.minutes < 59) {
          _duration.minutes += 1;
        }
      } else {
        _duration.minutes = 0;
      }
    }

    // Increase Hours
    else if (unit === "hours") {
      const hourLimitMax = isTimePicker ? 23 : 99;
      if (typeof _duration.hours !== "undefined" && !isNaN(_duration.hours)) {
        if (_duration.hours < hourLimitMax) {
          _duration.hours += 1;
        }
      } else {
        _duration.hours = 0;
      }
    }

    // Update current duration
    setCurrentDuration(_duration);
  };

  const decrease = (unit: DurationUnit) => {
    let _duration: Duration = { ...currentDuration };

    // Decrease Hours
    if (unit === "hours") {
      if (typeof _duration.hours !== "undefined" && !isNaN(_duration.hours)) {
        if (_duration.hours > 0) {
          _duration.hours -= 1;
        }
      } else {
        _duration.hours = 0;
      }
    }

    // Decrease Minutes
    else if (unit === "minutes") {
      if (
        typeof _duration.minutes !== "undefined" &&
        !isNaN(_duration.minutes)
      ) {
        if (_duration.minutes > 0) {
          _duration.minutes -= 1;
        }
      } else {
        _duration.minutes = 0;
      }
    }

    // Decrease Seconds
    if (unit === "seconds") {
      if (
        typeof _duration.seconds !== "undefined" &&
        !isNaN(_duration.seconds) &&
        _duration.seconds > 0
      ) {
        _duration.seconds -= 1;
      } else {
        _duration.seconds = 0;
      }
    }

    // Update current duration
    setCurrentDuration(_duration);
  };

  return (
    <Popover
      modal
      open={isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen);

        const durationToMs =
          currentDuration && durationToMilliseconds(currentDuration);
        if (isOpen === false && durationToMs && durationToMs > 0) {
          onSelect(durationToMs);
        }
      }}
    >
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        onInteractOutside={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(false);
          onSelect(initialDurationMs);
        }}
        className="w-54 justify-center items-center px-0 py-0 rounded-sm border border-border"
      >
        <div className="flex flex-1 justify-center items-center gap-5 my-2 mx-7">
          {/* Hours */}
          <SectionPicker
            value={currentDuration?.hours ?? 0}
            unit="hours"
            onIncrease={() => {
              increase("hours");
            }}
            onDecrease={() => {
              decrease("hours");
            }}
          />
          {/* Minutes */}
          <SectionPicker
            value={currentDuration?.minutes ?? 0}
            unit="minutes"
            onIncrease={() => {
              increase("minutes");
            }}
            onDecrease={() => {
              decrease("minutes");
            }}
          />
          {/* Seconds */}
          {!isTimePicker && (
            <SectionPicker
              value={currentDuration?.seconds ?? 0}
              unit="seconds"
              onIncrease={() => {
                increase("seconds");
              }}
              onDecrease={() => {
                decrease("seconds");
              }}
            />
          )}
        </div>
        <div className="flex flex-1">
          <Button
            onClick={() => {
              setIsOpen(false);
              if (currentDuration)
                onSelect(durationToMilliseconds(currentDuration));
            }}
            variant={"ghost"}
            className="w-full mx-3 h-6 mb-2 mt-0 hover:bg-accent/80 bg-accent/40 hover:text-accent-foreground text-accent-foreground/70"
          >
            Save
          </Button>
        </div>
        <div className="flex flex-1 justify-center items-center text-xs scale-75 mb-1 text-neutral-400/70 font-medium">
          Use <KeyBox Icon={ArrowUp} /> and <KeyBox Icon={ArrowDown} /> to
          change.
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DurationPicker;

const SectionPicker = ({
  value,
  unit,
  onIncrease,
  onDecrease,
}: {
  value: number;
  unit: DurationUnit;
  onIncrease: () => void;
  onDecrease: () => void;
}) => {
  const upBtn = useRef<HTMLButtonElement>(null);
  const downBtn = useRef<HTMLButtonElement>(null);

  return (
    <button
      className="flex flex-col justify-evenly items-center w-1/3 group/sectionPicker"
      onKeyDown={(e) => {
        if (e.key === "ArrowUp") {
          if (upBtn.current) upBtn.current.focus();
          onIncrease();
        } else if (e.key === "ArrowDown") {
          if (downBtn.current) downBtn.current.focus();
          onDecrease();
        }
      }}
      onBlur={() => {
        // Unfocus Up and Down Buttons
        if (upBtn.current) upBtn.current.blur();
        if (downBtn.current) downBtn.current.blur();
      }}
    >
      {/* Up Arrow: Increase */}
      <button
        ref={upBtn}
        onPointerDown={() => onIncrease()}
        className="h-4 flex items-center active:scale-90 hover:opacity-90 transition-all duration-100 group/increaseBtn"
      >
        <ChevronUp className="size-4 stroke-neutral-400 group-hover/increaseBtn:stroke-neutral-700" />
      </button>

      {/* Numerical Value */}
      <div className="w-7 font-medium flex flex-col">
        <span className="text-neutral-700 group-focus-within/sectionPicker:text-primary text-base">
          {twoDigits(value)}
        </span>
        <span className="text-neutral-500 group-focus-within/sectionPicker:text-primary/70 text-sm">
          {getDurationLabel(unit)}
        </span>
      </div>

      {/* Down Arrow: Decrease */}
      <button
        ref={downBtn}
        onMouseDown={() => onDecrease()}
        className="h-4 flex items-center active:scale-90 hover:opacity-90 transition-all duration-100 group/decreaseBtn"
      >
        <ChevronDown className="size-4 stroke-neutral-400 group-hover/decreaseBtn:stroke-neutral-700" />
      </button>
    </button>
  );
};

const KeyBox = ({
  Icon,
  boxClassName,
  iconClassName,
}: {
  Icon: LucideIcon;
  boxClassName?: string;
  iconClassName?: string;
}) => {
  return (
    <span
      className={cn(
        "border border-neutral-400/70 rounded-[4px] mx-1 flex justify-center items-center",
        boxClassName
      )}
    >
      <Icon className={cn("size-3", iconClassName)} />
    </span>
  );
};
