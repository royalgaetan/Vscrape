import React, { useRef, useState } from "react";
import MultiSelect from "@/components/global/multi_select";
import { Separator } from "@/components/ui/separator";
import { delay } from "@/lib/numbers_utils";
import { NodeBlockType, useWorkflowEditorStore } from "@/stores/workflowStore";
import FieldLabel from "../field_label";
import PanelHeader from "../panel_header";
import { VsNode } from "@/lib/workflow_editor/classes/node";
import {
  PossibleFieldBlockType as FieldBlockType,
  FormFieldFileUpload,
  FormFieldTextInput,
  getFormFieldBlockByName,
  workflowFormFieldBlocks,
} from "@/lib/workflow_editor/constants/workflow_form_fields_definition";
import FormFieldBlockCard from "./form_field_block_card";
import SimpleTooltip from "@/components/global/simple_tooltip";
import { Button } from "@/components/ui/button";
import FormFieldBlockPreview from "./form_field_block_preview";
import {
  Check,
  Hash,
  Loader2,
  LucideIcon,
  PenLine,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const SingleFormFieldPanel = ({
  nodeOrigin,
  fieldBlockOrigin,
  onBack,
  onSave,
  onDelete,
  displayBackButton,
}: {
  nodeOrigin: VsNode;
  fieldBlockOrigin?: FieldBlockType;
  onBack?: () => void;
  onSave: (block?: NodeBlockType) => void;
  onDelete: (FormFieldBlockId: string) => void;
  displayBackButton?: boolean;
}) => {
  const fieldId = useRef<string>(fieldBlockOrigin?.id ?? crypto.randomUUID());

  // Store
  const currentNode = useWorkflowEditorStore((s) => s.currentNode);
  const currentBlock = useWorkflowEditorStore(
    (s) => s.currentBlock
  ) as FieldBlockType;
  const setCurrentBlock = useWorkflowEditorStore((s) => s.setCurrentBlock);
  // End Store

  const [isSavingFormFieldBlock, setIsSavingFormFieldBlock] = useState(false);
  const [SavingFormFieldBlockResultIcon, setSavingFormFieldBlockResultIcon] =
    useState<LucideIcon | undefined>(undefined);

  const saveFormFieldBlock = async () => {
    setSavingFormFieldBlockResultIcon(undefined);
    setIsSavingFormFieldBlock(true);
    await delay(400);

    if (!currentNode || !currentBlock) {
      setIsSavingFormFieldBlock(false);
      setSavingFormFieldBlockResultIcon(X);
      await delay(1000);
      setSavingFormFieldBlockResultIcon(undefined);
      return;
    }
    try {
      setIsSavingFormFieldBlock(false);
      setSavingFormFieldBlockResultIcon(Check);
      await delay(150);
      setSavingFormFieldBlockResultIcon(undefined);
      onSave(currentBlock);
    } catch (e) {
      console.log("Err", e);
      setIsSavingFormFieldBlock(false);
      setSavingFormFieldBlockResultIcon(X);
      await delay(1000);
      setSavingFormFieldBlockResultIcon(undefined);
      return;
    }
  };

  // if (!(currentBlock instanceof FieldBlockType)) return;

  return (
    <div className="flex flex-col w-full max-h-full relative">
      <div className="flex flex-col w-full max-h-full overflow-x-clip overflow-y-scroll scrollbar-hide">
        {/* Header */}
        <div className="px-4 w-full">
          <PanelHeader
            nodeOrigin={nodeOrigin}
            displayBackButton={displayBackButton}
            onBack={() => onBack && onBack()}
          />
        </div>

        {/* Content */}
        <div className="mt-4 pb-6 space-y-4">
          {/* FormFieldBlock Selector */}
          <div className="flex flex-col justify-start items-start px-4 pr-4">
            <FieldLabel
              label={
                fieldBlockOrigin
                  ? "Change Form Field Type"
                  : "Select a Form Field"
              }
              Icon={PenLine}
            />

            <MultiSelect
              isTriggerDisabled={workflowFormFieldBlocks.length < 1}
              triggerClassName="h-9 w-[15.7rem] flex flex-1 mb-1"
              popoverAlignment="center"
              selectionMode="single"
              popoverClassName="max-h-60 min-h-fit w-[15.7rem]"
              label={currentBlock?.fieldName ?? "Pick a Form Field"}
              itemTooltipClassname="w-52"
              data={{
                "": workflowFormFieldBlocks.map((fieldBlock) => ({
                  label: fieldBlock.fieldName,
                  value: fieldBlock.fieldName,
                  icon: Hash,
                  iconClassName: "stroke-neutral-400 fill-transparent",
                  tooltipContent: fieldBlock.fieldTooltipContent,
                  tooltipAlign: "end",
                  tooltipSide: "left",
                })),
              }}
              selectedValues={
                currentBlock?.fieldName ? [currentBlock.fieldName] : []
              }
              handleSelect={(fieldNameSelected) => {
                if (
                  currentBlock &&
                  fieldNameSelected === currentBlock.fieldName
                ) {
                  setCurrentBlock(undefined);
                } else {
                  const newFormFieldBlock =
                    getFormFieldBlockByName(fieldNameSelected);
                  if (!newFormFieldBlock) return;
                  setCurrentBlock(newFormFieldBlock);
                }
              }}
            />
          </div>
          <Separator className="my-2" />

          {currentBlock && (
            <div className="flex flex-col justify-start items-start">
              {/* Edit Field Block: Parameters List */}
              <div className="flex flex-col gap-5 w-full px-4 pr-4">
                {/* Field Label */}
                {typeof currentBlock.fieldLabel === "string" &&
                  !currentBlock.isHidden && (
                    <FormFieldBlockCard
                      key={`${currentBlock.id}_fieldLabel`}
                      fieldAttrName="Field Label"
                      fieldAttrPlaceholder={"Enter the field label..."}
                      fieldAttrType={"text"}
                      initialValue={currentBlock.fieldLabel}
                      onChange={(newVal) => (currentBlock.fieldLabel = newVal)}
                    />
                  )}

                {/* Field Placeholder */}
                {typeof currentBlock.fieldPlaceholder === "string" &&
                  !currentBlock.isHidden && (
                    <FormFieldBlockCard
                      key={`${currentBlock.id}_fieldPlaceholder`}
                      fieldAttrName="Field Placeholder"
                      fieldAttrPlaceholder={"Enter the field placeholder..."}
                      fieldAttrType={"text"}
                      initialValue={currentBlock.fieldPlaceholder}
                      onChange={(newVal) =>
                        (currentBlock.fieldPlaceholder = newVal)
                      }
                    />
                  )}

                {/* Field Description */}
                {typeof currentBlock.fieldDescription === "string" &&
                  !currentBlock.isHidden && (
                    <FormFieldBlockCard
                      key={`${currentBlock.id}_fieldDescription`}
                      fieldAttrName="Field Description"
                      fieldAttrPlaceholder={"Enter the field description..."}
                      fieldAttrType={"text"}
                      initialValue={currentBlock.fieldDescription}
                      onChange={(newVal) =>
                        (currentBlock.fieldDescription = newVal)
                      }
                    />
                  )}

                {/* SPECIFIC */}
                {/* Field Value: only for "Hidden Fields" */}
                {currentBlock.isHidden && (
                  <FormFieldBlockCard
                    key={`${currentBlock.id}_fieldValue`}
                    fieldAttrName="Field Value"
                    fieldAttrPlaceholder={"Enter the field value..."}
                    fieldAttrType={"text"}
                    initialValue={currentBlock.fieldValue}
                    onChange={(newVal) => (currentBlock.fieldValue = newVal)}
                  />
                )}

                {/* SPECIFIC */}
                {/* Field isTextarea: Only for Input Text */}
                {currentBlock instanceof FormFieldTextInput &&
                  !currentBlock.isHidden && (
                    <FormFieldBlockCard
                      key={`${currentBlock.id}_fieldEnableTextarea`}
                      fieldAttrName="Is Multi-line"
                      fieldAttrType={"switch"}
                      initialValue={currentBlock.isTextArea}
                      onChange={(newVal) => (currentBlock.isTextArea = newVal)}
                    />
                  )}

                {/* SPECIFIC */}
                {/* Field Accepted Extensions: only for "File Upload" */}
                {currentBlock instanceof FormFieldFileUpload &&
                  !currentBlock.isHidden && (
                    <FormFieldBlockCard
                      key={`${currentBlock.id}_fieldExtensionAllowed`}
                      fieldAttrName="Extensions Allowed"
                      fieldAttrPlaceholder={"Select allowed extensions..."}
                      fieldAttrType={"fileExtensions"}
                      initialValue={currentBlock.acceptedExtensions}
                      onChange={(newVal) =>
                        (currentBlock.acceptedExtensions = newVal)
                      }
                    />
                  )}

                {/* Field Optionality */}
                {typeof currentBlock.isOptional === "boolean" &&
                  !currentBlock.isHidden && (
                    <FormFieldBlockCard
                      key={`${currentBlock.id}_fieldOptionality`}
                      fieldAttrName="Is Optional"
                      fieldAttrType={"switch"}
                      initialValue={currentBlock.isOptional}
                      onChange={(newVal) => (currentBlock.isOptional = newVal)}
                    />
                  )}

                {/* Field Values To Pick From */}
                {Array.isArray(currentBlock.fieldValueToPickFrom) &&
                  !currentBlock.isHidden && (
                    <FormFieldBlockCard
                      key={`${currentBlock.id}_fieldValuesToPickFrom`}
                      fieldAttrName="Possible Choices"
                      fieldAttrType={"array"}
                      initialValue={currentBlock.fieldValueToPickFrom}
                      onChange={(newVal) =>
                        (currentBlock.fieldValueToPickFrom = newVal)
                      }
                    />
                  )}
              </div>

              {/* Separator */}
              {currentBlock && <Separator className="mt-6 mb-[0.5px]" />}

              {/* Field Block Preview */}
              {currentBlock && (
                <div className="flex flex-col w-full max-h-fit min-h-28 bg-neutral-200/50 px-4 pr-4 editor-background-dots">
                  <Label className="text-xs text-neutral-500 mt-3 mb-4">
                    Field Preview
                  </Label>
                  <div className="flex flex-1">
                    <FormFieldBlockPreview fieldBlock={currentBlock} />
                  </div>
                </div>
              )}

              {/* Spacer */}
              <div className="h-20"></div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      {currentBlock && (
        <div className="flex flex-col w-[var(--workflowPanelWidth)] bg-white z-10 fixed bottom-[7vh]">
          {/* Action Buttons: Delete | Save Field */}
          <div className="flex flex-1 justify-end items-center py-1 px-3 border-t">
            {/* Delete Button: only if we're in [UPDATE Mode] */}
            {currentBlock && (
              <div className="flex flex-1 justify-start">
                <SimpleTooltip tooltipText={"Delete Field"}>
                  <Button
                    type="button"
                    variant={"ghost"}
                    size={"sm"}
                    className="w-fit"
                    onClick={() => {
                      // Delete Field
                      onDelete(currentBlock.id);
                    }}
                  >
                    <Trash2 />
                  </Button>
                </SimpleTooltip>
              </div>
            )}

            <Button
              variant={"default"}
              disabled={isSavingFormFieldBlock}
              className="rounded-2xl h-7 text-xs gap-1 px-3 duration-150"
              onClick={() => saveFormFieldBlock()}
              // disabled={!onboardingForm.formState.isValid}
            >
              {isSavingFormFieldBlock &&
                SavingFormFieldBlockResultIcon === undefined && (
                  <Loader2 className="animate-spin stroke-white" />
                )}
              {SavingFormFieldBlockResultIcon && !isSavingFormFieldBlock && (
                <SavingFormFieldBlockResultIcon className="stroke-white" />
              )}

              {!isSavingFormFieldBlock &&
                SavingFormFieldBlockResultIcon === undefined && (
                  <Save className="stroke-white" />
                )}
              <span className="">Save Field</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleFormFieldPanel;
