"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { HomeTextareaPlaceholders } from "@/lib/constants";
import {
  FileInputIcon,
  HelpCircleIcon,
  PencilLineIcon,
  ShoppingCartIcon,
  Terminal,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const Home = () => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [placeholder, setPlaceholder] = useState("");

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
    <div className="h-full w-full flex flex-1 justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl text-[#333] font-semibold">
          How Can I help you today?
        </h2>

        <div className="rounded-3xl p-3 my-3 h-auto w-[max(90%,700px)] border-[2px] bg-gray-50 border-gray-100">
          <Textarea
            className="mb-4 placeholder:text-muted-foreground/70 placeholder:font-normal border-none focus:ring-0 focus:outline-none focus-visible:ring-0 resize-none shadow-none overflow-hidden"
            maxLength={2000}
            style={{ lineHeight: "1.1rem" }}
            ref={textareaRef}
            value={value}
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

        <div className="w-full gap-3 flex flex-1 justify-center items-center">
          <Button variant={"ghost"} size={"sm"} className="w-fit">
            <PencilLineIcon className="stroke-orange-400" size={"1.3rem"} />
            Create from scratch
          </Button>

          <Button variant={"ghost"} size={"sm"} className="w-fit">
            <ShoppingCartIcon className="stroke-green-700" size={"1.3rem"} />
            Pick from Marketplace
          </Button>

          <Button variant={"ghost"} size={"sm"} className="w-fit">
            <FileInputIcon className="stroke-pink-500" size={"1.3rem"} />
            Import an existing
          </Button>

          <Button variant={"ghost"} size={"sm"} className="w-fit">
            <HelpCircleIcon className="stroke-blue-400" size={"1.3rem"} />
            Help
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-5"></div>
      </div>
    </div>
  );
};

export default Home;
