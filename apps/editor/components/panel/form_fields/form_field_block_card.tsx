import { cn, toStringSafe, Label, Input, MultiSelect } from "@vscrape/ui";
import React, { useState } from "react";
import SimpleSwitchInput from "../../inputs/simple_switch_input";
import ArrayInput from "../../inputs/array_input";
import {
  AudioMIMETypes,
  DocumentMIMETypes,
  ImageMIMETypes,
  VideoMIMETypes,
} from "@vscrape/engine/src";

export type FieldAttrType = "text" | "switch" | "array" | "fileExtensions";
const FormFieldBlockCard = ({
  fieldAttrName,
  fieldAttrPlaceholder,
  fieldAttrType,
  initialValue,
  hasError,
  onChange,
}: {
  fieldAttrName: string;
  fieldAttrPlaceholder?: string;
  fieldAttrType: FieldAttrType;
  initialValue: any;
  hasError: boolean;
  onChange: (newVal: any) => void;
}) => {
  const [currentValue, setCurrentValue] = useState(initialValue);
  const onValueChange = (newVal: any) => {
    setCurrentValue(newVal);
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
            onChange={(e) => onValueChange(e.target.value)}
            defaultValue={currentValue}
            className={cn(
              "h-7",
              hasError && "border-destructive/70 ring-2 ring-destructive/60"
            )}
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
            hasError={hasError}
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
            hasError={hasError}
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
            triggerClassName={`h-[1.9rem] w-[15.9rem] flex flex-1 mb-1 ${
              hasError && "border-destructive/70 ring-2 ring-destructive/60"
            }`}
            popoverAlignment="center"
            selectionMode="multi"
            popoverClassName="max-h-60 min-h-fit w-[15.7rem]"
            label={
              Array.isArray(currentValue) &&
              (currentValue as string[]).length > 0
                ? getExtensionNamesJoinned(currentValue as string[])
                : `${fieldAttrPlaceholder ?? "Select..."}`
            }
            itemTooltipClassname="w-52"
            data={{
              Images: Object.entries(ImageMIMETypes).map(([ext, mime]) => ({
                label: ext,
                value: JSON.stringify({ [ext]: mime }),
              })),
              Videos: Object.entries(VideoMIMETypes).map(([ext, mime]) => ({
                label: ext,
                value: JSON.stringify({ [ext]: mime }),
              })),
              Audio: Object.entries(AudioMIMETypes).map(([ext, mime]) => ({
                label: ext,
                value: JSON.stringify({ [ext]: mime }),
              })),
              Documents: Object.entries(DocumentMIMETypes).map(
                ([ext, mime]) => ({
                  label: ext,
                  value: JSON.stringify({ [ext]: mime }),
                })
              ),
            }}
            selectedValues={currentValue}
            handleSelect={(extMimeSelected) => {
              if (!extMimeSelected || !Array.isArray(currentValue)) return;

              if ((currentValue as string[]).includes(extMimeSelected)) {
                onValueChange(
                  currentValue.filter(
                    (v: any) => toStringSafe(v) !== extMimeSelected
                  )
                );
              } else {
                onValueChange([...currentValue, extMimeSelected]);
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

export const getExtensionNamesJoinned = (arr: any) => {
  return (arr as string[])
    .map((extMime: any) => getExtMineFromJSON(extMime))
    .filter((v) => v !== undefined)
    .map((v) => v.ext)
    .join(", ");
};

export const getExtMineFromJSON = (
  jsonString: string
): { ext: string; mime: string } | undefined => {
  try {
    // Try Parsing
    const extMime = JSON.parse(jsonString);

    const ext = Object.keys(extMime)[0];
    const mime = Object.values(extMime)[0];
    if (!ext || !mime || typeof mime !== "string") return;
    return {
      ext,
      mime,
    };
  } catch (e) {
    console.log("Can't parse...");
    return undefined;
  }
};
