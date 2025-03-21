"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { HomeTextareaPlaceholders } from "@/lib/constants";
import { Terminal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const Generate = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [placeholder, setPlaceholder] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(
      Math.random() * HomeTextareaPlaceholders.length
    );
    setPlaceholder(HomeTextareaPlaceholders[randomIndex]);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight =
        5 * parseFloat(getComputedStyle(textareaRef.current).lineHeight);

      textareaRef.current.style.height = `${Math.min(
        scrollHeight,
        maxHeight
      )}px`;
    }
  }, [value]);

  return (
    <div className="h-[90vh] w-full flex flex-1 justify-center items-center">
      <div className="rounded-3xl p-3 my-3 h-auto w-[max(60%,700px)] border-[2px] bg-gray-50 border-neutral-300">
        <Textarea
          className="bg-transparent mb-4 placeholder:text-muted-foreground/70 placeholder:font-normal border-none focus:ring-0 focus:outline-none focus-visible:ring-0 resize-none shadow-none overflow-hidden"
          maxLength={2000}
          style={{ lineHeight: "1.1rem" }}
          ref={textareaRef}
          value={value}
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          rows={1}
          placeholder={placeholder}
        />

        <div className="flex flex-1 justify-end">
          <Button
            variant={"outline"}
            size={"sm"}
            className="w-fit"
            disabled={value.length < 2}
          >
            <Terminal className="" size={"1.3rem"} />
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Generate;
