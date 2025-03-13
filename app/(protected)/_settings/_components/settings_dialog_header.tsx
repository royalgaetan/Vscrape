import React from "react";
import { Separator } from "@/components/ui/separator";
const SettingDialogHeader = ({ title }: { title: string }) => {
  return (
    <div className="w-full">
      {/* Dialog Header */}
      <h2 className="mb-2 text-base">{title}</h2>
      <Separator className="w-full ml-0 mr-5 my-2" />
    </div>
  );
};
export default SettingDialogHeader;
