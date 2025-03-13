import { Switch } from "@/components/ui/switch";
import React from "react";

const SettingItemSwitcher = ({
  onSelect,
}: {
  onSelect: (itemSelected: any) => void;
}) => {
  return (
    <div>
      <Switch />
    </div>
  );
};

export default SettingItemSwitcher;
