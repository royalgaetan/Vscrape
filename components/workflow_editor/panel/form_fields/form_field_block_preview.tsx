import React, { useRef, useState } from "react";
import {
  PossibleFieldBlockType as FieldBlockType,
  FormFieldTextInput,
  workflowFormFieldBlocks,
} from "@/lib/workflow_editor/constants/workflow_form_fields_definition";
import { CalendarDaysIcon, Clock, Hash, User2Icon, X } from "lucide-react";
import FormFieldBlockCard, { FieldAttrType } from "./form_field_block_card";
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
import FilterValueInput from "../../inputs/filter_value_input";
import { isValidISODateString } from "@/lib/date_time_utils";
import { formatDate } from "date-fns";
import DatePicker from "@/components/global/date_picker";
import { Button } from "@/components/ui/button";
import SimpleSwitchInput from "../../inputs/simple_switch_input";
import { Textarea } from "@/components/ui/textarea";
import SimpleTooltip from "@/components/global/simple_tooltip";
import DurationPicker from "@/components/global/duration_picker";

const FormFieldBlockPreview = ({
  fieldBlock,
}: {
  fieldBlock: FieldBlockType;
}) => {
  const Icon =
    workflowFormFieldBlocks.find(
      (field) => field.fieldName === fieldBlock.fieldName
    )?.fieldIcon ?? Hash;

  return (
    <div className={cn("flex flex-1 gap-2 h-fit items-center")}>
      {/* Icon */}
      {!fieldBlock.fieldValueToPickFrom &&
      fieldBlock.fieldType !== "primitive/switch" &&
      fieldBlock.fieldName !== "File Upload" ? (
        <div className="ml-2 mb">
          <Icon className="size-6 stroke-neutral-700" />
        </div>
      ) : (
        <></>
      )}

      <div className="flex flex-col w-full">
        {/* Label */}
        {!isTrulyEmpty(toStringSafe(fieldBlock.fieldLabel)) && (
          <Label className="text-xs text-neutral-500 mb-1 ml-1">
            {fieldBlock.fieldLabel}
          </Label>
        )}

        {/* Input (+ Placeholder | + Description) */}
        <FieldInputPreview
          fieldBlock={fieldBlock}
          key={`${fieldBlock.id}_block_input_preview`}
        />
      </div>
    </div>
  );
};

export default FormFieldBlockPreview;

const FieldInputPreview = ({ fieldBlock }: { fieldBlock: FieldBlockType }) => {
  const [enteredValue, setEnteredValue] = useState<any>(fieldBlock.fieldValue);
  const [isDraggingOVer, setIsDraggingOVer] = useState(false);
  const fieldBlockPreviewFileUploadRef = useRef<HTMLInputElement>(null);
  const fieldBlockPreviewFileUploadContainerRef =
    useRef<HTMLButtonElement>(null);

  // Dropdown: Selection
  if (
    fieldBlock.fieldType === "primitive/text" &&
    fieldBlock.fieldValueToPickFrom
  ) {
    return (
      <div>
        <Select
          onValueChange={(val) => setEnteredValue(val)}
          value={enteredValue}
        >
          <SelectTrigger className="h-[1.9rem] w-full !bg-white">
            <SelectValue className="text-xs" placeholder="Select..." />
          </SelectTrigger>

          <SelectContent className="max-h-64 w-full">
            {fieldBlock.fieldValueToPickFrom.length > 0 &&
              fieldBlock.fieldValueToPickFrom.map((val) => {
                const choice = toStringSafe(val);
                return (
                  <SelectItem className="text-xs" key={choice} value={choice}>
                    {capitalizeFirstLetter(choice)}
                  </SelectItem>
                );
              })}
          </SelectContent>
        </Select>
      </div>
    );
  }
  // Text Input Type
  else if (
    fieldBlock.fieldType === "primitive/text" ||
    fieldBlock.fieldType === "primitive/emailUrl" ||
    fieldBlock.fieldType === "primitive/tel" ||
    fieldBlock.fieldType === "primitive/number"
  ) {
    const getInputType = (): React.HTMLInputTypeAttribute | undefined => {
      switch (fieldBlock.fieldType) {
        case "primitive/text":
          return "text";
        case "primitive/emailUrl":
          return "email";
        case "primitive/tel":
          return "tel";
        case "primitive/number":
          return "number";

        default:
          return undefined;
      }
    };
    const isTextareaEnabled =
      fieldBlock instanceof FormFieldTextInput && fieldBlock.isTextArea;
    const placeHolderDisplayed = isTrulyEmpty(
      toStringSafe(fieldBlock.fieldPlaceholder)
    )
      ? fieldBlock.fieldDefaultPlaceholder
      : fieldBlock.fieldPlaceholder;
    const onKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
    ) => {
      if (!e) return;
      const isAllowedControl = allowedNumberControlKeys.includes(e.key);
      const ctrlOrMeta = e.ctrlKey || e.metaKey;
      if (ctrlOrMeta || isAllowedControl) return;

      if (getInputType() === "number") {
        // Allow digits (0–9) or .
        const isDigit = /^\d$/.test(e.key) || e.key === ".";

        if (!isDigit) {
          // Prevent all other input
          e.preventDefault();
        }
      }

      if (getInputType() === "tel") {
        // Allow digits, space, hyphen, parentheses, plus
        const isTelChar = /^[\d\s\-()+]$/.test(e.key);
        if (!isTelChar) {
          e.preventDefault();
        }
      }

      if (getInputType() === "email") {
        // Allow alphanumeric, basic special chars, @, .
        const isEmailChar = /^[a-zA-Z0-9@._\-+]$/.test(e.key);
        if (!isEmailChar) {
          e.preventDefault();
        }
      }

      // if (getInputType() === "url") {
      //   // Allow URL-safe characters
      //   const isUrlChar = /^[a-zA-Z0-9/:?&=._\-#]$/.test(e.key);
      //   if (!isUrlChar) {
      //     e.preventDefault();
      //   }
      // }
    };
    return (
      <div className="flex flex-1 w-full">
        {isTextareaEnabled && (
          <Textarea
            defaultValue={undefined}
            className="bg-white mb-3 resize-none w-full !h-20"
            placeholder={placeHolderDisplayed}
            onKeyDown={onKeyDown}
            maxLength={2000}
          />
        )}
        {!isTextareaEnabled && (
          <Input
            type={getInputType()}
            defaultValue={undefined}
            className="h-7 bg-white w-[80%]"
            placeholder={placeHolderDisplayed}
            onKeyDown={onKeyDown}
          />
        )}
      </div>
    );
  }
  // Radio: Selection
  else if (
    fieldBlock.fieldType === "primitive/radio" &&
    fieldBlock.fieldValueToPickFrom
  ) {
    return (
      <div className="ml-1">
        {fieldBlock.fieldValueToPickFrom && (
          <RadioInput
            onSelect={(val) => setEnteredValue(val)}
            selectedValue={enteredValue}
            valuesToSelect={fieldBlock.fieldValueToPickFrom.map((v) =>
              toStringSafe(v)
            )}
          />
        )}
      </div>
    );
  }
  // Checkbox: Selection
  else if (
    fieldBlock.fieldType === "primitive/checkbox" &&
    fieldBlock.fieldValueToPickFrom
  ) {
    return (
      <div className="ml-1">
        {fieldBlock.fieldValueToPickFrom && (
          <CheckboxInput
            onSelect={(val) => setEnteredValue(val)}
            selectedValues={enteredValue}
            valuesToSelect={fieldBlock.fieldValueToPickFrom.map((v) =>
              toStringSafe(v)
            )}
          />
        )}
      </div>
    );
  }
  // Date Picker
  else if (fieldBlock.fieldType === "primitive/dateTime") {
    return (
      <div className="!w-36 !h-[1.7rem] relative group/dateInput">
        <Input
          readOnly
          value={
            enteredValue !== undefined && isValidISODateString(enteredValue)
              ? formatDate(new Date(enteredValue), "MMM dd, yyyy")
              : ""
          }
          className="h-7 bg-white"
          placeholder={
            isTrulyEmpty(toStringSafe(fieldBlock.fieldPlaceholder))
              ? fieldBlock.fieldDefaultPlaceholder
              : fieldBlock.fieldPlaceholder
          }
        />
        {/* Clear Date Button */}
        {!isTrulyEmpty(toStringSafe(enteredValue)) && (
          <button
            className={cn(
              "group-hover/dateInput:inline hidden group/clearDateButton absolute !w-[1.5rem] !h-[1.5rem] top-[2px] right-2 !px-[0.6rem] transition-all duration-300 justify-center items-center rounded-l-none bg-gradient-to-l from-white from-30% to-transparent cursor-pointer trans"
            )}
            onClick={() => {
              setEnteredValue(undefined);
            }}
          >
            <X className="size-4 stroke-neutral-600 group-hover/clearDateButton:opacity-80 group-active/clearDateButton:scale-[0.97]" />
          </button>
        )}
        {/* Date Picker Button */}
        <DatePicker
          selectedDate={enteredValue as Date}
          onSelect={(selectedDate) => {
            setEnteredValue(selectedDate ?? "");
          }}
        >
          <Button
            className={cn(
              "absolute top-[2px] right-[1px] hidden !w-[1.5rem] !h-[1.5rem] !px-[0.6rem] transition-all duration-300 justify-center items-center gap-2 hover:opacity-80 hover:bg-white bg-white-300 cursor-pointer",
              isTrulyEmpty(toStringSafe(enteredValue)) ? "flex" : ""
            )}
          >
            <CalendarDaysIcon className="stroke-neutral-600" />
          </Button>
        </DatePicker>
      </div>
    );
  }
  // Time Picker
  else if (fieldBlock.fieldType === "primitive/milliseconds") {
    return (
      <div className="!w-36 !h-[1.7rem] relative group/timePicker">
        {JSON.stringify(enteredValue)}
        <Input
          readOnly
          value={
            enteredValue !== undefined && !isNaN(enteredValue)
              ? formatDate(new Date(enteredValue), "H:mm")
              : ""
          }
          className="h-7 bg-white"
          placeholder={
            isTrulyEmpty(toStringSafe(fieldBlock.fieldPlaceholder))
              ? fieldBlock.fieldDefaultPlaceholder
              : fieldBlock.fieldPlaceholder
          }
        />
        {/* Clear Date Button */}
        {!isTrulyEmpty(toStringSafe(enteredValue)) && (
          <button
            className={cn(
              "group-hover/timePicker:inline hidden group/clearDateButton absolute !w-[1.5rem] !h-[1.5rem] top-[2px] right-2 !px-[0.6rem] transition-all duration-300 justify-center items-center rounded-l-none bg-gradient-to-l from-white from-30% to-transparent cursor-pointer trans"
            )}
            onClick={() => {
              setEnteredValue(undefined);
            }}
          >
            <X className="size-4 stroke-neutral-600 group-hover/clearDateButton:opacity-80 group-active/clearDateButton:scale-[0.97]" />
          </button>
        )}
        {/* Time Picker Button */}
        <DurationPicker
          initialDurationMs={enteredValue}
          isTimePicker
          onSelect={(selectedTimeMs) => {
            setEnteredValue(selectedTimeMs);
          }}
        >
          <Button
            className={cn(
              "absolute top-[2px] right-[1px] hidden !w-[1.5rem] !h-[1.5rem] !px-[0.6rem] transition-all duration-300 justify-center items-center gap-2 hover:opacity-80 hover:bg-white bg-white-300 cursor-pointer",
              isTrulyEmpty(toStringSafe(enteredValue)) ? "flex" : ""
            )}
          >
            <Clock className="stroke-neutral-600" />
          </Button>
        </DurationPicker>
      </div>
    );
  }
  // Yes/No Toggle
  else if (fieldBlock.fieldType === "primitive/switch") {
    return (
      <div>
        <SimpleSwitchInput
          className="ml-1"
          isChecked={!!enteredValue}
          onCheckedChange={(isChecked) => setEnteredValue(isChecked)}
        />
      </div>
    );
  }
  // Yes/No Toggle
  else if (fieldBlock.fieldType === "primitive/hidden") {
    return (
      <div className="text-xs text-neutral-500">
        This field won't appear on the form.
      </div>
    );
  }
  // File Upload
  else if (
    isImageMimeType(fieldBlock.fieldType) ||
    isAudioMimeType(fieldBlock.fieldType) ||
    isVideoMimeType(fieldBlock.fieldType) ||
    isDocumentMimeType(fieldBlock.fieldType)
  ) {
    return (
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
          "relative flex w-[15.7rem] rounded-2xl mt-1 mb-5 mr-2 py-4 border-[0.12rem] border-neutral-400/40 bg-white/80 justify-center items-center",
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
            <span>
              {isTrulyEmpty(toStringSafe(fieldBlock.fieldPlaceholder))
                ? fieldBlock.fieldDefaultPlaceholder
                : fieldBlock.fieldPlaceholder}
            </span>
          </div>
        )}
        <input
          ref={fieldBlockPreviewFileUploadRef}
          type="file"
          id="field_block_preview_file_upload"
          className="hidden"
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
    );
  }
  //   Default
  else {
    return <div></div>;
  }
};
