"use client";
import { Terminal, WandSparkles } from "lucide-react";
import React from "react";
import { redirect } from "next/navigation";
import { generateUniqueId } from "@/lib/utils";
import ChatTextarea from "../c/_components/chat_textarea";

const Generate = () => {
  const startConversation = (userText?: string) => {
    const chatId = generateUniqueId({ prefix: "" });
    redirect(`/c/${chatId}`);
  };

  return (
    <div className="h-[90vh] w-full flex flex-col justify-start items-center pl-4">
      <div className="mb-7 mt-20 text-center flex flex-col gap-4 items-center">
        <div>
          <WandSparkles className="size-10 stroke-primary/60" />
        </div>
        <h2 className="text-2xl text-[#333] font-semibold">
          Which workflow should I build for you?
        </h2>
      </div>

      <div className="w-[max(50%,500px)]">
        <ChatTextarea
          onChatSubmit={(userText) => startConversation(userText)}
          SubmitButtonIcon={Terminal}
        />
      </div>
    </div>
  );
};

export default Generate;
