import SimpleTooltip from "@/components/global/simple_tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWorkflowEditorStore } from "@/stores/workflowStore";
import { MessageCircleMoreIcon } from "lucide-react";
import React from "react";

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
