import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";

const DatePicker = ({
  selectedDate,
  onSelect,
  children,
  controlIsOpen,
  onClose,
}: {
  controlIsOpen?: boolean;
  onClose?: () => void;
  selectedDate: Date | undefined;
  onSelect: (dateSelected: Date | undefined) => void;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof controlIsOpen !== "boolean") return;
    setIsOpen(controlIsOpen);
  }, [controlIsOpen]);

  useEffect(() => {
    if (isOpen === false) {
      onClose && onClose();
    }
  }, [isOpen]);

  return (
    <Popover
      open={isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen);
      }}
    >
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
