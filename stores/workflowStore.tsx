import { VsNode } from "@/lib/workflow_editor/classes/node";
import { OperationItem } from "@/lib/workflow_editor/classes/operation_item";
import {
  SharedOutputSelectedItem,
  TokenInputType,
} from "@/lib/workflow_editor/types/w_types";
import { create } from "zustand";
import { PossibleFieldBlockType as FieldBlockType } from "@/lib/workflow_editor/constants/workflow_form_fields_definition";

export type NodeBlockType = OperationItem | FieldBlockType;
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

  // Workflow Panel
  isWorkflowPanelOpen: boolean;
  currentNode: VsNode | undefined;
  updateCurrentNode: (val: VsNode) => void;
  currentBlock?: NodeBlockType;
  setCurrentBlock: (block?: NodeBlockType) => void;
  toggleWorkflowPanel: (isOpen: boolean, node?: VsNode) => void;

  // Node Actions: Duplicate, Delete
  setNodeIdToActOn: (act: NodeToActOn) => void;
  nodeIdToActOn: NodeToActOn;

  // Worfklow Shared Outputs Dialog
  isSharedOutputsDialogOpen: boolean;
  setisWorkflowPanelOpen: (isOpen: boolean) => void;
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

    // Workflow Panel-related
    isWorkflowPanelOpen: false,
    setisWorkflowPanelOpen: (isOpen) => set({ isWorkflowPanelOpen: isOpen }),
    currentNode: undefined,
    updateCurrentNode: (val) => set({ currentNode: val }),
    currentBlock: undefined,
    setCurrentBlock: (block) => set({ currentBlock: block }),
    toggleWorkflowPanel: (isOpen, node) => {
      set({
        isWorkflowPanelOpen: isOpen,
        currentNode: node,
        currentBlock: undefined,
      });
    },

    // Node Actions: Duplicate, Delete
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
