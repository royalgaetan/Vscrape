import React, { useRef, useState } from "react";

import { Hash, X } from "lucide-react";
import {
  Label,
  SimpleTooltip,
  Textarea,
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  capitalizeFirstLetter,
  extractTextFromHTML,
  isTrulyEmpty,
  toStringSafe,
  allowedNumberControlKeys,
  cn,
  formatDurationMs,
  isValidISODateString,
} from "@vscrape/ui";
import RadioInput from "../../inputs/radio_input";
import CheckboxInput from "../../inputs/checkbox_input";
import { formatDate } from "date-fns";
import SimpleSwitchInput from "../../inputs/simple_switch_input";
import { getExtensionNamesJoinned } from "./form_field_block_card";
import DateInput from "../../inputs/date_input";
import DurationInput from "../../inputs/duration_input";
import {
  workflowFormFieldItems,
  FormFieldItem,
  isAFile,
} from "@vscrape/engine/src";

const FormFieldBlockPreview = ({ fieldItem }: { fieldItem: FormFieldItem }) => {
  const Icon =
    workflowFormFieldItems.find(
      (field) => field.fieldName === fieldItem.fieldName
    )?.fieldIcon ?? Hash;

  // To Simulate Fake Data Entry
  const [enteredValue, setEnteredValue] = useState<any>(fieldItem.fieldValue);

  // Others States
  const [isDraggingOVer, setIsDraggingOVer] = useState(false);
  const fieldBlockPreviewFileUploadRef = useRef<HTMLInputElement>(null);
  const fieldBlockPreviewFileUploadContainerRef =
    useRef<HTMLButtonElement>(null);

  const narrowedFieldType = fieldItem.fieldType.split("/").at(-1);
  const placeHolderDisplayed = isTrulyEmpty(
    toStringSafe(fieldItem.fieldPlaceholder)
  )
    ? fieldItem.fieldDefaultPlaceholder
    : fieldItem.fieldPlaceholder;

  const descriptionDisplayed = isTrulyEmpty(
    toStringSafe(fieldItem.fieldDescription)
  )
    ? fieldItem.fieldDefaultDescription
    : fieldItem.fieldDescription;

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
          {!isTrulyEmpty(toStringSafe(fieldItem.fieldLabel)) && (
            <Label className="flex flex-1 items-center text-wrap text-xs text-neutral-500 mb-1">
              <Icon className="size-4 mr-1 stroke-neutral-600" />{" "}
              {fieldItem.fieldLabel}
              {!fieldItem.isOptional && "*"}
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
          {fieldItem.fieldType === "primitive/text" &&
            fieldItem.fieldValueToPickFrom && (
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
                    {fieldItem.fieldValueToPickFrom.length > 0 &&
                      fieldItem.fieldValueToPickFrom
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
          {(fieldItem.fieldType === "primitive/text" &&
            !fieldItem.fieldValueToPickFrom) ||
          fieldItem.fieldType === "primitive/emailUrl" ||
          fieldItem.fieldType === "primitive/tel" ||
          fieldItem.fieldType === "primitive/number" ? (
            <div className="flex flex-1 w-full">
              {fieldItem.isMultiline && (
                <Textarea
                  defaultValue={undefined}
                  className="bg-white mb-0 resize-none w-full !h-20"
                  placeholder={placeHolderDisplayed}
                  onKeyDown={onKeyDown}
                  maxLength={2000}
                />
              )}
              {!fieldItem.isMultiline && (
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
          {fieldItem.fieldType === "primitive/radio" && (
            <div className="ml-1">
              {fieldItem.fieldValueToPickFrom && (
                <RadioInput
                  onSelect={(val) => setEnteredValue(extractTextFromHTML(val))}
                  selectedValue={enteredValue}
                  valuesToSelect={fieldItem.fieldValueToPickFrom.map((v) =>
                    extractTextFromHTML(toStringSafe(v))
                  )}
                />
              )}
            </div>
          )}

          {/* Checkbox: Selection */}
          {fieldItem.fieldType === "primitive/checkbox" && (
            <div className="ml-1 -mt-2">
              {fieldItem.fieldValueToPickFrom && (
                <CheckboxInput
                  onSelect={(val) =>
                    setEnteredValue(val.map((v) => extractTextFromHTML(v)))
                  }
                  selectedValues={enteredValue}
                  valuesToSelect={fieldItem.fieldValueToPickFrom.map((v) =>
                    extractTextFromHTML(toStringSafe(v))
                  )}
                />
              )}
            </div>
          )}

          {/* Date Picker */}
          {fieldItem.fieldType === "primitive/dateTime" && (
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
          {fieldItem.fieldType === "primitive/milliseconds" && (
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
          {fieldItem.fieldType === "primitive/switch" && (
            <div>
              <SimpleSwitchInput
                isChecked={!!enteredValue}
                onCheckedChange={(isChecked) => setEnteredValue(isChecked)}
              />
            </div>
          )}

          {/* Hidden Field */}
          {fieldItem.fieldType === "primitive/hidden" && (
            <div className="text-xs text-neutral-500 h-6 flex justify-start items-center">
              This field won't appear on the form.
            </div>
          )}

          {/* File Upload */}
          {isAFile(fieldItem.fieldType) ? (
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
                <div className="w-[70%] scale-[0.9]">
                  <span>{placeHolderDisplayed}</span>
                </div>
              )}
              <input
                ref={fieldBlockPreviewFileUploadRef}
                type="file"
                id="field_block_preview_file_upload"
                className="hidden"
                accept={
                  fieldItem.acceptedFileExtensions &&
                  getExtensionNamesJoinned(fieldItem.acceptedFileExtensions)
                }
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
