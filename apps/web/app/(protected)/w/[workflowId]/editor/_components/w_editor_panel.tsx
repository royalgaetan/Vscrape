import React, { useEffect, useState } from "react";
import SimpleTooltip from "@/components/global/simple_tooltip";
import { Button } from "@/components/ui/button";
import NodeActionButtons from "@/components/workflow_editor/panel/node_action_buttons";
import PanelHeader from "@/components/workflow_editor/panel/panel_header";
import { useWorkflowEditorStore } from "@/stores/workflowStore";
import OperationsList from "@/components/workflow_editor/panel/operations/operations_list";
import { Info, Play, X } from "lucide-react";
import SingleFormFieldPanel from "@/components/workflow_editor/panel/form_fields/single_formFieldItem_panel";
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
import SingleOperationItemPanel from "@/components/workflow_editor/panel/operations/single_operationItem_panel";
import {
  OperationBlock,
  OperationItem,
} from "@/lib/workflow_editor/classes/operation_block";
import {
  FormBlock,
  FormFieldItem,
} from "@/lib/workflow_editor/classes/form_field_block";
import { rebuildExecutionPlan } from "@/lib/workflow_editor/utils/w_utils";
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
  const handleBackButton = () => {
    rebuildExecutionPlan();
    setIsEditing(false);
  };

  useEffect(() => {
    // When the Workflow Panel changes: set EditingMode to false
    const unsub = useWorkflowEditorStore.subscribe((state, prev) => {
      if (
        prev.currentNode?.id !== state.currentNode?.id ||
        isWorkflowPanelOpen
      ) {
        // Display a confirmation dialog if on Editing Mode
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
            <div className="!h-5 pointer-events-none flex w-[var(--workflowPanelWidth)] justify-end px-4 items-center bg-transparent z-10 translate-y-4 -mb-1 sticky top-0">
              {!isEditing && (
                <SimpleTooltip
                  side="bottom"
                  align="end"
                  tooltipText={"Close the panel"}
                >
                  <Button
                    className="pointer-events-auto bg-gray-100 hover:bg-gray-200 inset-0 p-3 duration-0 rounded-full size-4 flex justify-center items-center"
                    variant={"ghost"}
                    onClick={() => {
                      toggleWorkflowPanel(false, undefined);
                    }}
                  >
                    <X className="size-3" />
                  </Button>
                </SimpleTooltip>
              )}
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
                  <SingleOperationItemPanel
                    initialNode={currentNode}
                    initialOperationItem={
                      blockOrigin as OperationItem | undefined
                    }
                    displayBackButton={isEditing}
                    onDelete={(operationItemId) => {
                      setIsEditing(false);
                      if (!operationItemId) return;
                      (currentNode.block as OperationBlock).removeItem(
                        operationItemId
                      );
                      rebuildExecutionPlan();
                    }}
                    onSave={(operationItem) => {
                      setIsEditing(false);
                      (currentNode.block as OperationBlock).upsertItem(
                        operationItem
                      );
                      rebuildExecutionPlan();
                    }}
                    onBack={() => handleBackButton()}
                  />
                ) : (
                  <></>
                )}

                {/* Form Field Block Panel */}
                {currentNode.blockType === "formField" && (
                  <SingleFormFieldPanel
                    initialNode={currentNode}
                    initialFieldItem={blockOrigin as FormFieldItem | undefined}
                    displayBackButton={isEditing}
                    onSave={(fieldItem) => {
                      setIsEditing(false);
                      if (!fieldItem) return;
                      (currentNode.block as FormBlock).upsertFieldItem(
                        fieldItem
                      );
                    }}
                    onDelete={(fieldItemId) => {
                      setIsEditing(false);
                      (currentNode.block as FormBlock).removeFieldItem(
                        fieldItemId
                      );
                    }}
                    onBack={() => handleBackButton()}
                  />
                )}

                {/* Cron Block Panel: "Cron Editor" */}
                {currentNode.blockType === "cron" && (
                  <SingleCronEditorPanel
                    initialNode={currentNode}
                    initialCronBlock={blockOrigin as CronBlock | undefined}
                    displayBackButton={isEditing}
                    onDelete={() => {
                      setIsEditing(false);
                      currentNode.block = undefined;
                    }}
                    onSave={(cron) => {
                      setIsEditing(false);
                      if (!cron) return;
                      currentNode.block = cron;
                    }}
                    onBack={() => handleBackButton()}
                  />
                )}

                {/* Webhook Block Panel: "Webhook Editor" */}
                {currentNode.blockType === "webhook" && (
                  <SingleWebhookEditorPanel
                    initialNode={currentNode}
                    initialWebhookBlock={blockOrigin as WebhookBlock}
                    displayBackButton={isEditing}
                    onSave={(webhook) => {
                      setIsEditing(false);
                      if (!webhook) return;
                      currentNode.block = webhook;
                    }}
                    onBack={() => handleBackButton()}
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
                    onOperationItemSelect={(operationItem) => {
                      setBlockOrigin(operationItem);
                      setIsEditing(true);
                    }}
                    onAddOperationItem={() => {
                      setBlockOrigin(undefined);
                      setIsEditing(true);
                    }}
                  />
                )}
                {currentNode.blockType === "formField" && (
                  <FormFieldsList
                    onAddNewFieldItem={() => {
                      setBlockOrigin(undefined);
                      setIsEditing(true);
                    }}
                    onFieldItemDelete={(fieldItemId) => {
                      setIsEditing(false);
                      (currentNode.block as FormBlock).removeFieldItem(
                        fieldItemId
                      );
                    }}
                    onFieldItemEdit={(fieldItem) => {
                      setBlockOrigin(fieldItem);
                      setIsEditing(true);
                    }}
                    onFieldItemMove={(fieldItemId, direction) => {
                      (currentNode.block as FormBlock).moveFieldItem(
                        fieldItemId,
                        direction
                      );
                    }}
                  />
                )}
                {currentNode.blockType === "cron" && (
                  <CronBlockList
                    onCronEdit={(cron) => {
                      setBlockOrigin(cron);
                      setIsEditing(true);
                    }}
                    onCronDelete={() => {
                      currentNode.block = undefined;
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
                      currentNode.block = waitBlock;
                    }}
                  />
                )}
                {currentNode.blockType === "setVariables" && (
                  <SetVariablesBlockList
                    onSave={(setVariablesBlock) => {
                      if (!setVariablesBlock) return;
                      currentNode.block = setVariablesBlock;
                    }}
                  />
                )}

                {currentNode.blockType === "branch" && <BranchesList />}

                {currentNode.blockType === "preview" && (
                  <DataPreviewList
                    onPreviewItemEdit={(previewItem) => {
                      setBlockOrigin(previewItem);
                      setIsEditing(true);
                    }}
                    onPreviewItemDelete={(previewItemId) => {
                      (currentNode.block as OperationBlock).removeItem(
                        previewItemId
                      );
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
