import React from "react";
import { Separator } from "@/components/ui/separator";

export const TextSeparator = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-1 items-center mx-5">
      <Separator className="flex flex-1" />
      <span className="mx-2 text-sm font-medium text-gray-500">{text}</span>
      <Separator className="flex flex-1" />
    </div>
  );
};

export default TextSeparator;
