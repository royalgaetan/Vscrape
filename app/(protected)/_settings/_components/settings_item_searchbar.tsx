import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import React, { useState } from "react";

const SettingItemSearchBar = ({
  inputType,
  placeholder,
  onTextChange,
  disabled,
  className,
  inputRef,
  autofocus,
}: {
  placeholder: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  inputType: string;
  disabled?: boolean;
  autofocus?: boolean;
  className?: string;
  onTextChange: (newText: string) => void;
  onSubmit: (text: string) => void;
  onCancel: () => void;
}) => {
  const [inputText, setInputText] = useState("");

  const handleTextChange = (text: string) => {
    setInputText(text);
    onTextChange(text);
  };

  const handleCancel = () => {
    setInputText("");
    onTextChange("");
  };
  return (
    <div
      className={cn(
        "w-80 flex flex-1 items-center rounded-md border-2 border-gray-300 bg-slate-100/40 px-0 py-0 text-xs focus:border-primary/60 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all duration-300",
        className
      )}
    >
      {inputType === "search" && (
        <button onClick={() => {}}>
          <Search className="stroke-primary size-4 ml-2 -mr-1" />
        </button>
      )}
      <Input
        ref={inputRef}
        type={inputType}
        value={inputText}
        autoFocus={autofocus}
        placeholder={placeholder}
        onChange={(e) => handleTextChange(e.target.value)}
        className="flex flex-1 bg-transparent appearance-none [&::-webkit-search-cancel-button]:appearance-none border-none outline-none focus:border-none active:border-none focus:ring-0 focus:outline-none "
      />
      {inputText !== "" && (
        <button onClick={() => handleCancel()} className="ml-2 mx-2 p-0 h-fit">
          <X className="stroke-neutral-500 size-4" />
        </button>
      )}
    </div>
  );
};

export default SettingItemSearchBar;
