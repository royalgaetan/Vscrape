import ChatBubble from "@/app/(protected)/c/_components/chat_bubble";
import ChatTextarea from "@/app/(protected)/c/_components/chat_textarea";
import { generateAvatar } from "@/lib/image_utils";
import { fakeConversation1 } from "@/lib/fake_data";
import { LucideArrowRight } from "lucide-react";
import React, { useState } from "react";

const WChatTab = () => {
  const [avatarPath] = useState(generateAvatar()?.toDataUri ?? "");

  return (
    <div className="pl-2 h-px">
      {/* Chat History */}
      <div className="relative z-[20] flex-1 pb-28 pr-[0.2rem]">
        {fakeConversation1.map((chatReply, idx) => (
          <ChatBubble
            key={`wchat_reply_${idx.toString()}`}
            chatReply={{ userAvatarPath: avatarPath, ...chatReply }}
            dismissUserAvatar
            avatarClassName="size-6"
            fontSize="text-xs"
          />
        ))}
      </div>

      {/* Chat Textarea */}
      <div className="absolute bottom-0 right-0 z-[21] flex flex-1 justify-center w-full ">
        <ChatTextarea
          onChatSubmit={(userText) => {}}
          submitButtonText=""
          customPlaceHolderText="Ask anything or autocomplete your current workflow..."
          SubmitButtonIcon={LucideArrowRight}
          chatContainerOverrideClassName="bg-white relative z-[21] w-[100%] p-0 px-[0.4rem] py-[0.3rem] rounded-none rounded-t-2xl border-b-0"
        />
      </div>
    </div>
  );
};

export default WChatTab;
