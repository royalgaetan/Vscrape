import { Separator } from "@/components/ui/separator";
import React from "react";

const DashboardHeader = ({
  headerText,
  buttons,
}: {
  headerText: string;
  buttons: React.ReactNode;
}) => {
  return (
    <div className="w-full flex flex-col mt-4">
      <div className="flex flex-1 justify-center items-center">
        {/* Header Text */}
        <div className="text-base font-semibold flex flex-1 justify-start items-center">
          {headerText}
        </div>

        {/* Buttons */}
        {buttons}
      </div>
      <Separator className="w-full ml-0 mr-5 my-2" />
    </div>
  );
};

export default DashboardHeader;
