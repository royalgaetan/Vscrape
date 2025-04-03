import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

import WChatTab from "./w_chat_tab";
import WToolsTab from "./w_tools_tab";
import WVersionsTab from "../../versions/_components/w_sidebar_versions";
import {
  HistoryIcon,
  LucideIcon,
  MessageCircleCode,
  Wrench,
} from "lucide-react";
import { useWorkflowEditor } from "@/hooks/useWorkflowEditor";

export type WSidebarType = {
  label: string;
  value: string;
  icon?: LucideIcon;
  component: React.ReactNode;
};

const WEditorSidebar = () => {
  const { isWChatOpen } = useWorkflowEditor();
  return (
    <div className="min-w-[18rem] max-w-[18rem] h-full bg-white border-r flex flex-col items-start justify-start relative">
      {/* Tools list | Or chat assistant */}
      <div className="flex flex-1 w-full max-h-full overflow-y-scroll scrollbar-hide">
        {isWChatOpen ? <WChatTab /> : <WToolsTab />}
      </div>
    </div>
  );
};
export default WEditorSidebar;
