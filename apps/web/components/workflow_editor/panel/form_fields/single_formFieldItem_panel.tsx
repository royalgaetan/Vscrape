import React, { useEffect, useState } from "react";
import MultiSelect from "@/components/global/multi_select";
import { Separator } from "@/components/ui/separator";
import { delay } from "@/lib/numbers_utils";
import FieldLabel from "../field_label";
import PanelHeader from "../panel_header";
import { VsNode } from "@/lib/workflow_editor/classes/node";
import FormFieldBlockCard from "./form_field_block_card";
import SimpleTooltip from "@/components/global/simple_tooltip";
import { Button } from "@/components/ui/button";
import FormFieldBlockPreview from "./form_field_block_preview";
import {
  Check,
  Loader2,
  LucideIcon,
  PenLine,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { extractTextFromHTML, toStringSafe } from "@/lib/string_utils";
import { FormFieldItem } from "@/lib/workflow_editor/classes/form_field_block";
import { cloneDeep } from "lodash";
import { workflowFormFieldItems } from "@/lib/workflow_editor/constants/workflow_form_fields_definition";
import { isAFile } from "@/lib/workflow_editor/types/mime_types";
import {
  getInvalidInputs,
  insertOrRemoveIdsFromCurrentEditorErrors,
} from "@/lib/workflow_editor/utils/w_utils";
import { useWorkflowEditorStore } from "@/stores/workflowStore";

const SingleFormFieldItemPanel = ({
  initialNode,
  initialFieldItem,
  onBack,
  onSave,
  onDelete,
  displayBackButton,
}: {
  initialNode: VsNode;
  initialFieldItem?: FormFieldItem;
  onBack?: () => void;
  onSave: (fieldItem: FormFieldItem) => void;
  onDelete: (fieldItemId: string) => void;
  displayBackButton?: boolean;
}) => {
  const [currentFieldItem, setCurrentFieldItem] = useState(
    initialFieldItem ?? cloneDeep(initialFieldItem)
  );

  const [isLoadingBlock, setIsLoadingBlock] = useState(false);
  const [isSavingFormFieldBlock, setIsSavingFormFieldBlock] = useState(false);
  const [SavingFormFieldBlockResultIcon, setSavingFormFieldBlockResultIcon] =
    useState<LucideIcon | undefined>(undefined);

  // States
  const [errorFields, setErrorFields] = useState<string[]>([]);

  const saveFormFieldBlock = async () => {
    setErrorFields([]);
    setSavingFormFieldBlockResultIcon(undefined);
    setIsSavingFormFieldBlock(true);
    await delay(400);

    try {
      // Save values to original block
      if (!currentFieldItem)
        throw new Error("An error occured while saving this field.");

      // Errors Checking
      errorChecker(currentFieldItem);

      setIsSavingFormFieldBlock(false);
      setSavingFormFieldBlockResultIcon(Check);
      await delay(150);
      setSavingFormFieldBlockResultIcon(undefined);

      onSave(currentFieldItem);
    } catch (e) {
      console.log("Err", e);
      toast.error(
        e instanceof Error ? e.message : "An error occured. Try again.",
        {
          position: "bottom-center",
          richColors: true,
        }
      );
      setIsSavingFormFieldBlock(false);
      setSavingFormFieldBlockResultIcon(X);
      await delay(1000);
      setSavingFormFieldBlockResultIcon(undefined);
      return;
    }
  };

  const errorChecker = (currentFieldItem: FormFieldItem) => {
    // Get Invalid Inputs
    const errFields = getInvalidInputs({
      from: currentFieldItem,
      nodeId: initialNode.id,
      itemId: currentFieldItem.id,
    });

    // If found
    if (errFields.length > 0) {
      // Add the current "FieldItem Id" + "Parent Node Id" among CurrentEditor errors list
      insertOrRemoveIdsFromCurrentEditorErrors({
        fromId: currentFieldItem.id,
        initialNodeId: initialNode.id,
        action: "add",
      });

      setErrorFields(errFields);
      console.log("errFields", errFields);
      throw new Error("Can't save this field.");
    } else {
      // Remove the current "Operation Item Id" + "Parent Node Id" among CurrentEditor errors list

      insertOrRemoveIdsFromCurrentEditorErrors({
        fromId: currentFieldItem.id,
        initialNodeId: initialNode.id,
        action: "remove",
      });
    }
  };

  useEffect(() => {
    if (!currentFieldItem) return;
    const sub = currentFieldItem.stream$().subscribe((newData) => {
      setCurrentFieldItem(newData);
    });

    return () => sub.unsubscribe();
  }, [currentFieldItem]);

  useEffect(() => {
    // Run Errors Checking if on Update Mode
    if (initialFieldItem) {
      try {
        errorChecker(initialFieldItem);
      } catch (e) {
        console.log("Err", e);
      }
    }
  }, []);

  return (
    <div className="flex flex-col w-full max-h-full relative">
      <div className="flex flex-col w-full max-h-full overflow-x-clip overflow-y-scroll scrollbar-hide">
        {/* Header */}
        <div className="px-4 w-full">
          <PanelHeader
            nodeOrigin={initialNode}
            displayBackButton={displayBackButton}
            onBack={() => {
              if (onBack) {
                if (currentFieldItem) {
                  insertOrRemoveIdsFromCurrentEditorErrors({
                    fromId: currentFieldItem.id,
                    initialNodeId: initialNode.id,
                    action: "remove",
                  });
                }
                onBack();
              }
            }}
          />
        </div>

        {/* Content */}
        <div className="mt-4 pb-6 space-y-4">
          {/* FormFieldBlock Selector */}
          <div className="flex flex-col justify-start items-start px-4 pr-4">
            <FieldLabel
              label={
                currentFieldItem
                  ? "Change Form Field Type"
                  : "Select a Form Field"
              }
              Icon={PenLine}
            />

            <MultiSelect
              isTriggerDisabled={workflowFormFieldItems.length < 1}
              triggerClassName={`h-9 w-[15.7rem] flex flex-1 mb-1  ${
                errorFields.includes("fieldName") &&
                "border-destructive/70 ring-2 ring-destructive/60"
              }`}
              popoverAlignment="center"
              selectionMode="single"
              popoverClassName="max-h-60 min-h-fit w-[15.7rem]"
              label={currentFieldItem?.fieldName ?? "Pick a Form Field"}
              itemTooltipClassname="w-52"
              data={{
                "": workflowFormFieldItems.map((fieldBlock) => ({
                  label: fieldBlock.fieldName,
                  value: fieldBlock.fieldName,
                  icon: fieldBlock.fieldIcon,
                  iconClassName: "stroke-neutral-400 fill-transparent",
                  tooltipContent: fieldBlock.fieldTooltipContent,
                  tooltipAlign: "end",
                  tooltipSide: "left",
                })),
              }}
              selectedValues={
                currentFieldItem?.fieldName ? [currentFieldItem.fieldName] : []
              }
              handleSelect={(fieldNameSelected) => {
                // Clean Error
                setErrorFields([]);
                // Save new changes
                if (fieldNameSelected === currentFieldItem?.fieldName) {
                  setCurrentFieldItem(undefined);
                } else if (fieldNameSelected !== currentFieldItem?.fieldName) {
                  const fieldDefinition = workflowFormFieldItems.find(
                    (f) => f.fieldName === fieldNameSelected
                  );
                  if (!fieldDefinition) return;
                  // Flush
                  setCurrentFieldItem(undefined);
                  setIsLoadingBlock(true);

                  const fieldItem = new FormFieldItem(
                    cloneDeep({ ...fieldDefinition, id: initialFieldItem?.id })
                  );

                  setCurrentFieldItem(fieldItem);

                  // Reassign
                  setTimeout(() => {
                    setIsLoadingBlock(false);
                  }, 300);
                }
              }}
            />
          </div>
          <Separator className="my-2" />

          {/* Loader */}
          {isLoadingBlock && (
            <div className="flex justify-center items-center h-44">
              <Loader2 className="animate-spin text-neutral-500" />
            </div>
          )}

          {/* Content */}
          {!isLoadingBlock && currentFieldItem && (
            <div className="flex flex-col justify-start items-start">
              {/* Edit Field Block: Parameters List */}
              <div className="flex flex-col gap-5 w-full px-4 pr-4">
                {/* Field Label */}
                {currentFieldItem.fieldLabel !== undefined &&
                  typeof currentFieldItem.fieldLabel === "string" &&
                  !currentFieldItem.isHidden && (
                    <FormFieldBlockCard
                      key={`${currentFieldItem.id}_fieldLabel`}
                      fieldAttrName="Field Label"
                      fieldAttrPlaceholder={"Enter the field label..."}
                      fieldAttrType={"text"}
                      hasError={errorFields.includes("fieldLabel")}
                      initialValue={currentFieldItem.fieldLabel}
                      onChange={(newVal) => {
                        // Clean Error
                        setErrorFields((prev) =>
                          prev.filter((f) => f !== "fieldLabel")
                        );
                        // Save new changes
                        // setFieldLabel(newVal);
                        currentFieldItem.fieldLabel = newVal;
                      }}
                    />
                  )}
                {/* Field Placeholder */}
                {currentFieldItem.fieldPlaceholder !== undefined &&
                  typeof currentFieldItem.fieldPlaceholder === "string" &&
                  !currentFieldItem.isHidden && (
                    <FormFieldBlockCard
                      key={`${currentFieldItem?.id}_fieldPlaceholder`}
                      fieldAttrName="Field Placeholder"
                      fieldAttrPlaceholder={"Enter the field placeholder..."}
                      fieldAttrType={"text"}
                      hasError={errorFields.includes("fieldPlaceholder")}
                      initialValue={currentFieldItem.fieldPlaceholder}
                      onChange={(newVal) => {
                        // Clean Error
                        setErrorFields((prev) =>
                          prev.filter((f) => f !== "fieldPlaceholder")
                        );
                        // Save new changes
                        currentFieldItem.fieldPlaceholder = newVal;
                      }}
                    />
                  )}
                {/* Field Description */}
                {currentFieldItem.fieldDescription !== undefined &&
                  typeof currentFieldItem.fieldDescription === "string" &&
                  !currentFieldItem.isHidden && (
                    <FormFieldBlockCard
                      key={`${currentFieldItem?.id}_fieldDescription`}
                      fieldAttrName="Field Description"
                      fieldAttrPlaceholder={"Enter the field description..."}
                      fieldAttrType={"text"}
                      hasError={errorFields.includes("fieldDescription")}
                      initialValue={currentFieldItem.fieldDescription}
                      onChange={(newVal) => {
                        // Clean Error
                        setErrorFields((prev) =>
                          prev.filter((f) => f !== "fieldDescription")
                        );
                        // Save new changes
                        currentFieldItem.fieldDescription = newVal;
                      }}
                    />
                  )}
                {/* SPECIFIC */}
                {/* Field Value: only for "Hidden Fields" */}
                {currentFieldItem.isHidden !== undefined && (
                  <FormFieldBlockCard
                    key={`${currentFieldItem?.id}_fieldValue`}
                    fieldAttrName="Field Value"
                    fieldAttrPlaceholder={"Enter the field value..."}
                    fieldAttrType={"text"}
                    hasError={errorFields.includes("fieldValue")}
                    initialValue={currentFieldItem.fieldValue}
                    onChange={(newVal) => {
                      // Clean Error
                      setErrorFields((prev) =>
                        prev.filter((f) => f !== "fieldValue")
                      );
                      // Save new changes
                      currentFieldItem.fieldValue = newVal;
                    }}
                  />
                )}
                {/* SPECIFIC */}
                {/* Field isTextarea: Only for Input Text */}
                {currentFieldItem.isMultiline !== undefined &&
                  !currentFieldItem.isHidden && (
                    <FormFieldBlockCard
                      key={`${currentFieldItem?.id}_fieldEnableTextarea`}
                      fieldAttrName="Is Multi-line"
                      fieldAttrType={"switch"}
                      hasError={errorFields.includes("fieldIsMultiline")}
                      initialValue={currentFieldItem.isMultiline}
                      onChange={(newVal) => {
                        // Clean Error
                        setErrorFields((prev) =>
                          prev.filter((f) => f !== "fieldIsMultiline")
                        );
                        // Save new changes
                        currentFieldItem.isMultiline = newVal;
                      }}
                    />
                  )}
                {/* SPECIFIC */}
                {/* Field Accepted Extensions: only for "File Upload" */}
                {Array.isArray(currentFieldItem.acceptedFileExtensions) &&
                  !currentFieldItem.isHidden && (
                    <FormFieldBlockCard
                      key={`${currentFieldItem?.id}_fieldExtensionAllowed`}
                      fieldAttrName="Extensions Allowed"
                      fieldAttrPlaceholder={"Select allowed extensions..."}
                      fieldAttrType={"fileExtensions"}
                      hasError={errorFields.includes("fieldAcceptedExtensions")}
                      initialValue={currentFieldItem.acceptedFileExtensions}
                      onChange={(mimeArr) => {
                        // Clean Error
                        setErrorFields((prev) =>
                          prev.filter((f) => f !== "fieldAcceptedExtensions")
                        );
                        // Save new changes
                        currentFieldItem.acceptedFileExtensions = mimeArr;
                      }}
                    />
                  )}
                {/* Field Optionality */}
                {currentFieldItem.isOptional !== undefined &&
                  typeof currentFieldItem.isOptional === "boolean" &&
                  !currentFieldItem.isHidden && (
                    <FormFieldBlockCard
                      key={`${currentFieldItem?.id}_fieldOptionality`}
                      fieldAttrName="Is Optional"
                      fieldAttrType={"switch"}
                      hasError={errorFields.includes("fieldIsOptional")}
                      initialValue={currentFieldItem.isOptional}
                      onChange={(newVal) => {
                        // Clean Error
                        setErrorFields((prev) =>
                          prev.filter((f) => f !== "fieldIsOptional")
                        );
                        // Save new changes
                        currentFieldItem.isOptional = newVal;
                      }}
                    />
                  )}
                {/* Field Values To Pick From */}
                {currentFieldItem.fieldValueToPickFrom !== undefined &&
                  Array.isArray(currentFieldItem.fieldValueToPickFrom) &&
                  !currentFieldItem.isHidden && (
                    <FormFieldBlockCard
                      key={`${currentFieldItem?.id}_fieldValuesToPickFrom`}
                      fieldAttrName="Possible Choices"
                      fieldAttrType={"array"}
                      hasError={errorFields.includes("fieldValueToPickFrom")}
                      initialValue={currentFieldItem.fieldValueToPickFrom}
                      onChange={(newArr) => {
                        // Clean Error
                        setErrorFields((prev) =>
                          prev.filter((f) => f !== "fieldValueToPickFrom")
                        );
                        // Save new changes
                        currentFieldItem.fieldValueToPickFrom = newArr;
                      }}
                    />
                  )}
              </div>
              {/* Field Block Preview */}
              {currentFieldItem && (
                <>
                  {/* Separator */}
                  <Separator className="mt-6 mb-[0.5px]" />

                  <div className="flex flex-col w-full max-h-fit min-h-28 bg-neutral-200/50 px-4 pr-4 pb-7 editor-background-dots">
                    <Label className="text-xs text-neutral-500 mt-3 mb-4">
                      Field Preview
                    </Label>
                    <div className="flex flex-1">
                      <FormFieldBlockPreview fieldItem={currentFieldItem} />
                    </div>
                  </div>
                </>
              )}
              {/* Spacer */}
              <div className="h-20"></div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      {currentFieldItem && (
        <div className="flex flex-col w-[var(--workflowPanelWidth)] bg-white z-10 fixed bottom-[7vh]">
          {/* Action Buttons: Delete | Save Field */}
          <div className="flex flex-1 justify-end items-center py-1 px-3 border-t">
            {/* Delete Button: only if we're in [UPDATE Mode] */}
            {initialFieldItem && (
              <div className="flex flex-1 justify-start">
                <SimpleTooltip tooltipText={"Delete Field"}>
                  <Button
                    type="button"
                    variant={"ghost"}
                    size={"sm"}
                    className="w-fit"
                    onClick={() => {
                      if (currentFieldItem) {
                        insertOrRemoveIdsFromCurrentEditorErrors({
                          fromId: currentFieldItem.id,
                          initialNodeId: initialNode.id,
                          action: "remove",
                        });
                      }
                      // Delete Field
                      onDelete(initialFieldItem.id);
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

export default SingleFormFieldItemPanel;
