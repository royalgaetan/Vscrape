import { VsNode } from "@/lib/workflow_editor/classes/node";
import {
  ExecutionPlan,
  SharedOutputSelectedItem,
  TokenInputType,
  WorkflowDefinition,
} from "@/lib/workflow_editor/types/w_types";
import { create } from "zustand";
import { NodeEditor } from "rete";
import { Schemes } from "@/app/(protected)/w/[workflowId]/editor/_components/w_editor";

export type CurrentEditor = {
  editor: NodeEditor<Schemes> | undefined;
  state?: currentEditorState;
  executionPlan?: ExecutionPlan;
  errors?: Set<string>;
};

export type ElementToActOn =
  | {
      type: "Node" | "Connection" | "Output";
      elementId: string;
      operation: "Delete" | "Duplicate" | "BranchDeleted";
    }
  | undefined;
export type currentEditorState = "rendered";

type ToggleSharedOutputsDialogArgs = {
  isSharedOutputsDialogOpen?: boolean;
  sharedOutputInputToken?: TokenInputType;
  sharedOutputInitialNodeId?: string;
  sharedOutputInitialItemId?: string;
  sharedOutputSelectedItem?: SharedOutputSelectedItem;
};

interface WorkflowEditorState {
  // Workflow Chat
  isWorkflowChatOpen: boolean;
  toggleWorkflowChat: (isOpen: boolean) => void;

  // Workflow Editor
  currentEditor: CurrentEditor;
  setCurrentEditor: ({
    editor,
    state,
    executionPlan,
    errors,
  }: {
    editor?: NodeEditor<Schemes>;
    state?: currentEditorState;
    executionPlan?: ExecutionPlan;
    errors?: Set<string>;
  }) => void;

  // Workflow Panel
  isWorkflowPanelOpen: boolean;
  currentNode: VsNode | undefined;
  toggleWorkflowPanel: (isOpen: boolean, node?: VsNode) => void;
  setisWorkflowPanelOpen: (isOpen: boolean) => void;

  // Elements Actions: Duplicate, Delete, Branch Deletion
  setElementIdToActOn: (act: ElementToActOn) => void;
  elementToActOn: ElementToActOn;

  // Worfklow Shared Outputs Dialog
  isSharedOutputsDialogOpen: boolean;
  sharedOutputInputToken?: TokenInputType;
  sharedOutputInitialNodeId?: string;
  sharedOutputInitialItemId?: string;
  sharedOutputSelectedItem?: SharedOutputSelectedItem;
  toggleSharedOutputsDialog: ({
    isSharedOutputsDialogOpen,
    sharedOutputInputToken,
    sharedOutputInitialNodeId,
    sharedOutputInitialItemId,
    sharedOutputSelectedItem,
  }: ToggleSharedOutputsDialogArgs) => void;
}

export const useWorkflowEditorStore = create<WorkflowEditorState>(
  (set, state) => ({
    // Chat-related
    isWorkflowChatOpen: false,
    toggleWorkflowChat: (isOpen) => set({ isWorkflowChatOpen: isOpen }),

    // Workflow Editor
    currentEditor: {
      editor: undefined,
      state: undefined,
      executionPlan: undefined,
      errors: undefined,
      workflowDefinition: undefined,
    },
    setCurrentEditor: ({
      editor,
      state,
      executionPlan,
      errors,
    }: {
      editor?: NodeEditor<Schemes>;
      state?: currentEditorState;
      executionPlan?: ExecutionPlan;
      errors?: Set<string>;
    }) =>
      set({
        currentEditor: {
          editor,
          state,
          executionPlan,
          errors,
        },
      }),

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
    sharedOutputInputToken: undefined,
    sharedOutputInitialNodeId: undefined,
    sharedOutputInitialItemId: undefined,
    sharedOutputSelectedItem: undefined,

    toggleSharedOutputsDialog: ({
      isSharedOutputsDialogOpen,
      sharedOutputInputToken,
      sharedOutputInitialNodeId,
      sharedOutputInitialItemId,
      sharedOutputSelectedItem,
    }: ToggleSharedOutputsDialogArgs) =>
      set({
        isSharedOutputsDialogOpen,
        sharedOutputInputToken,
        sharedOutputInitialNodeId,
        sharedOutputInitialItemId,
        sharedOutputSelectedItem,
      }),
  })
);
