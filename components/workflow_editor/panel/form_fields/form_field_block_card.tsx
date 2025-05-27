import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import SimpleSwitchInput from "../../inputs/simple_switch_input";
import ArrayInput from "../../inputs/array_input";
import MultiSelect from "@/components/global/multi_select";
import {
  AudioMIMETypes,
  DocumentMIMETypes,
  ImageMIMETypes,
  VideoMIMETypes,
} from "@/lib/workflow_editor/types/mime_types";
import { toStringSafe } from "@/lib/string_utils";

export type FieldAttrType = "text" | "switch" | "array" | "fileExtensions";
const FormFieldBlockCard = ({
  fieldAttrName,
  fieldAttrPlaceholder,
  fieldAttrType,
  initialValue,
  onChange,
}: {
  fieldAttrName: string;
  fieldAttrPlaceholder?: string;
  fieldAttrType: FieldAttrType;
  initialValue: any;
  onChange: (newVal: any) => void;
}) => {
  const [currentValue, setcurrentValue] = useState(initialValue);
  const onValueChange = (newVal: any) => {
    setcurrentValue(newVal);
    onChange(newVal);
  };

  switch (fieldAttrType) {
    case "text":
      return (
        <div className="flex flex-col w-full gap-1">
          {fieldAttrName && (
            <Label className="text-xs text-neutral-500">{fieldAttrName}</Label>
          )}
          <Input
            onChange={onValueChange}
            defaultValue={currentValue}
            className="h-7"
            placeholder={fieldAttrPlaceholder}
          />
        </div>
      );

    case "switch":
      return (
        <div className="flex flex-col w-full gap-1">
          {fieldAttrName && (
            <Label className="text-xs text-neutral-500">{fieldAttrName}</Label>
          )}

          <SimpleSwitchInput
            className="ml-1"
            isChecked={!!currentValue}
            onCheckedChange={(isChecked) => onValueChange(isChecked)}
          />
        </div>
      );

    case "array":
      return (
        <div className="flex flex-col w-full gap-1">
          {fieldAttrName && (
            <Label className="text-xs text-neutral-500">{fieldAttrName}</Label>
          )}
          <ArrayInput
            initialArray={currentValue}
            onChange={(newArray) => {
              onValueChange(newArray);
            }}
          />
        </div>
      );

    case "fileExtensions":
      return (
        <div className="flex flex-col w-full gap-1">
          {fieldAttrName && (
            <Label className="text-xs text-neutral-500">{fieldAttrName}</Label>
          )}
          <MultiSelect
            triggerClassName="h-[1.9rem] w-[15.9rem] flex flex-1 mb-1"
            popoverAlignment="center"
            selectionMode="multi"
            popoverClassName="max-h-60 min-h-fit w-[15.7rem]"
            label={
              (currentValue as string[]).length > 0
                ? initialValue.join(", ")
                : `${fieldAttrPlaceholder ?? "Select..."}`
            }
            itemTooltipClassname="w-52"
            data={{
              Images: Object.keys(ImageMIMETypes).map((ext) => ({
                label: ext,
                value: ext,
              })),
              Videos: Object.keys(VideoMIMETypes).map((ext) => ({
                label: ext,
                value: ext,
              })),
              Audio: Object.keys(AudioMIMETypes).map((ext) => ({
                label: ext,
                value: ext,
              })),
              Documents: Object.keys(DocumentMIMETypes).map((ext) => ({
                label: ext,
                value: ext,
              })),
            }}
            selectedValues={currentValue}
            handleSelect={(extensionSelected) => {
              if (!extensionSelected) return;
              if ((currentValue as string[]).includes(extensionSelected)) {
                onValueChange(
                  currentValue.filter(
                    (v: any) => toStringSafe(v) !== extensionSelected
                  )
                );
              } else {
                onValueChange([...currentValue, extensionSelected]);
              }
            }}
          />
        </div>
      );

    default:
      break;
  }
};

export default FormFieldBlockCard;
