import { VsNode } from "@/lib/workflow_editor/node";
import {
  OperationItem,
  SharedOutputSelectedItem,
  TokenInputType,
} from "@/lib/workflow_editor/types/w_types";
import { create } from "zustand";

export type NodeToActOn =
  | {
      nodeId: string;
      operation: "Delete" | "Duplicate";
    }
  | undefined;

interface WorkflowEditorState {
  // Workflow Chat
  isWorkflowChatOpen: boolean;
  toggleWorkflowChat: (isOpen: boolean) => void;

  // Workflow Option Bar (Right bar)
  isWorkflowOptionbarOpen: boolean;
  currentNode: VsNode | undefined;
  updateCurrentNode: (val: VsNode) => void;
  currentOperation: OperationItem | undefined;
  setCurrentOperation: (operation: OperationItem | undefined) => void;
  toggleOptionbar: (isOpen: boolean, node?: VsNode) => void;

  // Node Operations: Duplicate, Delete
  setNodeIdToActOn: (act: NodeToActOn) => void;
  nodeIdToActOn: NodeToActOn;

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

    // Node Operations: Duplicate, Delete
    nodeIdToActOn: undefined,
    setNodeIdToActOn: (act) => set({ nodeIdToActOn: act }),

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
