import React, { useEffect, useState } from "react";
import SimpleTooltip from "@/components/global/simple_tooltip";
import { Button } from "@/components/ui/button";
import NodeActionButtons from "@/components/workflow_editor/panel/node_action_buttons";
import PanelHeader from "@/components/workflow_editor/panel/panel_header";
import { useWorkflowEditorStore } from "@/stores/workflowStore";
import { OperationBlock } from "@/lib/workflow_editor/classes/operation_block";
import OperationsList from "@/components/workflow_editor/panel/operations/operations_list";
import SingleOperationPanel from "@/components/workflow_editor/panel/operations/single_operation_panel";
import { Info, Play, X } from "lucide-react";
import SingleFormFieldPanel from "@/components/workflow_editor/panel/form_fields/single_form_field_panel";
import { PossibleFieldBlockType as FieldBlockType } from "@/lib/workflow_editor/constants/workflow_form_fields_definition";
import FormFieldsList from "@/components/workflow_editor/panel/form_fields/form_field_list";
import CronBlockList from "@/components/workflow_editor/panel/cron/cron_block_list";
import SingleCronEditorPanel from "@/components/workflow_editor/panel/cron/single_cron_editor_panel";
import { CronBlock } from "@/lib/workflow_editor/classes/cron_block";
import { KeyBox } from "@/components/global/duration_picker";
import ExecuteButton from "@/components/workflow_editor/buttons/execute_button";
import WebhookBlockList from "@/components/workflow_editor/panel/webhook/webhook_block_list";
import SingleWebhookEditorPanel from "@/components/workflow_editor/panel/webhook/single_webhook_editor_panel";
import { WebhookBlock } from "@/lib/workflow_editor/classes/webhook_block";
import WaitBlockList from "@/components/workflow_editor/panel/wait/wait_block_list";
import SetVariablesBlockList from "@/components/workflow_editor/panel/setVariables/setVariables_block_list";
import BranchesList from "@/components/workflow_editor/panel/branches/branches_list";
import DataPreviewList from "@/components/workflow_editor/panel/data_preview/data_preview_list";

const EditorPanel = () => {
  // Store:
  const currentNode = useWorkflowEditorStore((s) => s.currentNode);
  const toggleWorkflowPanel = useWorkflowEditorStore(
    (s) => s.toggleWorkflowPanel
  );
  const isWorkflowPanelOpen = useWorkflowEditorStore(
    (s) => s.isWorkflowPanelOpen
  );

  // End Store
  const [isEditing, setIsEditing] = useState(false);
  const [blockOrigin, setBlockOrigin] = useState<any>();

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
                {currentNode.blockType === "operation" ||
                currentNode.blockType === "preview" ? (
                  <SingleOperationPanel
                    nodeOrigin={currentNode}
                    operationOrigin={blockOrigin as OperationBlock | undefined}
                    displayBackButton={isEditing}
                    onDelete={(operationId) => {
                      setIsEditing(false);
                      currentNode.removeBlock(operationId);
                    }}
                    onSave={(operation) => {
                      setIsEditing(false);
                      if (!operation) return;
                      currentNode.upsertBlock(operation);
                    }}
                    onBack={() => {
                      setIsEditing(false);
                    }}
                  />
                ) : (
                  <></>
                )}

                {/* Form Field Block Panel */}
                {currentNode.blockType === "formField" && (
                  <SingleFormFieldPanel
                    nodeOrigin={currentNode}
                    fieldBlockOrigin={blockOrigin as FieldBlockType | undefined}
                    displayBackButton={isEditing}
                    onSave={(fieldBlock) => {
                      setIsEditing(false);
                      if (!fieldBlock) return;
                      currentNode.upsertBlock(fieldBlock);
                    }}
                    onDelete={(fieldBlockId) => {
                      setIsEditing(false);
                      currentNode.removeBlock(fieldBlockId);
                    }}
                    onBack={() => {
                      setIsEditing(false);
                    }}
                  />
                )}

                {/* Cron Block Panel: "Cron Editor" */}
                {currentNode.blockType === "cron" && (
                  <SingleCronEditorPanel
                    nodeOrigin={currentNode}
                    cronBlockOrigin={blockOrigin as CronBlock | undefined}
                    displayBackButton={isEditing}
                    onDelete={(cronId) => {
                      setIsEditing(false);
                      currentNode.removeBlock(cronId);
                    }}
                    onSave={(cron) => {
                      setIsEditing(false);
                      if (!cron) return;
                      currentNode.upsertBlock(cron);
                    }}
                    onBack={() => {
                      setIsEditing(false);
                    }}
                  />
                )}

                {/* Webhook Block Panel: "Webhook Editor" */}
                {currentNode.blockType === "webhook" && (
                  <SingleWebhookEditorPanel
                    nodeOrigin={currentNode}
                    webhookBlockOrigin={blockOrigin as WebhookBlock}
                    displayBackButton={isEditing}
                    onSave={(webhook) => {
                      setIsEditing(false);
                      if (!webhook) return;
                      currentNode.upsertBlock(webhook);
                    }}
                    onBack={() => {
                      setIsEditing(false);
                    }}
                  />
                )}

                {/*  */}
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
                      setBlockOrigin(operation);
                      setIsEditing(true);
                    }}
                    onAddOperation={() => {
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
                      setBlockOrigin(undefined);
                      setIsEditing(true);
                    }}
                    onFieldDelete={(fieldBlockId) => {
                      currentNode.removeBlock(fieldBlockId);
                    }}
                    onFieldMove={(fieldBlockId, direction) => {
                      currentNode.moveBlock(fieldBlockId, direction);
                    }}
                  />
                )}
                {currentNode.blockType === "cron" && (
                  <CronBlockList
                    onCronEdit={(cron) => {
                      setBlockOrigin(cron);
                      setIsEditing(true);
                    }}
                    onCronDelete={(cronId) => {
                      currentNode.removeBlock(cronId);
                    }}
                  />
                )}
                {currentNode.blockType === "manual" && (
                  <div className="flex flex-col gap-6 mt-[3rem]">
                    {/* Good To Know */}
                    <div className="flex flex-1 text-xs gap-2 text-neutral-500">
                      <div className="w-5">
                        <Info />
                      </div>
                      <div className="inline-block">
                        This workflow won’t run on its own. Use the
                        <KeyBox
                          textContent="Execute"
                          Icon={Play}
                          boxClassName="w-fit h-4 p-[0.4px] px-1 rounded-[3rem] inline-flex translate-y-[2px]"
                          textContentClassname="scale-[0.85]"
                          iconClassName="scale-[0.85]"
                        />
                        button (here or from your Workflows page) to test or
                        trigger it.
                      </div>
                    </div>

                    {/* Execute Button */}
                    <ExecuteButton />
                  </div>
                )}
                {currentNode.blockType === "webhook" && (
                  <WebhookBlockList
                    onWebhookEdit={(webhook) => {
                      setBlockOrigin(webhook);
                      setIsEditing(true);
                    }}
                  />
                )}
                {currentNode.blockType === "wait" && (
                  <WaitBlockList
                    onSave={(waitBlock) => {
                      if (!waitBlock) return;
                      currentNode.upsertBlock(waitBlock);
                    }}
                  />
                )}
                {currentNode.blockType === "setVariables" && (
                  <SetVariablesBlockList
                    onSave={(setVariablesBlock) => {
                      if (!setVariablesBlock) return;
                      currentNode.upsertBlock(setVariablesBlock);
                    }}
                  />
                )}
                {currentNode.blockType === "branches" && <BranchesList />}
                {currentNode.blockType === "preview" && (
                  <DataPreviewList
                    onPreviewEdit={(previewOperation) => {
                      setBlockOrigin(previewOperation);
                      setIsEditing(true);
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
