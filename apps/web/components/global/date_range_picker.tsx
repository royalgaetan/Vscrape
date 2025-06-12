"use client";

import React, { useState } from "react";
import {
  endOfToday,
  endOfYesterday,
  format,
  startOfToday,
  startOfYesterday,
  subDays,
} from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";

const DatePickerWithRange = ({
  className,
  fromDate,
  toDate,
  date,
  showPresets,
  onSelect,
}: {
  date: DateRange | undefined;
  className?: string;
  showPresets?: boolean;
  fromDate?: Date;
  toDate?: Date;
  onSelect: (period: DateRange | undefined) => void;
}) => {
  const [isDatePickerOpen, setDatePickerOpen] = useState<boolean>();

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover onOpenChange={setDatePickerOpen} open={isDatePickerOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "h-8 w-fit px-2 text-xs border border-gray-300 bg-background hover:bg-accent/30 hover:text-accent-foreground justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "MMM dd, y")} -{" "}
                  {format(date.to, "MMM dd, y")}
                </>
              ) : (
                format(date.from, "MMM dd, y")
              )
            ) : (
              <span>Select a period</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto py-2 px-0" align="center">
          {/* Presets */}
          {showPresets && (
            <Select
              onValueChange={(value) => {
                // If Yesterday is selected
                if (parseInt(value) === 1) {
                  onSelect({
                    from: startOfYesterday(),
                    to: endOfYesterday(),
                  });
                } else {
                  const presetDate = subDays(startOfToday(), parseInt(value));
                  onSelect({
                    from:
                      fromDate !== undefined &&
                      presetDate.getTime() < fromDate.getTime()
                        ? fromDate
                        : presetDate,
                    to: endOfToday(),
                  });
                }
                setDatePickerOpen(false);
              }}
            >
              <SelectTrigger className="mx-2 w-[97%] bg-transparent">
                <SelectValue placeholder="Select a preset period..." />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="0">Today</SelectItem>
                <SelectItem value="1">Yesterday</SelectItem>
                <SelectItem value="2">Last 3 days</SelectItem>
                <SelectItem value="6">Last 7 days</SelectItem>
                <SelectItem value="29">Last 30 days</SelectItem>
                <SelectItem value="89">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          )}

          {/* <Separator className="my-2" /> */}

          {/* Calendar Picker */}
          <Calendar
            initialFocus
            className="mx-2 rounded-md border border-gray-300 mt-3"
            mode="range"
            defaultMonth={new Date(Date.now())}
            selected={date}
            onSelect={(date) => {
              onSelect(date);
            }}
            min={2}
            max={90}
            numberOfMonths={2}
            toDate={toDate}
            fromDate={fromDate}
            classNames={
              {
                // day_range_middle:
                //   "bg-[#b2b0d5] text-gray-900 transition-all duration-100 hover:bg-primary/50 hover:text-black",
                // day_today:
                //   "bg-transparent border border-primary/60 p-2 transition-all duration-100",
              }
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerWithRange;
