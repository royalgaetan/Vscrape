import {
  InputDataSelectedItem,
  OperationItem,
  WorkflowEditorToolItem,
} from "@/lib/workflow_editor/types/w_types";
import { createContext, Dispatch, SetStateAction, useState } from "react";
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

  // Workflow Editor

  // Current Operation
  currentOperation: OperationItem | undefined;
  setCurrentOperation: Dispatch<SetStateAction<OperationItem | undefined>>;

  // Input Data
  isDataInputDialogOpen: boolean;
  setIsDataInputDialogOpen: Dispatch<SetStateAction<boolean>>;
  setExpandedInputDataKeys: Dispatch<SetStateAction<string[]>>;
  expandedInputDataKeys: string[];
  dataInputSelected: InputDataSelectedItem | undefined;
  setDataInputSelected: Dispatch<
    SetStateAction<InputDataSelectedItem | undefined>
  >;
  inputTokenID: string | undefined;
  setInputTokenID: Dispatch<SetStateAction<string | undefined>>;
  inputTokenValue: string | undefined;
  setInputTokenValue: Dispatch<SetStateAction<string | undefined>>;
  toggleDataInputDialog: (
    isOpen: boolean,
    inputTokenID?: string,
    inputTokenValue?: string
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

  const [currentOperation, setCurrentOperation] = useState<OperationItem>();

  const [isDataInputDialogOpen, setIsDataInputDialogOpen] = useState(false);
  const [expandedInputDataKeys, setExpandedInputDataKeys] = useState<string[]>(
    []
  );
  const [inputTokenID, setInputTokenID] = useState<string | undefined>();
  const [inputTokenValue, setInputTokenValue] = useState<string | undefined>();
  const [dataInputSelected, setDataInputSelected] =
    useState<InputDataSelectedItem>();

  const toggleDataInputDialog = (
    isOpen: boolean,
    inputTokenID?: string,
    inputTokenValue?: string
  ) => {
    setIsDataInputDialogOpen(isOpen);
    setInputTokenID(inputTokenID);
    setInputTokenValue(inputTokenValue);
  };

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
        isDataInputDialogOpen,
        currentOperation,
        setCurrentOperation,
        setIsDataInputDialogOpen,
        setExpandedInputDataKeys,
        expandedInputDataKeys,
        dataInputSelected,
        setDataInputSelected,
        inputTokenID,
        setInputTokenID,
        inputTokenValue,
        setInputTokenValue,
        toggleDataInputDialog,
      }}
    >
      {children}
    </WorkflowEditorContext.Provider>
  );
};
