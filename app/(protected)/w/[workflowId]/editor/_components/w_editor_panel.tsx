import React, { useEffect, useState } from "react";
import SimpleTooltip from "@/components/global/simple_tooltip";
import { Button } from "@/components/ui/button";
import NodeActionButtons from "@/components/workflow_editor/panel/node_action_buttons";
import PanelHeader from "@/components/workflow_editor/panel/panel_header";
import { NodeBlockType, useWorkflowEditorStore } from "@/stores/workflowStore";
import { OperationItem } from "@/lib/workflow_editor/classes/operation_item";
import OperationsList from "@/components/workflow_editor/panel/operations/operations_list";
import SingleOperationPanel from "@/components/workflow_editor/panel/operations/single_operation_panel";
import { X } from "lucide-react";
import SingleFormFieldPanel from "@/components/workflow_editor/panel/form_fields/single_form_field_panel";
import { PossibleFieldBlockType as FieldBlockType } from "@/lib/workflow_editor/constants/workflow_form_fields_definition";
import FormFieldsList from "@/components/workflow_editor/panel/form_fields/form_field_list";

const EditorPanel = () => {
  // Store:
  const currentNode = useWorkflowEditorStore((s) => s.currentNode);
  const updateCurrentNode = useWorkflowEditorStore((s) => s.updateCurrentNode);
  const setCurrentBlock = useWorkflowEditorStore((s) => s.setCurrentBlock);
  const toggleWorkflowPanel = useWorkflowEditorStore(
    (s) => s.toggleWorkflowPanel
  );
  const isWorkflowPanelOpen = useWorkflowEditorStore(
    (s) => s.isWorkflowPanelOpen
  );

  // End Store
  const [isEditing, setIsEditing] = useState(false);
  const [blockOrigin, setBlockOrigin] = useState<NodeBlockType>();

  useEffect(() => {
    // When the Workflow Panel changes: set EditingMode to false
    const unsub = useWorkflowEditorStore.subscribe((state, prev) => {
      if (
        prev.currentNode?.id !== state.currentNode?.id ||
        isWorkflowPanelOpen
      ) {
        setIsEditing(false);
      }
    });
    return () => unsub();
  }, []);

  return !isWorkflowPanelOpen ? (
    <></>
  ) : (
    <div className="group/workflowPanel [--workflowPanelWidth:18rem] min-w-[var(--workflowPanelWidth)] max-w-[var(--workflowPanelWidth)] h-full bg-white border-l flex flex-col items-start justify-start relative">
      <div className="flex flex-1 w-full max-h-full overflow-x-clip overflow-y-scroll scrollbar-hide">
        <div className="h-px w-full relative">
          <div className="min-w-[18rem] max-w-[18rem] bg-white border-r flex flex-col items-start justify-start relative">
            {/* Close Button */}
            <div className="pointer-events-none flex w-[var(--workflowPanelWidth)] justify-end px-4 items-center bg-transparent z-10 translate-y-4 -mb-1 sticky top-0">
              <SimpleTooltip
                side="bottom"
                align="end"
                tooltipText={"Close the panel"}
              >
                <Button
                  className="pointer-events-auto bg-gray-100 hover:bg-gray-200 inset-0 p-3 duration-0 rounded-full size-4 flex justify-center items-center"
                  variant={"ghost"}
                  onClick={() => {
                    if (isEditing) {
                      setBlockOrigin(undefined);
                    } else {
                      toggleWorkflowPanel(false, undefined);
                    }
                    setIsEditing(false);
                  }}
                >
                  <X className="size-3" />
                </Button>
              </SimpleTooltip>
            </div>

            {/* Content */}

            {/* Empty Display */}
            {!currentNode && (
              <div className=" text-muted-foreground w-full text-xs font-semibold flex flex-1 justify-center items-center min-h-[80vh]">
                Select a node.
              </div>
            )}

            {/* Single Operation Arena */}
            {currentNode && isEditing && (
              <>
                {/* Operation Panel */}
                {currentNode.blockType === "operation" && (
                  <SingleOperationPanel
                    nodeOrigin={currentNode}
                    operationOrigin={blockOrigin as OperationItem | undefined}
                    displayBackButton={isEditing}
                    onDelete={(operationId) => {
                      setIsEditing(false);
                      const updatedNode = currentNode.removeBlock(operationId);
                      updateCurrentNode(updatedNode);
                    }}
                    onSave={(operation) => {
                      setIsEditing(false);
                      if (!operation) return;
                      console.log("operation saved", operation);
                      const updatedNode = currentNode.upsertBlock(operation);
                      updateCurrentNode(updatedNode);
                    }}
                    onBack={() => {
                      setIsEditing(false);
                    }}
                  />
                )}

                {/* Form Field Block Panel */}
                {currentNode.blockType === "formField" && (
                  <SingleFormFieldPanel
                    nodeOrigin={currentNode}
                    fieldBlockOrigin={blockOrigin as FieldBlockType | undefined}
                    displayBackButton={isEditing}
                    onDelete={(fieldBlockId) => {
                      setIsEditing(false);
                      const updatedNode = currentNode.removeBlock(fieldBlockId);
                      updateCurrentNode(updatedNode);
                    }}
                    onSave={(fieldBlock) => {
                      setIsEditing(false);
                      if (!fieldBlock) return;
                      console.log("Field Block saved", fieldBlock);
                      const updatedNode = currentNode.upsertBlock(fieldBlock);
                      updateCurrentNode(updatedNode);
                    }}
                    onBack={() => {
                      setIsEditing(false);
                    }}
                  />
                )}
              </>
            )}

            {/* All Node's Blocks */}
            {currentNode && !isEditing && (
              <div className="px-4 w-full">
                {/* Header */}
                <PanelHeader nodeOrigin={currentNode} />

                {/* Buttons : Credit Cost, Notification, Unit test, Delete Node */}
                <NodeActionButtons />

                {/* Node: Block(Operations, FormFields) List (All) */}
                {currentNode.blockType === "operation" && (
                  <OperationsList
                    onOperationSelect={(operation) => {
                      setCurrentBlock(operation);
                      setBlockOrigin(operation);
                      setIsEditing(true);
                    }}
                    onAddOperation={() => {
                      setCurrentBlock(undefined);
                      setBlockOrigin(undefined);
                      setIsEditing(true);
                    }}
                  />
                )}

                {currentNode.blockType === "formField" && (
                  <FormFieldsList
                    onFieldEdit={(fieldBlockToEdit) => {
                      setBlockOrigin(fieldBlockToEdit);
                      setIsEditing(true);
                    }}
                    onAddNewField={() => {
                      setCurrentBlock(undefined);
                      setBlockOrigin(undefined);
                      setIsEditing(true);
                    }}
                    onFieldDelete={(fieldBlockId) => {
                      const updatedNode = currentNode.removeBlock(fieldBlockId);
                      updateCurrentNode(updatedNode);
                    }}
                    onFieldMove={(fieldBlockId, direction) => {
                      const updatedNode = currentNode.moveBlock(
                        fieldBlockId,
                        direction
                      );
                      updateCurrentNode(updatedNode);
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;
