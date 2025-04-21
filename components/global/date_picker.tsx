import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";

const DatePicker = ({
  selectedDate,
  onSelect,
  children,
}: {
  selectedDate: Date | undefined;
  onSelect: (dateSelected: Date | undefined) => void;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            onSelect(date);
            setIsOpen(false);
          }}
          disabled={(date) =>
            date > new Date("2500-01-01") || date < new Date("1500-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
