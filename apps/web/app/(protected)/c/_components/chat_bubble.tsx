import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChatReply } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Copy,
  LucideIcon,
  Pen,
  RefreshCcw,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import React from "react";

const ChatBubble = ({
  chatReply,
  dismissModelAvatar,
  dismissUserAvatar,
  avatarClassName,
  fontSize,
}: {
  chatReply: ChatReply & { userAvatarPath: string };
  dismissUserAvatar?: boolean;
  dismissModelAvatar?: boolean;
  avatarClassName?: string;
  fontSize?: string;
}) => {
  const dismissAvatar =
    (chatReply.from === "user" && dismissUserAvatar) ||
    (chatReply.from === "model" && dismissModelAvatar);
  return (
    <div
      className={cn(
        "flex flex-1 items-start justify-start group gap-2",
        chatReply.from === "user" && "flex-row-reverse"
      )}
    >
      {/* Avatar  */}
      {!dismissAvatar && (
        <Avatar
          className={cn(
            "mt-6 size-8",
            chatReply.from === "user" && "mt-4",
            avatarClassName
          )}
        >
          <AvatarImage
            alt={
              chatReply.from === "user" ? "User avatar profile" : "Vscrape logo"
            }
            src={
              chatReply.from === "user"
                ? chatReply.userAvatarPath
                : "/Vscrape logo.png"
            }
          />
          <AvatarFallback>Vs</AvatarFallback>
        </Avatar>
      )}

      {/* Content  */}
      <div
        className={cn(
          "flex flex-col",
          chatReply.from === "user" && "items-end"
        )}
      >
        {/* Bubble with content */}
        <div
          className={cn(
            "w-full",
            chatReply.from === "user" && "w-[70%] flex justify-end"
          )}
        >
          <div
            className={cn(
              "w-[90%] bg-white h-max flex pt-2 pb-1 mt-3 text-sm items-center min-h-12 text-neutral-900 rounded-none text-left",
              chatReply.from === "user" &&
                "w-fit pl-5 pb-2 pr-5 bg-neutral-200/80 rounded-2xl",
              fontSize
            )}
          >
            {chatReply.content}
          </div>
        </div>
        {/* Bubble Buttons */}
        <div className="flex flex-1 my-1 min-h-5">
          <div className="hidden group-hover:flex flex-1 transition-all duration-500">
            {/* Model only buttons */}
            {chatReply.from === "model" && (
              <div className="flex h-min divide-x-2">
                <div className="flex flex-1 gap-1">
                  {/* Copy Icon */}
                  <BubbleButton
                    Icon={Copy}
                    tooltipText="Copy"
                    onClick={() => {}}
                  />
                  {/* Remake Icon */}
                  <BubbleButton
                    Icon={RefreshCcw}
                    tooltipText="Remake"
                    onClick={() => {}}
                    className="mr-2"
                  />
                </div>
                <div className="flex flex-1 gap-1">
                  {/* Like Icon */}
                  <BubbleButton
                    className="ml-2"
                    Icon={ThumbsUp}
                    tooltipText="Like"
                    onClick={() => {}}
                  />
                  {/* Dislike Icon */}
                  <BubbleButton
                    Icon={ThumbsDown}
                    tooltipText="Dislike"
                    onClick={() => {}}
                  />
                </div>
              </div>
            )}

            {/* User only buttons */}
            {chatReply.from === "user" && (
              <div className="flex flex-1 gap-1">
                {/* Copy Icon */}
                <BubbleButton
                  Icon={Copy}
                  tooltipText="Copy"
                  onClick={() => {}}
                />
                {/* Edit Icon */}
                <BubbleButton
                  Icon={Pen}
                  tooltipText="Edit"
                  onClick={() => {}}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;

export const BubbleButton = ({
  Icon,
  tooltipText,
  onClick,
  className,
}: {
  Icon: LucideIcon;
  onClick: () => void;
  tooltipText?: string;
  className?: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            // variant={"ghost"}
            onClick={() => onClick()}
            className={cn(
              "flex w-5 h-5 transition-all duration-300 justify-center items-center hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer rounded-sm",
              className
            )}
          >
            {/* Icon */}
            <Icon className="size-3 stroke-neutral-500" />
          </button>
        </TooltipTrigger>
        {tooltipText && (
          <TooltipContent className="bg-neutral-700/95 text-white text-xs w-fit px-3 py-1">
            <p>{tooltipText}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};
