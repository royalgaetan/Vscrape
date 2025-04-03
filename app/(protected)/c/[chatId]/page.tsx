"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { LucideArrowRight } from "lucide-react";
import { fakeConversation1 } from "@/lib/fake_data";
import { generateAvatar } from "@/lib/image_utils";
import ChatBubble from "../_components/chat_bubble";
import ChatTextarea from "../_components/chat_textarea";

const SingleChatPage = () => {
  const { chatId } = useParams();
  const [avatarPath] = useState(generateAvatar()?.toDataUri ?? "");

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative flex flex-col h-full min-h-auto justify-end w-[max(60%,500px)]">
        {/* Chat History */}
        <div className="relative z-[20] pb-44 flex flex-1 justify-center">
          <div className="flex flex-col">
            {fakeConversation1.map((chatReply, idx) => (
              <ChatBubble
                key={`chat_${chatId}_reply_${idx.toString()}`}
                chatReply={{ userAvatarPath: avatarPath, ...chatReply }}
              />
            ))}
          </div>
        </div>

        {/* Chat Textarea */}
      </div>
      <div className="absolute bottom-0 right-0 z-[21] flex flex-1 justify-center w-full">
        <div className="w-[max(60%,500px)] -ml-5 bg-transparent relative">
          <ChatTextarea
            onChatSubmit={(userText) => {}}
            submitButtonText=""
            customPlaceHolderText="Ask anything..."
            SubmitButtonIcon={LucideArrowRight}
            chatContainerOverrideClassName="bg-white relative z-[21] mb-2"
          />
          <div className="z-[20] bottom-0 absolute w-full bg-transparent h-10 bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default SingleChatPage;
