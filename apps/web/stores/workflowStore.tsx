import { VsNode } from "@/lib/workflow_editor/classes/node";
import { OperationBlock } from "@/lib/workflow_editor/classes/operation_block";
import {
  SharedOutputSelectedItem,
  TokenInputType,
} from "@/lib/workflow_editor/types/w_types";
import { create } from "zustand";
import { PossibleFieldBlockType as FieldBlockType } from "@/lib/workflow_editor/constants/workflow_form_fields_definition";
import { NodeEditor } from "rete";
import { Schemes } from "@/app/(protected)/w/[workflowId]/editor/_components/w_editor";

export type NodeBlockType = OperationBlock | FieldBlockType | undefined;
export type ElementToActOn =
  | {
      type: "Node" | "Connection" | "Output";
      elementId: string;
      operation: "Delete" | "Duplicate" | "BranchDeleted";
    }
  | undefined;
export type currentEditorState = "rendered";

interface WorkflowEditorState {
  // Workflow Chat
  isWorkflowChatOpen: boolean;
  toggleWorkflowChat: (isOpen: boolean) => void;

  // Workflow Editor
  currentEditor: {
    editor: NodeEditor<Schemes> | undefined;
    state?: currentEditorState;
  };
  setCurrentEditor: (
    editor?: NodeEditor<Schemes>,
    state?: currentEditorState
  ) => void;

  // Workflow Panel
  isWorkflowPanelOpen: boolean;
  currentNode: VsNode | undefined;
  toggleWorkflowPanel: (isOpen: boolean, node?: VsNode) => void;

  // Elements Actions: Duplicate, Delete, Branch Deletion
  setElementIdToActOn: (act: ElementToActOn) => void;
  elementToActOn: ElementToActOn;

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

    // Workflow Editor
    currentEditor: { editor: undefined, state: undefined },
    setCurrentEditor: (
      editor?: NodeEditor<Schemes>,
      state?: currentEditorState
    ) => set({ currentEditor: { editor, state } }),

    // Workflow Panel-related
    isWorkflowPanelOpen: false,
    setisWorkflowPanelOpen: (isOpen) => set({ isWorkflowPanelOpen: isOpen }),
    currentNode: undefined,
    toggleWorkflowPanel: (isOpen, node) => {
      set({
        isWorkflowPanelOpen: isOpen,
        currentNode: node,
      });
    },

    // Node Actions: Duplicate, Delete
    elementToActOn: undefined,
    setElementIdToActOn: (act) => set({ elementToActOn: act }),

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
