import { useEffect, useRef } from "react";
import { LucideIcon } from "lucide-react";
import { useWorkflowEditorStore } from "@/stores/workflowStore";
import TabNodesList from "@/components/workflow_editor/sidebar/tab_nodes";
import TabChat from "@/components/workflow_editor/sidebar/tab_chat";

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
      {/* Nodes list | Or chat assistant */}
      <div
        ref={chatHistoryContainer}
        className="flex flex-1 w-full max-h-full overflow-y-scroll scrollbar-hide"
      >
        {isWorkflowChatOpen ? <TabChat /> : <TabNodesList />}
      </div>
    </div>
  );
};
export default WEditorSidebar;
