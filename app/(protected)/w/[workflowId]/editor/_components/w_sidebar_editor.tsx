import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

import WChatTab from "./w_chat_tab";
import WToolsTab from "./w_tools_tab";
import WVersionsTab from "./w_versions_tab";
import {
  HistoryIcon,
  LucideIcon,
  MessageCircleCode,
  Wrench,
} from "lucide-react";

export type WSidebarType = {
  label: string;
  value: string;
  icon?: LucideIcon;
  component: React.ReactNode;
};

export const WSidebarItems: WSidebarType[] = [
  {
    label: "Tools",
    value: "tools",
    icon: Wrench,
    component: <WToolsTab />,
  },
  {
    label: "Chat",
    value: "chat",
    icon: MessageCircleCode,
    component: <WChatTab />,
  },
  {
    label: "Versions",
    value: "versions",
    icon: HistoryIcon,
    component: <WVersionsTab />,
  },
] as const;

const WEditorSidebar = () => {
  const [selectedTab, setSelectedTab] = useState<string>(
    WSidebarItems[0].value
  );
  return (
    <Tabs
      defaultValue={selectedTab}
      className="w-full h-full bg-white border-r flex flex-col items-start justify-start relative"
    >
      {/* Tabs */}
      <TabsList className="mt-3 px-2 bg-transparent border-b-2 border-neutral-400/20 pb-0 rounded-none justify-start w-full gap-1">
        {WSidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <TabsTrigger
              className="text-xs space-x-1 rounded-none pb-2 border-b-4 border-transparent data-[state=active]:border-primary font-medium focus-visible:ring-0 data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:stroke-primary data-[state=active]:font-semibold data-[state=active]:shadow-none"
              key={item.value}
              value={item.value}
            >
              {Icon && <Icon className="size-4" />}
              <span> {item.label}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>

      {/* Tabs Content */}
      <div className="flex flex-1 w-full max-h-full overflow-y-scroll">
        {WSidebarItems.map((item) => {
          return (
            <TabsContent
              key={item.value}
              value={item.value}
              className="m-0 w-full"
            >
              {item.component}
            </TabsContent>
          );
        })}
      </div>
    </Tabs>
  );
};
export default WEditorSidebar;
