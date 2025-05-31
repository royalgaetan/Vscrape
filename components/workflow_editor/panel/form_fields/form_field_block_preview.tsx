import React, { useEffect, useRef, useState } from "react";
import {
  PossibleFieldBlockType as FieldBlockType,
  FormFieldFileUpload,
  FormFieldTextInput,
  workflowFormFieldBlocks,
} from "@/lib/workflow_editor/constants/workflow_form_fields_definition";
import { CalendarDaysIcon, Clock, Hash, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  isAudioMimeType,
  isDocumentMimeType,
  isImageMimeType,
  isVideoMimeType,
} from "@/lib/workflow_editor/types/mime_types";
import { Label } from "@/components/ui/label";
import {
  capitalizeFirstLetter,
  extractTextFromHTML,
  isTrulyEmpty,
  toStringSafe,
} from "@/lib/string_utils";
import { allowedNumberControlKeys } from "@/lib/dom_utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import RadioInput from "../../inputs/radio_input";
import CheckboxInput from "../../inputs/checkbox_input";
import { formatDurationMs, isValidISODateString } from "@/lib/date_time_utils";
import { formatDate } from "date-fns";
import DatePicker from "@/components/global/date_picker";
import { Button } from "@/components/ui/button";
import SimpleSwitchInput from "../../inputs/simple_switch_input";
import { Textarea } from "@/components/ui/textarea";
import SimpleTooltip from "@/components/global/simple_tooltip";
import DurationPicker from "@/components/global/duration_picker";
import { getExtensionNamesJoinned } from "./form_field_block_card";
import DateInput from "../../inputs/date_input";
import DurationInput from "../../inputs/duration_input";

const FormFieldBlockPreview = ({
  fieldBlockToPreview,
}: {
  fieldBlockToPreview: FieldBlockType;
}) => {
  const [fieldLabel, setFieldLabel] = useState(fieldBlockToPreview.fieldLabel);
  const [, setFieldValue] = useState(fieldBlockToPreview.fieldValue);
  const [fieldDescription, setFieldDescription] = useState(
    fieldBlockToPreview.fieldDescription
  );
  const [fieldPlaceholder, setFieldPlaceholder] = useState(
    fieldBlockToPreview.fieldPlaceholder
  );
  const [fieldValueToPickFrom, setFieldValueToPickFrom] = useState(
    fieldBlockToPreview.fieldValueToPickFrom
  );
  const [fieldIsOptional, setFieldIsOptional] = useState(
    fieldBlockToPreview.isOptional
  );

  // Specifics
  const [fieldIsMultiline, setFieldIsMultiline] = useState(
    fieldBlockToPreview instanceof FormFieldTextInput &&
      fieldBlockToPreview.isMultiline
  );
  const [fieldAcceptedExtensions, setFieldAcceptedExtensions] = useState(
    fieldBlockToPreview instanceof FormFieldFileUpload
      ? fieldBlockToPreview.acceptedExtensions
      : []
  );

  useEffect(() => {
    const sub = fieldBlockToPreview.stream$().subscribe((newData) => {
      // Field Label Case
      setFieldLabel(newData.fieldLabel);

      // Field Value Case
      setFieldValue(newData.fieldValue);

      // Field Description Case
      setFieldDescription(newData.fieldDescription);

      // Field Placeholder Case
      setFieldPlaceholder(newData.fieldPlaceholder);

      // Field ValueToPickFrom Case
      setFieldValueToPickFrom(newData.fieldValueToPickFrom);

      // Field IsOptional Case
      setFieldIsOptional(newData.isOptional);

      // Field IsMultiline Case: only for TextInput
      if (newData instanceof FormFieldTextInput) {
        setFieldIsMultiline(newData.isMultiline);
      }

      // Field Accepted Extensions Case: only for FileUpload Input
      if (newData instanceof FormFieldFileUpload) {
        setFieldAcceptedExtensions(newData.acceptedExtensions);
      }
    });

    return () => sub.unsubscribe();
  }, []);

  const Icon =
    workflowFormFieldBlocks.find(
      (field) => field.fieldName === fieldBlockToPreview.fieldName
    )?.fieldIcon ?? Hash;

  // To Simulate Fake Data Entry
  const [enteredValue, setEnteredValue] = useState<any>(
    fieldBlockToPreview.fieldValue
  );

  // Others States
  const [isDraggingOVer, setIsDraggingOVer] = useState(false);
  const fieldBlockPreviewFileUploadRef = useRef<HTMLInputElement>(null);
  const fieldBlockPreviewFileUploadContainerRef =
    useRef<HTMLButtonElement>(null);

  const narrowedFieldType = fieldBlockToPreview.fieldType.split("/").at(-1);
  const placeHolderDisplayed = isTrulyEmpty(toStringSafe(fieldPlaceholder))
    ? fieldBlockToPreview.fieldDefaultPlaceholder
    : fieldPlaceholder;

  const descriptionDisplayed = isTrulyEmpty(toStringSafe(fieldDescription))
    ? fieldBlockToPreview.fieldDefaultDescription
    : fieldDescription;

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    if (!e) return;

    const isAllowedControl = allowedNumberControlKeys.includes(e.key);
    const ctrlOrMeta = e.ctrlKey || e.metaKey;
    if (ctrlOrMeta || isAllowedControl) return;

    if (narrowedFieldType === "number") {
      // Allow digits (0–9) or .
      const isDigit = /^\d$/.test(e.key) || e.key === ".";

      if (!isDigit) {
        // Prevent all other input
        e.preventDefault();
      }
    }

    if (narrowedFieldType === "tel") {
      // Allow digits, space, hyphen, parentheses, plus
      const isTelChar = /^[\d\s\-()+]$/.test(e.key);
      if (!isTelChar) {
        e.preventDefault();
      }
    }

    if (narrowedFieldType === "email") {
      // Allow alphanumeric, basic special chars, @, .
      const isEmailChar = /^[a-zA-Z0-9@._\-+]$/.test(e.key);
      if (!isEmailChar) {
        e.preventDefault();
      }
    }
  };

  return (
    <div
      className={cn("flex flex-col w-full h-fit justify-start items-center")}
    >
      {/* Label && Description */}
      <div className="flex flex-1 w-full">
        <div className="flex flex-col gap-0 justify-start items-start">
          {!isTrulyEmpty(toStringSafe(fieldLabel)) && (
            <Label className="flex flex-1 items-center text-wrap text-xs text-neutral-500 mb-1">
              <Icon className="size-4 mr-1 stroke-neutral-600" /> {fieldLabel}{" "}
              {!fieldIsOptional && "*"}
            </Label>
          )}
          {descriptionDisplayed && (
            <p className="text-xs text-muted-foreground font-light mb-2">
              {descriptionDisplayed}
            </p>
          )}
        </div>
      </div>

      {/* Row */}
      <div className="flex flex-1 w-full gap-2 items-start">
        {/* Input Preview (+ Placeholder | + Description) */}
        <div className="w-full">
          {/* Dropdown: Selection */}
          {fieldBlockToPreview.fieldType === "primitive/text" &&
            fieldValueToPickFrom && (
              <div>
                <Select
                  onValueChange={(val) =>
                    setEnteredValue(extractTextFromHTML(val))
                  }
                  value={enteredValue}
                >
                  <SelectTrigger className="h-[1.9rem] w-full !bg-white">
                    <SelectValue className="text-xs" placeholder="Select..." />
                  </SelectTrigger>

                  <SelectContent className="max-h-64 w-full">
                    {fieldValueToPickFrom.length > 0 &&
                      fieldValueToPickFrom
                        .map((val) => extractTextFromHTML(toStringSafe(val)))
                        .filter((v) => v.length > 0)
                        .map((choice) => {
                          return (
                            <SelectItem
                              className="text-xs"
                              key={choice}
                              value={choice}
                            >
                              {capitalizeFirstLetter(choice)}
                            </SelectItem>
                          );
                        })}
                  </SelectContent>
                </Select>
              </div>
            )}

          {/* Text Input Type */}
          {(fieldBlockToPreview.fieldType === "primitive/text" &&
            !fieldValueToPickFrom) ||
          fieldBlockToPreview.fieldType === "primitive/emailUrl" ||
          fieldBlockToPreview.fieldType === "primitive/tel" ||
          fieldBlockToPreview.fieldType === "primitive/number" ? (
            <div className="flex flex-1 w-full">
              {fieldIsMultiline && (
                <Textarea
                  defaultValue={undefined}
                  className="bg-white mb-0 resize-none w-full !h-20"
                  placeholder={placeHolderDisplayed}
                  onKeyDown={onKeyDown}
                  maxLength={2000}
                />
              )}
              {!fieldIsMultiline && (
                <Input
                  type={narrowedFieldType}
                  defaultValue={undefined}
                  className="h-7 bg-white w-[100%]"
                  placeholder={placeHolderDisplayed}
                  onKeyDown={onKeyDown}
                />
              )}
            </div>
          ) : (
            <></>
          )}

          {/* Radio: Selection */}
          {fieldBlockToPreview.fieldType === "primitive/radio" && (
            <div className="ml-1">
              {fieldValueToPickFrom && (
                <RadioInput
                  onSelect={(val) => setEnteredValue(extractTextFromHTML(val))}
                  selectedValue={enteredValue}
                  valuesToSelect={fieldValueToPickFrom.map((v) =>
                    extractTextFromHTML(toStringSafe(v))
                  )}
                />
              )}
            </div>
          )}

          {/* Checkbox: Selection */}
          {fieldBlockToPreview.fieldType === "primitive/checkbox" && (
            <div className="ml-1">
              {fieldValueToPickFrom && (
                <CheckboxInput
                  onSelect={(val) =>
                    setEnteredValue(val.map((v) => extractTextFromHTML(v)))
                  }
                  selectedValues={enteredValue}
                  valuesToSelect={fieldValueToPickFrom.map((v) =>
                    extractTextFromHTML(toStringSafe(v))
                  )}
                />
              )}
            </div>
          )}

          {/* Date Picker */}
          {fieldBlockToPreview.fieldType === "primitive/dateTime" && (
            <div className="w-28">
              <DateInput
                hasError={false}
                initialValue={
                  enteredValue !== undefined &&
                  isValidISODateString(enteredValue)
                    ? formatDate(new Date(enteredValue), "MMM dd, yyyy")
                    : ""
                }
                placeholder={placeHolderDisplayed}
                disabledDnd
                onSave={(date) => setEnteredValue(date)}
                isDisabled={false}
              />
            </div>
          )}

          {/* Time Picker */}
          {fieldBlockToPreview.fieldType === "primitive/milliseconds" && (
            <div className="w-28">
              <DurationInput
                hasError={false}
                isTimePicker
                initialValue={
                  enteredValue !== undefined && !isNaN(enteredValue)
                    ? formatDurationMs(enteredValue, ["hours", "minutes"])
                    : ""
                }
                placeholder={placeHolderDisplayed}
                disabledDnd
                onSave={(timePicked) => setEnteredValue(timePicked)}
                isDisabled={false}
              />
            </div>
          )}

          {/* Yes/No Toggle */}
          {fieldBlockToPreview.fieldType === "primitive/switch" && (
            <div>
              <SimpleSwitchInput
                isChecked={!!enteredValue}
                onCheckedChange={(isChecked) => setEnteredValue(isChecked)}
              />
            </div>
          )}

          {/* Hidden Field */}
          {fieldBlockToPreview.fieldType === "primitive/hidden" && (
            <div className="text-xs text-neutral-500 h-6 flex justify-start items-center">
              This field won't appear on the form.
            </div>
          )}

          {/* File Upload */}
          {isImageMimeType(fieldBlockToPreview.fieldType) ||
          isVideoMimeType(fieldBlockToPreview.fieldType) ||
          isAudioMimeType(fieldBlockToPreview.fieldType) ||
          isDocumentMimeType(fieldBlockToPreview.fieldType) ? (
            <button
              ref={fieldBlockPreviewFileUploadContainerRef}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                setIsDraggingOVer(true);
              }}
              onDragLeave={() => {
                setIsDraggingOVer(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingOVer(false);
                if (!e.dataTransfer.files) return;

                const droppedFile = e.dataTransfer.files[0];
                setEnteredValue(droppedFile);

                e.currentTarget.blur();
                if (fieldBlockPreviewFileUploadRef.current) {
                  fieldBlockPreviewFileUploadRef.current.blur();
                }
              }}
              className={cn(
                "relative flex w-full rounded-2xl mt-1 mr-2 py-4 border-[0.12rem] border-neutral-400/40 bg-white/80 justify-center items-center",
                "ring-[0.14rem] ring-transparent active:ring-neutral-300 focus:ring-neutral-300 focus:outline-none transition-all duration-300",
                "select-none text-center font-semibold text-xs text-neutral-500",
                isDraggingOVer ? "ring-neutral-300" : "ring-transparent"
              )}
              onClick={() => {
                // Clear the input value *before* opening the file selector
                if (fieldBlockPreviewFileUploadRef.current) {
                  fieldBlockPreviewFileUploadRef.current.click();
                }
              }}
            >
              {/* Remove current file Button */}
              {enteredValue && enteredValue instanceof File && (
                <div className="absolute z-10 top-1 right-2 pointer-events-none flex w-full justify-end items-center bg-transparent">
                  <SimpleTooltip
                    side="bottom"
                    align="end"
                    tooltipText={"Remove selected file"}
                  >
                    <Button
                      className="pointer-events-auto bg-gray-100 hover:bg-gray-200 inset-0 p-[0.6rem] duration-0 rounded-full !size-3 flex justify-center items-center"
                      variant={"ghost"}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setEnteredValue(undefined);
                      }}
                    >
                      <X className="size-3" />
                    </Button>
                  </SimpleTooltip>
                </div>
              )}

              {enteredValue ? (
                <div className="w-[70%] line-clamp-2 scale-[0.9]">
                  {enteredValue instanceof File
                    ? enteredValue.name
                    : "1 file uploaded"}
                </div>
              ) : (
                <div className="w-[70%]  scale-[0.9]">
                  <span>{placeHolderDisplayed}</span>
                </div>
              )}
              <input
                ref={fieldBlockPreviewFileUploadRef}
                type="file"
                id="field_block_preview_file_upload"
                className="hidden"
                accept={getExtensionNamesJoinned(fieldAcceptedExtensions)}
                onChange={(e) => {
                  if (!e.target.files || e.target.files.length === 0) return;
                  const file = e.target.files[0];
                  setEnteredValue(file);
                  e.target.blur();
                  if (fieldBlockPreviewFileUploadContainerRef.current) {
                    fieldBlockPreviewFileUploadContainerRef.current.blur();
                  }
                }}
              />
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormFieldBlockPreview;
