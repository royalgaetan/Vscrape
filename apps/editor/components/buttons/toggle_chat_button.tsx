import React from "react";
import { Button, SimpleTooltip, cn } from "@vscrape/ui";
import { useWorkflowEditorStore } from "@vscrape/engine/src";
import { MessageCircleMoreIcon } from "lucide-react";

const ToggleChatButton = () => {
  // Store
  const toggleWorkflowChat = useWorkflowEditorStore(
    (s) => s.toggleWorkflowChat
  );
  const isWorkflowChatOpen = useWorkflowEditorStore(
    (s) => s.isWorkflowChatOpen
  );
  // End Store

  return (
    <SimpleTooltip
      tooltipText={isWorkflowChatOpen ? "Close Chat" : "Open Chat"}
    >
      <Button
        onClick={() => toggleWorkflowChat(!isWorkflowChatOpen)}
        variant={"secondary"}
        className={cn(
          "duration-0 rounded-2xl h-7 text-xs gap-1 px-3",
          isWorkflowChatOpen &&
            "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        <MessageCircleMoreIcon
          className={cn(
            "stroke-neutral-800",
            isWorkflowChatOpen && "stroke-white"
          )}
        />
      </Button>
    </SimpleTooltip>
  );
};

export default ToggleChatButton;
