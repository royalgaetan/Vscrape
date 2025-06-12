import React, { useEffect, useState } from "react";
import MultiSelect from "@/components/global/multi_select";
import { Separator } from "@/components/ui/separator";
import { delay } from "@/lib/numbers_utils";
import { NodeBlockType } from "@/stores/workflowStore";
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
import FormFieldBlockPreview, { isAFile } from "./form_field_block_preview";
import {
  Check,
  FileType,
  Hash,
  Loader2,
  LucideIcon,
  PenLine,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { VsFormInputFieldTypeUnion } from "@/lib/workflow_editor/types/w_types";
import { toast } from "sonner";
import { extractTextFromHTML, toStringSafe } from "@/lib/string_utils";

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
  onDelete: (fieldBlockId: string) => void;
  displayBackButton?: boolean;
}) => {
  const [isLoadingBlock, setIsLoadingBlock] = useState(false);
  const [isSavingFormFieldBlock, setIsSavingFormFieldBlock] = useState(false);
  const [SavingFormFieldBlockResultIcon, setSavingFormFieldBlockResultIcon] =
    useState<LucideIcon | undefined>(undefined);

  // States
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const [fieldName, setFieldName] = useState<string>();
  const [fieldType, setFieldType] = useState<
    VsFormInputFieldTypeUnion["type"] | undefined
  >();
  const [fieldLabel, setFieldLabel] = useState<string>();
  const [fieldValue, setFieldValue] = useState<any>();
  const [fieldIsOptional, setFieldIsOptional] = useState<boolean>();
  const [isFieldHidden, setIsFieldHidden] = useState<boolean>();

  const [fieldDescription, setFieldDescription] = useState<string>();
  const [fieldPlaceholder, setFieldPlaceholder] = useState<string>();

  const [fieldDefaultDescription, setFieldDefaultDescription] =
    useState<string>();
  const [fieldDefaultPlaceholder, setFieldDefaultPlaceholder] =
    useState<string>();

  const [fieldValueToPickFrom, setFieldValueToPickFrom] = useState<string[]>();

  // Specifics
  const [fieldIsMultiline, setFieldIsMultiline] = useState<boolean>();
  const [fieldAcceptedExtensions, setFieldAcceptedExtensions] = useState<
    string[]
  >([]);

  const saveFormFieldBlock = async () => {
    setErrorFields([]);
    setSavingFormFieldBlockResultIcon(undefined);
    setIsSavingFormFieldBlock(true);
    await delay(400);

    try {
      // Errors Checking
      errorChecker();

      // Save values to original block
      const blockUpdated = saveFields();
      if (!blockUpdated)
        throw new Error("An error occured while saving this field.");

      setIsSavingFormFieldBlock(false);
      setSavingFormFieldBlockResultIcon(Check);
      await delay(150);
      setSavingFormFieldBlockResultIcon(undefined);

      onSave(blockUpdated);
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

  const setValueStates = (block?: FieldBlockType) => {
    if (block) {
      // Update with new selected block values
      setFieldName(block.fieldName);
      setFieldLabel(block.fieldLabel);
      setFieldValue(block.fieldValue);
      setFieldType(block.fieldType);

      setFieldDescription(block.fieldDescription);
      setFieldPlaceholder(block.fieldPlaceholder);

      setFieldDefaultDescription(block.fieldDefaultDescription);
      setFieldDefaultPlaceholder(block.fieldDefaultPlaceholder);

      setFieldIsOptional(block.isOptional);
      setIsFieldHidden(block.isHidden);

      setFieldValueToPickFrom(block.fieldValueToPickFrom);
      setFieldIsMultiline(
        block instanceof FormFieldTextInput ? block.isMultiline : undefined
      );
      setFieldAcceptedExtensions(
        block instanceof FormFieldFileUpload
          ? block.acceptedExtensions
          : ([] as string[])
      );
    } else {
      setFieldName(undefined);
      setFieldLabel(undefined);
      setFieldValue(undefined);
      setFieldType(undefined);
      setFieldDescription(undefined);
      setFieldPlaceholder(undefined);

      setFieldDefaultDescription(undefined);
      setFieldDefaultPlaceholder(undefined);

      setFieldValueToPickFrom(undefined);
      setFieldIsMultiline(undefined);
      setFieldAcceptedExtensions([]);

      setFieldIsOptional(undefined);
      setIsFieldHidden(undefined);
    }
  };

  const errorChecker = () => {
    const errFields: string[] = [];
    if (!fieldName || !fieldType) {
      errFields.push("fieldName");
    }
    if (typeof fieldLabel === "string" && fieldLabel.length === 0) {
      errFields.push("fieldLabel");
    }
    // if (typeof fieldDescription === "string" && fieldDescription.length === 0) {
    //   errFields.push("fieldDescription");
    // }
    // if (typeof fieldPlaceholder === "string" && fieldPlaceholder.length === 0) {
    //   errFields.push("fieldPlaceholder");
    // }
    // if (fieldIsOptional === undefined) {
    //   errFields.push("fieldIsOptional");
    // }
    if (
      fieldValueToPickFrom !== undefined &&
      Array.isArray(fieldValueToPickFrom) &&
      fieldValueToPickFrom.filter((a) => extractTextFromHTML(a).length > 0)
        .length < 2
    ) {
      errFields.push("fieldValueToPickFrom");
    }

    if (isFieldHidden !== undefined && toStringSafe(fieldValue).length === 0) {
      errFields.push("fieldValue");
    }

    if (
      fieldType === "primitive/text" &&
      fieldValueToPickFrom === undefined &&
      fieldIsMultiline === undefined
    ) {
      errFields.push("fieldIsMultiline");
    }

    if (
      fieldType &&
      isAFile(fieldType) &&
      fieldAcceptedExtensions === undefined
    ) {
      errFields.push("fieldAcceptedExtensions");
    }

    if (errFields.length > 0) {
      setErrorFields(errFields);
      console.log("errFields", errFields);
      throw new Error("Can't save this field.");
    }
  };

  const saveFields = (): FieldBlockType | undefined => {
    //
    if (!fieldBlockOrigin || fieldBlockOrigin.fieldType !== fieldType) {
      const newFieldBlock = getFormFieldBlockByName(fieldName ?? "");
      if (!newFieldBlock) return;

      if (fieldBlockOrigin) newFieldBlock.updateId = fieldBlockOrigin.id;
      if (fieldLabel) newFieldBlock.fieldLabel = fieldLabel;
      if (fieldValue) newFieldBlock.fieldValue = fieldValue;

      if (fieldDescription) newFieldBlock.fieldDescription = fieldDescription;
      if (fieldPlaceholder) newFieldBlock.fieldPlaceholder = fieldPlaceholder;

      if (fieldValueToPickFrom)
        newFieldBlock.fieldValueToPickFrom = fieldValueToPickFrom;
      if (fieldIsOptional) newFieldBlock.isOptional = fieldIsOptional;

      if (newFieldBlock instanceof FormFieldTextInput && fieldIsMultiline)
        newFieldBlock.isMultiline = fieldIsMultiline;
      if (newFieldBlock instanceof FormFieldFileUpload)
        newFieldBlock.acceptedExtensions = fieldAcceptedExtensions;

      return newFieldBlock;
    }
    // Update Mode
    else if (fieldBlockOrigin) {
      if (fieldLabel) fieldBlockOrigin.fieldLabel = fieldLabel;
      if (fieldValue) fieldBlockOrigin.fieldValue = fieldValue;

      if (fieldDescription)
        fieldBlockOrigin.fieldDescription = fieldDescription;
      if (fieldPlaceholder)
        fieldBlockOrigin.fieldPlaceholder = fieldPlaceholder;
      if (fieldValueToPickFrom)
        fieldBlockOrigin.fieldValueToPickFrom = fieldValueToPickFrom;

      if (fieldIsOptional) fieldBlockOrigin.isOptional = fieldIsOptional;
      if (fieldBlockOrigin instanceof FormFieldTextInput && fieldIsMultiline)
        fieldBlockOrigin.isMultiline = fieldIsMultiline;
      if (fieldBlockOrigin instanceof FormFieldFileUpload)
        fieldBlockOrigin.acceptedExtensions = fieldAcceptedExtensions;

      return fieldBlockOrigin;
    }
  };

  useEffect(() => {
    setValueStates(fieldBlockOrigin);
  }, []);

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
              triggerClassName={`h-9 w-[15.7rem] flex flex-1 mb-1  ${
                errorFields.includes("fieldName") &&
                "border-destructive/70 ring-2 ring-destructive/60"
              }`}
              popoverAlignment="center"
              selectionMode="single"
              popoverClassName="max-h-60 min-h-fit w-[15.7rem]"
              label={fieldName ?? "Pick a Form Field"}
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
              selectedValues={fieldName ? [fieldName] : []}
              handleSelect={(fieldNameSelected) => {
                // Clean Error
                setErrorFields([]);
                // Save new changes
                if (!fieldBlockOrigin && fieldNameSelected === fieldName) {
                  setValueStates(undefined);
                } else if (fieldNameSelected !== fieldName) {
                  const newFormFieldBlock =
                    getFormFieldBlockByName(fieldNameSelected);
                  if (!newFormFieldBlock) return;
                  setValueStates(undefined);
                  setIsLoadingBlock(true);

                  setValueStates(newFormFieldBlock);
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
          {!isLoadingBlock && (
            <div className="flex flex-col justify-start items-start">
              {/* Edit Field Block: Parameters List */}
              <div className="flex flex-col gap-5 w-full px-4 pr-4">
                {/* Field Label */}
                {fieldLabel !== undefined &&
                  typeof fieldLabel === "string" &&
                  !isFieldHidden && (
                    <FormFieldBlockCard
                      key={`${fieldBlockOrigin?.id}_fieldLabel`}
                      fieldAttrName="Field Label"
                      fieldAttrPlaceholder={"Enter the field label..."}
                      fieldAttrType={"text"}
                      hasError={errorFields.includes("fieldLabel")}
                      initialValue={fieldLabel}
                      onChange={(newVal) => {
                        // Clean Error
                        setErrorFields((prev) =>
                          prev.filter((f) => f !== "fieldLabel")
                        );
                        // Save new changes
                        setFieldLabel(newVal);
                      }}
                    />
                  )}

                {/* Field Placeholder */}
                {fieldPlaceholder !== undefined &&
                  typeof fieldPlaceholder === "string" &&
                  !isFieldHidden && (
                    <FormFieldBlockCard
                      key={`${fieldBlockOrigin?.id}_fieldPlaceholder`}
                      fieldAttrName="Field Placeholder"
                      fieldAttrPlaceholder={"Enter the field placeholder..."}
                      fieldAttrType={"text"}
                      hasError={errorFields.includes("fieldPlaceholder")}
                      initialValue={fieldPlaceholder}
                      onChange={(newVal) => {
                        // Clean Error
                        setErrorFields((prev) =>
                          prev.filter((f) => f !== "fieldPlaceholder")
                        );
                        // Save new changes
                        setFieldPlaceholder(newVal);
                      }}
                    />
                  )}

                {/* Field Description */}
                {fieldDescription !== undefined &&
                  typeof fieldDescription === "string" &&
                  !isFieldHidden && (
                    <FormFieldBlockCard
                      key={`${fieldBlockOrigin?.id}_fieldDescription`}
                      fieldAttrName="Field Description"
                      fieldAttrPlaceholder={"Enter the field description..."}
                      fieldAttrType={"text"}
                      hasError={errorFields.includes("fieldDescription")}
                      initialValue={fieldDescription}
                      onChange={(newVal) => {
                        // Clean Error
                        setErrorFields((prev) =>
                          prev.filter((f) => f !== "fieldDescription")
                        );
                        // Save new changes
                        setFieldDescription(newVal);
                      }}
                    />
                  )}

                {/* SPECIFIC */}
                {/* Field Value: only for "Hidden Fields" */}
                {isFieldHidden !== undefined && (
                  <FormFieldBlockCard
                    key={`${fieldBlockOrigin?.id}_fieldValue`}
                    fieldAttrName="Field Value"
                    fieldAttrPlaceholder={"Enter the field value..."}
                    fieldAttrType={"text"}
                    hasError={errorFields.includes("fieldValue")}
                    initialValue={fieldValue}
                    onChange={(newVal) => {
                      // Clean Error
                      setErrorFields((prev) =>
                        prev.filter((f) => f !== "fieldValue")
                      );
                      // Save new changes
                      setFieldValue(newVal);
                    }}
                  />
                )}

                {/* SPECIFIC */}
                {/* Field isTextarea: Only for Input Text */}
                {fieldIsMultiline !== undefined && !isFieldHidden && (
                  <FormFieldBlockCard
                    key={`${fieldBlockOrigin?.id}_fieldEnableTextarea`}
                    fieldAttrName="Is Multi-line"
                    fieldAttrType={"switch"}
                    hasError={errorFields.includes("fieldIsMultiline")}
                    initialValue={fieldIsMultiline}
                    onChange={(newVal) => {
                      // Clean Error
                      setErrorFields((prev) =>
                        prev.filter((f) => f !== "fieldIsMultiline")
                      );
                      // Save new changes
                      setFieldIsMultiline(newVal);
                    }}
                  />
                )}

                {/* SPECIFIC */}
                {/* Field Accepted Extensions: only for "File Upload" */}
                {isAFile(fieldType ?? "") && !isFieldHidden && (
                  <FormFieldBlockCard
                    key={`${fieldBlockOrigin?.id}_fieldExtensionAllowed`}
                    fieldAttrName="Extensions Allowed"
                    fieldAttrPlaceholder={"Select allowed extensions..."}
                    fieldAttrType={"fileExtensions"}
                    hasError={errorFields.includes("fieldAcceptedExtensions")}
                    initialValue={fieldAcceptedExtensions}
                    onChange={(mimeArr) => {
                      // Clean Error
                      setErrorFields((prev) =>
                        prev.filter((f) => f !== "fieldAcceptedExtensions")
                      );
                      // Save new changes
                      setFieldAcceptedExtensions(mimeArr);
                    }}
                  />
                )}

                {/* Field Optionality */}
                {fieldIsOptional !== undefined &&
                  typeof fieldIsOptional === "boolean" &&
                  !isFieldHidden && (
                    <FormFieldBlockCard
                      key={`${fieldBlockOrigin?.id}_fieldOptionality`}
                      fieldAttrName="Is Optional"
                      fieldAttrType={"switch"}
                      hasError={errorFields.includes("fieldIsOptional")}
                      initialValue={fieldIsOptional}
                      onChange={(newVal) => {
                        // Clean Error
                        setErrorFields((prev) =>
                          prev.filter((f) => f !== "fieldIsOptional")
                        );
                        // Save new changes
                        setFieldIsOptional(newVal);
                      }}
                    />
                  )}

                {/* Field Values To Pick From */}
                {fieldValueToPickFrom !== undefined &&
                  Array.isArray(fieldValueToPickFrom) &&
                  !isFieldHidden && (
                    <FormFieldBlockCard
                      key={`${fieldBlockOrigin?.id}_fieldValuesToPickFrom`}
                      fieldAttrName="Possible Choices"
                      fieldAttrType={"array"}
                      hasError={errorFields.includes("fieldValueToPickFrom")}
                      initialValue={fieldValueToPickFrom}
                      onChange={(newArr) => {
                        // Clean Error
                        setErrorFields((prev) =>
                          prev.filter((f) => f !== "fieldValueToPickFrom")
                        );
                        // Save new changes
                        setFieldValueToPickFrom(newArr);
                      }}
                    />
                  )}
              </div>

              {/* Field Block Preview */}
              {fieldName !== undefined && fieldType !== undefined && (
                <>
                  {/* Separator */}
                  <Separator className="mt-6 mb-[0.5px]" />

                  <div className="flex flex-col w-full max-h-fit min-h-28 bg-neutral-200/50 px-4 pr-4 pb-7 editor-background-dots">
                    <Label className="text-xs text-neutral-500 mt-3 mb-4">
                      Field Preview
                    </Label>
                    <div className="flex flex-1">
                      <FormFieldBlockPreview
                        fieldName={fieldName}
                        fieldLabel={fieldLabel ?? ""}
                        fieldValue={fieldValue}
                        fieldDescription={fieldDescription}
                        fieldPlaceholder={fieldPlaceholder}
                        fieldDefaultPlaceholder={fieldDefaultPlaceholder}
                        fieldDefaultDescription={fieldDefaultDescription}
                        fieldValueToPickFrom={fieldValueToPickFrom}
                        fieldIsOptional={fieldIsOptional}
                        fieldType={fieldType}
                        fieldIsMultiline={fieldIsMultiline}
                        fieldAcceptedExtensions={fieldAcceptedExtensions}
                      />
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
      {fieldName && (
        <div className="flex flex-col w-[var(--workflowPanelWidth)] bg-white z-10 fixed bottom-[7vh]">
          {/* Action Buttons: Delete | Save Field */}
          <div className="flex flex-1 justify-end items-center py-1 px-3 border-t">
            {/* Delete Button: only if we're in [UPDATE Mode] */}
            {fieldBlockOrigin && (
              <div className="flex flex-1 justify-start">
                <SimpleTooltip tooltipText={"Delete Field"}>
                  <Button
                    type="button"
                    variant={"ghost"}
                    size={"sm"}
                    className="w-fit"
                    onClick={() => {
                      // Delete Field
                      onDelete(fieldBlockOrigin.id);
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
