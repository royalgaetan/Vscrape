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

const DurationPicker = ({
  children,
  onSelect,
  initialDurationMs,
}: {
  children: React.ReactNode;
  onSelect: (durationMs: number) => void;
  initialDurationMs: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDuration, setCurrentDuration] = useState<Duration>(
    millisecondsToDuration(initialDurationMs)
  );

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
      if (typeof _duration.hours !== "undefined" && !isNaN(_duration.hours)) {
        if (_duration.hours < 99) {
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
        if (isOpen === false) {
          onSelect(durationToMilliseconds(currentDuration));
        }
      }}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="w-54 justify-center items-center py-0 px-7 rounded-sm border border-border">
        <div className="flex flex-1 justify-center items-center gap-5 my-2">
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
        </div>
        <div className="flex flex-1 justify-center items-center text-xs scale-75 mb-1 text-neutral-400/70 font-medium">
          Use and <KeyBox Icon={ArrowUp} /> and <KeyBox Icon={ArrowDown} /> to
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
      className="flex flex-col justify-evenly items-center w-1/3"
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
        <span className="text-neutral-700 text-base">{twoDigits(value)}</span>{" "}
        <span className="text-neutral-500 text-sm">
          {" "}
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
