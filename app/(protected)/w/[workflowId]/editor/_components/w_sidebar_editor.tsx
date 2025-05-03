import { useEffect, useRef } from "react";
import WChatTab from "./w_chat_tab";
import WToolsTab from "./w_tools_tab";
import { LucideIcon } from "lucide-react";
import { useWorkflowEditorStore } from "@/stores/workflowStore";

export type WSidebarType = {
  label: string;
  value: string;
  icon?: LucideIcon;
  component: React.ReactNode;
};

const WEditorSidebar = () => {
  // Store
  const isWorkflowChatOpen = useWorkflowEditorStore(
    (s) => s.isWorkflowChatOpen
  );
  // End Store

  const chatHistoryContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of Chat History
    if (chatHistoryContainer.current && isWorkflowChatOpen) {
      chatHistoryContainer.current.scrollTo({
        behavior: "instant",
        top: chatHistoryContainer.current.scrollHeight,
      });
    }
  }, [isWorkflowChatOpen]);
  return (
    <div className="min-w-[18rem] max-w-[18rem] h-full bg-white border-r flex flex-col items-start justify-start relative">
      {/* Tools list | Or chat assistant */}
      <div
        ref={chatHistoryContainer}
        className="flex flex-1 w-full max-h-full overflow-y-scroll scrollbar-hide"
      >
        {isWorkflowChatOpen ? <WChatTab /> : <WToolsTab />}
      </div>
    </div>
  );
};
export default WEditorSidebar;
