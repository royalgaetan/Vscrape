import MultiSelect from "@/components/global/multi_select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { HomeTextareaPlaceholders } from "@/lib/constants";
import { fakeKnowledgeBases } from "@/lib/fake_data";
import { cn } from "@/lib/utils";
import { Database, LucideIcon, SparklesIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const ChatTextarea = ({
  onChatSubmit,
  submitButtonText,
  SubmitButtonIcon,
  customPlaceHolderText,
  chatContainerOverrideClassName,
}: {
  onChatSubmit: (userText: string) => void;
  submitButtonText?: string;
  customPlaceHolderText?: string;
  SubmitButtonIcon?: LucideIcon;
  chatContainerOverrideClassName?: string;
}) => {
  const [chatSourcesSelected, setChatSourcesSelected] = useState<string[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [chatContainerClassName, setChatContainerClassName] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [value, setValue] = useState("");

  const handleSourceSelection = (value: string) => {
    if (value === "all") {
      if (areAllSourcesSelected()) {
        setChatSourcesSelected([]);
      } else {
        setChatSourcesSelected([
          "ai",
          ...fakeKnowledgeBases.map((kb) => kb.id),
        ]);
      }
    } else {
      setChatSourcesSelected((prev) => {
        if (prev.includes(value)) {
          return prev.filter((v) => v !== value);
        } else {
          return [...prev, value];
        }
      });
    }
  };

  const areAllSourcesSelected = (): boolean => {
    return (
      chatSourcesSelected.filter((s) => s !== "all").length ===
      fakeKnowledgeBases.length + 1
    );
  };

  const getSourcesSelectionLabel = () => {
    if (chatSourcesSelected.length === 0) {
      return "Select a source";
    } else if (chatSourcesSelected.length === 1) {
      if (chatSourcesSelected[0] === "ai") return "AI Knowledge";
      const val = fakeKnowledgeBases.find(
        (kb) => kb.id === chatSourcesSelected[0]
      );
      if (val) {
        return val.name;
      } else {
        return "1 source selected";
      }
    } else if (areAllSourcesSelected()) {
      return "All Sources";
    } else {
      return `${chatSourcesSelected.length} sources`;
    }
  };

  useEffect(() => {
    // Textarea
    if (textareaRef.current) {
      textareaRef.current.addEventListener("focusin", textareaFocusIn);
      textareaRef.current.addEventListener("focusout", textareaFocusOut);
    }

    // Chat Container
    if (chatContainerRef.current) {
      chatContainerRef.current.addEventListener("click", textareaFocusIn);
    }
    document.addEventListener("click", textareaFocusOut);

    const randomIndex = Math.floor(
      Math.random() * HomeTextareaPlaceholders.length
    );
    setPlaceholder(HomeTextareaPlaceholders[randomIndex]);

    return () => {
      textareaRef.current?.removeEventListener("focusin", textareaFocusIn);
      textareaRef.current?.removeEventListener("focusout", textareaFocusOut);
      chatContainerRef.current?.removeEventListener("click", textareaFocusIn);
      document.removeEventListener("click", textareaFocusOut);
    };
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight =
        10 * parseFloat(getComputedStyle(textareaRef.current).lineHeight);

      textareaRef.current.style.height = `${Math.min(
        scrollHeight,
        maxHeight
      )}px`;
    }
  }, [value]);

  const textareaFocusIn = () => {
    setChatContainerClassName("border-primary/60");
  };
  const textareaFocusOut = (e: Event) => {
    if (
      chatContainerRef.current &&
      !chatContainerRef.current.contains(e.target as Node)
    ) {
      setChatContainerClassName("");
    }
  };

  return (
    <div
      ref={chatContainerRef}
      className={cn(
        "rounded-3xl p-3 h-auto w-full bg-gray-50/20 border-neutral-200 border-[3px] transition-all duration-100",
        chatContainerClassName,
        chatContainerOverrideClassName
      )}
    >
      <Textarea
        className="bg-transparent mb-1 text-sm placeholder:text-muted-foreground/70 placeholder:font-normal border-none focus:outline-none focus:ring-0 focus:border-none focus-visible:ring-0 resize-none shadow-none"
        maxLength={2000}
        style={{ lineHeight: "1.1rem" }}
        ref={textareaRef}
        value={value}
        autoFocus
        onChange={(e) => {
          textareaFocusIn();
          setValue(e.target.value);
        }}
        // rows={1}
        placeholder={customPlaceHolderText ?? placeholder}
      />

      {/* Buttons */}
      <div className="flex flex-1 justify-between items-center">
        <div className="flex flex-1 justify-start">
          <MultiSelect
            popoverAlignment="start"
            popoverSide="bottom"
            triggerClassName="max-w-32"
            popoverClassName="h-60"
            label={getSourcesSelectionLabel()}
            data={{
              "": [
                {
                  label: "Select All",
                  value: "all",
                },
              ],
              "Use AI": [
                {
                  label: "AI Knowledge",
                  value: "ai",
                  icon: SparklesIcon,
                  iconClassName: "stroke-primary fill-primary",
                },
              ],
              "Knowledge Bases": fakeKnowledgeBases.map((kb) => ({
                label: kb.name,
                value: kb.id,
                icon: Database,
                iconClassName: "stroke-neutral-600 fill-none",
              })),
            }}
            selectedValues={
              areAllSourcesSelected()
                ? chatSourcesSelected.concat(["all"])
                : chatSourcesSelected
            }
            handleSelect={handleSourceSelection}
          />
        </div>
        {/* Generate Button */}
        <Button
          variant={"outline"}
          size={"sm"}
          className="w-fit enabled:bg-primary enabled:border-primary enabled:text-white enabled:hover:opacity-90"
          disabled={value.length < 2}
          onClick={() => {
            onChatSubmit(value);
          }}
        >
          {SubmitButtonIcon && (
            <SubmitButtonIcon className="" size={"1.3rem"} />
          )}
          {submitButtonText ?? "Generate"}
        </Button>
      </div>
    </div>
  );
};

export default ChatTextarea;
