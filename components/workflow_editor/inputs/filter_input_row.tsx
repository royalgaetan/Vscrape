import { useState } from "react";
import { FilterIcon, PenLineIcon, Trash2 } from "lucide-react";
import MultiSelect from "@/components/global/multi_select";
import {
  capitalizeFirstLetter,
  extractSingleTokenType,
  extractTextFromHTML,
  isPureVariableOnly,
  stripMustacheBraces,
  toStringSafe,
} from "@/lib/string_utils";
import { cn, isRecord } from "@/lib/utils";
import {
  getCriteriaSelection,
  GetFilterValueInput,
  GetFilterValueInputs,
  getFilterValueInputs,
} from "@/lib/workflow_editor/utils/get_criterias";
import FilterValueInput from "./filter_value_input";
import { formatDate, isDate } from "date-fns";
import { inputErrorClassName } from "@/lib/workflow_editor/constants/w_constants";
import { isValidDateString, isValidISODateString } from "@/lib/date_time_utils";
import DnDTextInput from "./dnd_text_input";
import { ExtendedOperationFilterType } from "@/lib/workflow_editor/types/w_types";
import {
  vsAnyPrimitives,
  vsAnyRawTypes,
} from "@/lib/workflow_editor/types/data_types";
import { Button } from "@/components/ui/button";
import SimpleTooltip from "@/components/global/simple_tooltip";
import { fakeInputs } from "@/lib/fake_data";

type SingleFilterRowProps = {
  initialFilter: ExtendedOperationFilterType;
  onSave: (newFilterValue: ExtendedOperationFilterType) => void;
  onDelete: () => void;
  index: number;
  //
  initialIsEditing?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  isCondition?: boolean;
  titleContent?: string;
  onEdit?: () => void;
  onError?: (val: boolean) => void;
};

const SingleFilterRow = ({
  initialFilter,
  initialIsEditing,
  canEdit,
  canDelete,
  onSave,
  onDelete,
  onEdit,
  onError,
  isCondition,
  titleContent,
  index,
}: SingleFilterRowProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(
    initialIsEditing
      ? () => {
          onEdit && onEdit();
          return true;
        }
      : false
  );

  const [filterObj, setFilterObj] =
    useState<ExtendedOperationFilterType>(initialFilter);

  // Errors Vars
  const [errorInputIndexes, setErrorInputIndexes] = useState<number[]>([]);
  const [errorInputID, setErrorInputID] = useState<boolean>(false);
  const [errorCriteria, setErrorCriteria] = useState<boolean>(false);
  const clearInputErrors = () => {
    setErrorInputIndexes([]);
    setErrorInputID(false);
    setErrorCriteria(false);
  };

  const handleInputIDChanges = (text: any) => {
    clearInputErrors();

    if (isPureVariableOnly(toStringSafe(text))) {
      if (extractSingleTokenType(toStringSafe(text)) !== filterObj.filterType) {
        filterObj.filterCriteria = null;
        filterObj.filterValue = [undefined] as any;
      }
    } else {
      if (
        resolveInputTypeFromReference(text) !==
        resolveInputTypeFromReference(filterObj.filterType)
      ) {
        filterObj.filterCriteria = null;
        filterObj.filterValue = [undefined] as any;
      }
    }

    filterObj.filterType = resolveInputTypeFromReference(text) as any;
    setFilterObj((prev) => ({
      ...prev,
      inputID: text,
    }));
  };

  const saveFilter = (): boolean => {
    clearInputErrors();
    let errorIndexes: number[] = [];

    // InputID error handler
    const isInputIDPure = isPureVariableOnly(toStringSafe(filterObj.inputID));
    const simplifiedType = getSimplifiedTypeFromType(
      extractSingleTokenType(toStringSafe(filterObj.inputID))
    );
    if (isInputIDPure && simplifiedType === "undefined") {
      setErrorInputID(true);
      onError && onError(true);
      return false;
    }
    if (
      filterObj.inputID === null ||
      (typeof filterObj.inputID === "string" && filterObj.inputID.length === 0)
    ) {
      setErrorInputID(true);
      onError && onError(true);
      return false;
    }

    // Criteria Input error handler
    if (
      filterObj.filterCriteria === null ||
      (typeof filterObj.inputID === "string" && filterObj.inputID.length === 0)
    ) {
      setErrorCriteria(true);
      onError && onError(true);
      return false;
    }

    // If Filter value is null and isn't an array of values: avoid saving the filter
    if (
      filterObj.filterValue === null ||
      !Array.isArray(filterObj.filterValue)
    ) {
      onError && onError(true);
      return false;
    }

    // Check Filter values: if incorrect display error in corresponding input field
    valueInputsSchema.forEach((inputSchemaAt, id) => {
      let inputValue = Array.isArray(filterObj.filterValue)
        ? filterObj.filterValue[id]
        : null;
      console.log(
        "Schema: ",
        valueInputsSchema,
        "\ninputSchemaAt: ",
        inputSchemaAt,
        "\nInput Type: ",
        typeof inputValue,
        "\nInput Value: ",
        inputValue
      );

      // Check if value is a "Pure" variable input. E.g. {{ Variable }}
      const isPure = isPureVariableOnly(toStringSafe(inputValue));
      const simplifiedType = getSimplifiedTypeFromType(
        extractSingleTokenType(toStringSafe(inputValue))
      );
      const isPureValid = simplifiedType === inputSchemaAt;

      if (isPure) {
        console.log(
          "\nInput Value is Pure",
          isPure,
          "\nInput Value Type (Pure)",
          simplifiedType,
          "\nInput Pure valid",
          isPureValid
        );
        if (!isPureValid) {
          console.log(`=> Is (Pure) ${simplifiedType} error`);
          errorIndexes.push(id);
        }
      } else if (!isPure) {
        if (
          inputSchemaAt === "undefined" &&
          (inputValue === null || typeof inputValue !== "undefined")
        ) {
          console.log("=> Is undefined error");
          errorIndexes.push(id);
        }

        inputValue = extractTextFromHTML(toStringSafe(inputValue));
        if (
          inputSchemaAt === "date" &&
          (inputValue === null || !isValidISODateString(inputValue))
        ) {
          console.log("=> Is date error");
          errorIndexes.push(id);
        }
        if (
          inputSchemaAt === "text" &&
          (inputValue === null ||
            typeof inputValue !== "string" ||
            inputValue.length === 0)
        ) {
          console.log("=> Is text error");
          errorIndexes.push(id);
        }

        if (
          inputSchemaAt === "number" &&
          (toStringSafe(inputValue).trim() === "" ||
            inputValue === null ||
            isNaN(Number(inputValue)))
        ) {
          console.log("=> Is number error");
          errorIndexes.push(id);
        }
      }
    });

    if (errorIndexes.length > 0) {
      setErrorInputIndexes(errorIndexes);
      onError && onError(true);
      return false;
    } else {
      onError && onError(false);
      onSave(filterObj);
      return true;
    }
  };

  const valueInputsSchema: GetFilterValueInputs = getFilterValueInputs({
    filterCriteria: filterObj.filterCriteria,
    filterType: resolveInputTypeFromReference(filterObj?.inputID) as any,
  });
  const criteriaSelectionName: string =
    getCriteriaSelection({
      filterType: resolveInputTypeFromReference(filterObj?.inputID),
    }).length > 0
      ? "Criterias"
      : "";

  return (
    <div
      role="button"
      tabIndex={1}
      className={cn(
        "[--input-height:1.7rem] flex flex-col w-full first:mt-2 px-2 py-2 hover:bg-neutral-400/10 rounded-sm transition-all duration-100 cursor-pointer",
        !isCondition && "rounded-none"
      )}
    >
      {!isEditing ? (
        // If filter input is NOT select: shrink it to display on its summary
        <div
          className={cn(
            "group/filterItem px-4 flex flex-col items-start justify-start gap-1 w-full",
            isCondition && "px-0"
          )}
        >
          <div className="flex flex-1 line-clamp-1 w-full">
            {/* Title + Icon */}
            <div className="flex !flex-1 gap-2 items-center font-medium text-sm text-neutral-700">
              {isCondition ? (
                <div className="size-5 flex justify-center items-center border border-border rounded-full">
                  {index + 1}
                </div>
              ) : (
                <FilterIcon className="size-3 translate-y-[1.9px] stroke-neutral-700" />
              )}
              {titleContent ?? ` Filter ${index + 1}`}
            </div>

            {/* Buttons */}
            <div className="flex gap-0 h-[var(--input-height)]">
              {/* Edit Button */}
              {canEdit && (
                <SimpleTooltip tooltipText="Edit Condition">
                  <Button
                    variant={"ghost"}
                    className={cn(
                      "!w-7 !h-7 px-0 group-hover/filterItem:flex hidden items-center justify-center hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer rounded-sm transition-all duration-300"
                    )}
                    onClick={() => {
                      setIsEditing(true);
                      onEdit && onEdit();
                    }}
                  >
                    <PenLineIcon />
                  </Button>
                </SimpleTooltip>
              )}

              {/* Delete Button */}
              {canDelete && (
                <SimpleTooltip tooltipText="Delete Condition">
                  <Button
                    variant={"ghost"}
                    className={cn(
                      "!w-7 !h-7 px-0 group-hover/filterItem:flex hidden items-center justify-center hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer rounded-sm transition-all duration-300"
                    )}
                    onClick={() => {
                      onDelete();
                    }}
                  >
                    <Trash2 />
                  </Button>
                </SimpleTooltip>
              )}
            </div>
          </div>

          <div
            className={cn(
              "w-[13rem] line-clamp-2 text-xs text-start break-words",
              isCondition && "ml-7"
            )}
          >
            {!filterObj.filterCriteria &&
            filterObj.filterValue !== null &&
            filterObj.filterValue[0] === null &&
            !filterObj.inputID ? (
              "Empty"
            ) : (
              <>
                <TextWithSeparator content={filterObj.inputID} separator="" />
                <TextWithSeparator content={filterObj.filterCriteria} isBold />
                <TextWithSeparator content={filterObj.filterValue} />
              </>
            )}
          </div>
        </div>
      ) : (
        // Editing Mode: If filter input is select, expand it to allow user to add changes
        <>
          <div className="flex flex-1 items-start gap-2 group/filterItem h-7 mt-1 mb-2">
            {/* Input ID: let user add the input from which filter will be applied to */}
            <div className="flex !w-1/3 max-w-[5rem]">
              <DnDTextInput
                placeholder={"Input ID..."}
                inputType="text"
                hasError={errorInputID}
                inputValue={filterObj.inputID}
                className={cn(
                  "!text-xs flex-1 w-full !h-[var(--input-height)] rounded-sm placeholder:font-semibold placeholder:text-muted-foreground/70",
                  errorInputID && inputErrorClassName
                )}
                onElementDropped={(text) => {
                  handleInputIDChanges(text);
                }}
                onTextChange={(text) => {
                  handleInputIDChanges(text);
                }}
              />
            </div>

            {/* Select a Criteria */}
            <div className="flex !w-1/3  max-w-[5rem]">
              <MultiSelect
                isTriggerDisabled={
                  !filterObj?.inputID ||
                  !resolveInputTypeFromReference(filterObj?.inputID)
                }
                triggerClassName={cn(
                  "!h-[var(--input-height)] bg-slate-100/40 flex flex-1 mb-1",
                  errorCriteria && inputErrorClassName
                )}
                popoverAlignment="center"
                selectionMode="single"
                popoverClassName="max-h-60 min-h-fit w-[100%]"
                label={filterObj.filterCriteria ?? "Criteria..."}
                data={{
                  [criteriaSelectionName]: getCriteriaSelection({
                    filterType: resolveInputTypeFromReference(
                      filterObj?.inputID
                    ),
                  }).map((criteria) => ({
                    label: capitalizeFirstLetter(criteria),
                    value: criteria,
                  })),
                }}
                selectedValues={[filterObj.filterCriteria ?? ""]}
                handleSelect={(selectedCriteria) => {
                  clearInputErrors();

                  setFilterObj((prev) => ({
                    ...prev,
                    filterCriteria: selectedCriteria as any,
                  }));

                  // Compare Old Criteria Inputs Schema to the selected one
                  // If Schema is different, reset Filter Input Value
                  const selectedCriteriaInputSchema = getFilterValueInputs({
                    filterCriteria: selectedCriteria,
                    filterType: resolveInputTypeFromReference(
                      filterObj?.inputID
                    ) as any,
                  });

                  if (
                    selectedCriteriaInputSchema[0] !== valueInputsSchema[0] ||
                    selectedCriteriaInputSchema[0] === "undefined"
                  ) {
                    setFilterObj((prev) => ({
                      ...prev,
                      filterValue: [undefined] as any,
                    }));
                  }
                }}
              />
            </div>

            {/* Filter Value Inputs: value(s) to compare against */}
            <div className="!w-1/3 max-w-[5rem] flex-col gap-2">
              {valueInputsSchema.map((inputSchema, idx) => {
                return (
                  <FilterValueInput
                    initialValue={
                      Array.isArray(filterObj.filterValue)
                        ? filterObj.filterValue[idx]
                        : null
                    }
                    hasError={
                      filterObj.filterCriteria !== null &&
                      errorInputIndexes.includes(idx)
                    }
                    onSave={(inputValue) => {
                      let arr = filterObj.filterValue;

                      if (arr && arr instanceof Array) {
                        arr[idx] = inputValue;
                      } else {
                        arr = [inputValue];
                      }

                      setFilterObj((prev) => ({
                        ...prev,
                        filterCriteria: filterObj.filterCriteria as any,
                        filterValue: arr as any,
                      }));
                      // Clear Error at Input Index
                      const updatedErrors = errorInputIndexes.filter(
                        (errIndex) => errIndex !== idx
                      );
                      setErrorInputIndexes(updatedErrors);
                    }}
                    isDisabled={!filterObj.filterCriteria}
                    key={`filtervalue_${inputSchema}_${idx}`}
                    inputSchema={inputSchema}
                  />
                );
              })}
            </div>
          </div>

          {/* Buttons: Add, Delete filter, Expand */}
          <div className="w-full flex flex-1 gap-1 items-center justify-end relative z-10">
            {/* Delete: Button */}
            <Button
              variant={"ghost"}
              className={cn(
                "flex w-fit transition-all duration-300 h-6 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer px-2 rounded-sm"
              )}
              onClick={(e) => {
                e.preventDefault();
                onDelete();
              }}
            >
              <Trash2 className="!size-4" />
            </Button>
            {/* Save Filter Changes: Button */}
            <Button
              variant={"ghost"}
              className={cn(
                "flex w-fit transition-all duration-300 h-6 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer px-2 rounded-sm"
              )}
              onClick={(e) => {
                const res = saveFilter();
                res && setIsEditing(false);
              }}
            >
              Save {isCondition ? "Condition" : "Filter"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleFilterRow;

export const TextWithSeparator = ({
  content,
  separator = " - ",
  isBold,
}: {
  content: any;
  separator?: string;
  isBold?: boolean;
}) => {
  const canDisplaySeparator =
    (!Array.isArray(content) && content !== null && content !== undefined) ||
    (Array.isArray(content) && content.every((c) => c !== undefined));
  const _formatDate = (d: any) => {
    return formatDate(new Date(d), "MMM dd, yyyy");
  };

  const getContentInline = (content: any): string => {
    if (content === null && content === undefined) return "";
    if (
      isValidDateString(content) ||
      (!isNaN(Number(content)) && isDate(content))
    ) {
      return extractTextFromHTML(_formatDate(content));
    } else if (typeof content === "string" || !isNaN(Number(content))) {
      return extractTextFromHTML(toStringSafe(content));
    } else if (Array.isArray(content)) {
      return content.map((c) => getContentInline(c)).join(" | ");
    } else {
      return "";
    }
  };
  return content ? (
    <span>
      {canDisplaySeparator && separator}
      <span className={cn("font-normal", isBold && "font-semibold")}>
        {getContentInline(content)}
      </span>
    </span>
  ) : (
    ""
  );
};

export const getSimplifiedTypeFromType = (type: any): GetFilterValueInput => {
  // Date Case
  if (type === "primitive/dateTime") return "date";
  // Number Case
  else if (type === "primitive/number") return "number";
  // Undefined Case
  else if (type === undefined || type === null) return "undefined";
  // Default: String Case
  else return "text";
};

export const getTypeFromTypedText = (
  content: string
): (vsAnyPrimitives | vsAnyRawTypes)["type"] | undefined => {
  // Date Case
  if (isValidDateString(content)) return "primitive/dateTime";
  // Number Case
  else if (!isNaN(Number(content))) return "primitive/number";
  // String Case
  else if (typeof content === "string") return "primitive/text";
  // Undefined
  else return undefined;
};

/**
 * Tries to resolve the data type of an input reference string (e.g., {{ Variables.json }})
 * by looking it up in the shared output data or by falling back to a typed-text extractor.
 *
 * @param inputID - The string or reference to resolve (e.g., {{ Variables.json }})
 * @returns The corresponding type string if found, or undefined.
 */
export const resolveInputTypeFromReference = (
  inputID: any
): (vsAnyPrimitives | vsAnyRawTypes)["type"] | undefined => {
  const cleanInput = toStringSafe(inputID);
  const path = stripMustacheBraces(cleanInput).split(".");

  // Attempt to resolve type from predefined shared outputs
  let resolvedType = resolveNestedType(fakeInputs, path);

  // Fallback if path resolution fails
  if (!resolvedType) {
    resolvedType = getTypeFromTypedText(cleanInput);
  }

  return resolvedType;
};

/**
 * Traverses a nested object using a key path to resolve the final `.type` if it exists.
 *
 * @param object - The root object to start from.
 * @param keys - The list of keys (e.g., ["Variables", "json"]) to traverse.
 * @param level - Internal use for recursion depth (default 0).
 * @returns The `.type` string at the final node, or undefined if not found.
 */
export const resolveNestedType = (
  object: Record<string, any>,
  keys: string[],
  level: number = 0
): (vsAnyPrimitives | vsAnyRawTypes)["type"] | undefined => {
  const key = keys[level];

  if (!(key in object)) return;

  const currentValue = object[key];

  // If it's a nested object without a type, go deeper
  if (isRecord(currentValue) && !currentValue["type"]) {
    return resolveNestedType(currentValue, keys, level + 1);
  }

  // If it has a "type" field, return it
  if (isRecord(currentValue) && currentValue["type"]) {
    return currentValue.type;
  }
};
