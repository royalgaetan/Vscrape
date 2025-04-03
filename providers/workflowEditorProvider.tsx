import { createContext, useState } from "react";

export const WorkflowEditorContext = createContext<
  WorkflowEditorContext | undefined
>(undefined);

export type WorkflowEditorContext = {
  isWChatOpen: boolean;
  setWChatOpen: (isOpen: boolean) => void;
};

export const WorkflowEditorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isWChatOpen, setWChatOpen] = useState<boolean>(false);

  return (
    <WorkflowEditorContext.Provider value={{ isWChatOpen, setWChatOpen }}>
      {children}
    </WorkflowEditorContext.Provider>
  );
};
