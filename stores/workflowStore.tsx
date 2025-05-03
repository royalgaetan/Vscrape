import {
  OperationItem,
  SharedOutputSelectedItem,
  TokenInputType,
  WorkflowEditorNode,
} from "@/lib/workflow_editor/types/w_types";
import { create } from "zustand";

interface WorkflowEditorState {
  // Workflow Chat
  isWorkflowChatOpen: boolean;
  toggleWorkflowChat: (isOpen: boolean) => void;

  // Workflow Option Bar (Right bar)
  isWorkflowOptionbarOpen: boolean;
  currentNode: WorkflowEditorNode | undefined;
  currentOperation: OperationItem | undefined;
  setCurrentOperation: (operation: OperationItem | undefined) => void;
  toggleOptionbar: (isOpen: boolean, node?: WorkflowEditorNode) => void;

  // Worfklow Shared Outputs Dialog
  isSharedOutputsDialogOpen: boolean;
  sharedOutputSelected: SharedOutputSelectedItem | undefined;
  setSharedOutputSelected: (
    sharedOutput: SharedOutputSelectedItem | undefined
  ) => void;
  inputToken: TokenInputType | undefined;
  toggleSharedOutputsDialog: (
    isOpen: boolean,
    inputToken?: TokenInputType
  ) => void;
}

export const useWorkflowEditorStore = create<WorkflowEditorState>((set) => ({
  // Chat-related
  isWorkflowChatOpen: false,
  toggleWorkflowChat: (isOpen) => set({ isWorkflowChatOpen: isOpen }),

  //   Optionbar-related
  isWorkflowOptionbarOpen: false,
  currentNode: undefined,
  currentOperation: undefined,
  setCurrentOperation: (operation) => set({ currentOperation: operation }),
  toggleOptionbar: (isOpen, node) =>
    set({ isWorkflowOptionbarOpen: isOpen, currentNode: node }),

  // Shared Output-related
  isSharedOutputsDialogOpen: false,
  sharedOutputSelected: undefined,
  inputToken: undefined,
  setSharedOutputSelected: (sharedOutput) =>
    set({ sharedOutputSelected: sharedOutput }),
  toggleSharedOutputsDialog: (isOpen, inputToken) =>
    set({ isSharedOutputsDialogOpen: isOpen, inputToken: inputToken }),
}));
