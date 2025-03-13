import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";

const SettingItemSearchBar = ({
  inputType,
  placeholder,
  onSubmit,
  onTextChange,
  onCancel,
  disabled,
  className,
}: {
  placeholder: string;
  inputType: string;
  disabled?: boolean;
  className?: string;
  onTextChange: (newText: string) => void;
  onSubmit: (text: string) => void;
  onCancel: () => void;
}) => {
  return (
    <div className="w-60 flex flex-1">
      <input
        type={inputType}
        placeholder={placeholder}
        className="appearance-none [&::-webkit-search-cancel-button]:appearance-none focus:border-none"
      />
    </div>
  );
};

export default SettingItemSearchBar;
