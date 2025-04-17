import { WorkflowEditorToolItem } from "@/lib/workflow_editor/types/w_types";
import { createContext, useState } from "react";

export type WorkflowEditorToolItemExtended = WorkflowEditorToolItem & {
  iconColor: string;
};

export const WorkflowEditorContext = createContext<
  WorkflowEditorContext | undefined
>(undefined);

export type WorkflowEditorContext = {
  // Chat
  isWChatOpen: boolean;
  setWChatOpen: (isOpen: boolean) => void;

  // Optionbar
  isOptionbarOpen: boolean;
  optionbarItem?: WorkflowEditorToolItemExtended;
  toggleOptionbar: (
    isOpen: boolean,
    item?: WorkflowEditorToolItemExtended
  ) => void;
};

export const WorkflowEditorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isWChatOpen, setWChatOpen] = useState<boolean>(false);
  const [isOptionbarOpen, setIsOptionbarOpen] = useState<boolean>(false);
  const [optionbarItem, setOptionbarItem] =
    useState<WorkflowEditorToolItemExtended>();

  const toggleOptionbar = (
    isOpen: boolean,
    item?: WorkflowEditorToolItemExtended
  ) => {
    setOptionbarItem(item);
    setIsOptionbarOpen(isOpen);
  };

  return (
    <WorkflowEditorContext.Provider
      value={{
        isWChatOpen,
        setWChatOpen,
        toggleOptionbar,
        optionbarItem,
        isOptionbarOpen,
      }}
    >
      {children}
    </WorkflowEditorContext.Provider>
  );
};
