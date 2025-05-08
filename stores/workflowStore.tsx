import { VsNode } from "@/lib/workflow_editor/node";
import {
  OperationItem,
  SharedOutputSelectedItem,
  TokenInputType,
} from "@/lib/workflow_editor/types/w_types";
import { create } from "zustand";

interface WorkflowEditorState {
  // Workflow Chat
  isWorkflowChatOpen: boolean;
  toggleWorkflowChat: (isOpen: boolean) => void;

  // Workflow Option Bar (Right bar)
  isWorkflowOptionbarOpen: boolean;
  currentNode: VsNode | undefined;
  nodeIdToDelete: string | undefined;
  setNodeIdToDelete: (nodeId: string | undefined) => void;
  updateCurrentNode: (val: VsNode) => void;
  currentOperation: OperationItem | undefined;
  setCurrentOperation: (operation: OperationItem | undefined) => void;
  toggleOptionbar: (isOpen: boolean, node?: VsNode) => void;

  // Worfklow Shared Outputs Dialog
  isSharedOutputsDialogOpen: boolean;
  setIsWorkflowOptionbarOpen: (isOpen: boolean) => void;
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

export const useWorkflowEditorStore = create<WorkflowEditorState>(
  (set, state) => ({
    // Chat-related
    isWorkflowChatOpen: false,
    toggleWorkflowChat: (isOpen) => set({ isWorkflowChatOpen: isOpen }),

    //   Optionbar-related
    isWorkflowOptionbarOpen: false,
    setIsWorkflowOptionbarOpen: (isOpen) =>
      set({ isWorkflowOptionbarOpen: isOpen }),

    nodeIdToDelete: undefined,
    setNodeIdToDelete: (nodeId) => set({ nodeIdToDelete: nodeId }),

    currentNode: undefined,
    updateCurrentNode: (val) => set({ currentNode: val }),
    currentOperation: undefined,
    setCurrentOperation: (operation) => set({ currentOperation: operation }),
    toggleOptionbar: (isOpen, node) => {
      set({
        isWorkflowOptionbarOpen: isOpen,
        currentNode: node,
        currentOperation: undefined,
      });
    },
    // Shared Output-related
    isSharedOutputsDialogOpen: false,
    sharedOutputSelected: undefined,
    inputToken: undefined,
    setSharedOutputSelected: (sharedOutput) =>
      set({ sharedOutputSelected: sharedOutput }),
    toggleSharedOutputsDialog: (isOpen, inputToken) =>
      set({ isSharedOutputsDialogOpen: isOpen, inputToken: inputToken }),
  })
);
