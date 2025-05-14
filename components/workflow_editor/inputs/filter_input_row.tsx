import { useEffect, useState } from "react";
import { FilterIcon, Trash2 } from "lucide-react";
import MultiSelect from "@/components/global/multi_select";
import {
  capitalizeFirstLetter,
  extractSingleTokenType,
  extractTextFromHTML,
  isPureVariableOnly,
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

type SingleFilterRowProps = {
  initialFilter: ExtendedOperationFilterType;
  onSave: (newFilterValue: ExtendedOperationFilterType) => void;
  onDelete: () => void;
  index: number;
};

const SingleFilterRow = ({
  initialFilter,
  onDelete,
  onSave,
  index,
}: SingleFilterRowProps) => {
  const [isFilterContainerSelected, setIsFilterContainerSelected] =
    useState<boolean>(true);

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
      if (getInputType(text) !== getInputType(filterObj.filterType)) {
        filterObj.filterCriteria = null;
        filterObj.filterValue = [undefined] as any;
      }
    }

    filterObj.filterType = getInputType(text) as any;
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
      return false;
    }
    if (
      filterObj.inputID === null ||
      (typeof filterObj.inputID === "string" && filterObj.inputID.length === 0)
    ) {
      setErrorInputID(true);
      return false;
    }

    // Criteria Input error handler
    if (
      filterObj.filterCriteria === null ||
      (typeof filterObj.inputID === "string" && filterObj.inputID.length === 0)
    ) {
      setErrorCriteria(true);
      return false;
    }

    // If Filter value is null and isn't an array of values: avoid saving the filter
    if (filterObj.filterValue === null || !Array.isArray(filterObj.filterValue))
      return false;

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
      return false;
    } else {
      onSave(filterObj);
      return true;
    }
  };

  const getType = (
    object: Record<string, any>,
    keys: string[],
    initialLevel: number = 0
  ) => {
    let level = initialLevel;

    if (!object[keys[level]]) return;
    let obj = object[keys[level]];

    if (isRecord(obj) && !obj["type"]) {
      return getType(obj, keys, level + 1);
    } else if (isRecord(obj) && obj["type"]) {
      return obj.type;
    }
  };

  const getSimplifiedTypeFromType = (type: any): GetFilterValueInput => {
    // Date Case
    if (type === "primitive/dateTime") return "date";
    // Number Case
    else if (type === "primitive/number") return "number";
    // Undefined Case
    else if (type === undefined || type === null) return "undefined";
    // Default: String Case
    else return "text";
  };

  const getTypeFromTypedText = (
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

  const getInputType = (
    inputID: any
  ): (vsAnyPrimitives | vsAnyRawTypes)["type"] | undefined => {
    // From a specific input ID => return its correct mine-type
    let typeExtracted = extractSingleTokenType(toStringSafe(inputID));
    if (typeExtracted === null) {
      typeExtracted = getTypeFromTypedText(toStringSafe(inputID));
    }

    return typeExtracted as (vsAnyPrimitives | vsAnyRawTypes)["type"];
  };

  const valueInputsSchema: GetFilterValueInputs = getFilterValueInputs({
    filterCriteria: filterObj.filterCriteria,
    filterType: getInputType(filterObj?.inputID) as any,
  });
  const criteriaSelectionName: string =
    getCriteriaSelection({
      filterType: getInputType(filterObj?.inputID),
    }).length > 0
      ? "Criterias"
      : "";

  return (
    <div
      role="button"
      tabIndex={1}
      className="[--input-height:1.7rem] flex flex-col w-full border-t last:border-b-0 first:border-t-0 first:mt-2 px-4 py-1 hover:bg-neutral-400/10 rounded-none transition-all duration-100 cursor-pointer"
    >
      {!isFilterContainerSelected ? (
        // If filter input is NOT select: shrink it to display on its summary
        <button
          onClick={() => setIsFilterContainerSelected((prev) => !prev)}
          className="flex flex-col items-start justify-start gap-1 w-full py-2 pl-1"
        >
          <div className="text-sm font-semibold flex gap-1 items-center">
            <FilterIcon className="size-3 translate-y-[1.9px] stroke-neutral-700" />
            Filter {index + 1}
          </div>
          <div className="w-full line-clamp-2 text-xs text-start">
            {!filterObj.filterCriteria &&
            filterObj.filterValue !== null &&
            filterObj.filterValue[0] === null &&
            !filterObj.inputID ? (
              "Empty"
            ) : (
              <span>
                <TextWithSeparator content={filterObj.inputID} separator="" />
                <TextWithSeparator content={filterObj.filterCriteria} isBold />
                <TextWithSeparator content={filterObj.filterValue} />
              </span>
            )}
          </div>
        </button>
      ) : (
        // If filter input is select: expand it to allow user to add changes
        <>
          <div className="flex flex-1 items-start gap-2 group/filterItem h-7 mt-1 mb-2">
            {/* Input ID: let user add the input from which filter will be applied to */}
            <div className="flex flex-1 min-w-[30%]">
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
            <div className="flex flex-1 min-w-[30%]">
              <MultiSelect
                isTriggerDisabled={
                  !filterObj?.inputID || !getInputType(filterObj?.inputID)
                }
                triggerClassName={cn(
                  "max-w-[4.7rem] min-w-[4.7rem] !h-[var(--input-height)] bg-slate-100/40 flex flex-1 mb-1",
                  errorCriteria && inputErrorClassName
                )}
                popoverAlignment="center"
                selectionMode="single"
                popoverClassName="max-h-60 min-h-fit w-[100%]"
                label={filterObj.filterCriteria ?? "Criteria..."}
                data={{
                  [criteriaSelectionName]: getCriteriaSelection({
                    filterType: getInputType(filterObj?.inputID),
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
                    filterType: getInputType(filterObj?.inputID) as any,
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
            <div className="flex flex-1 w-fit min-w-0 max-w-[30%]">
              <div className="flex flex-col gap-2">
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
                res && setIsFilterContainerSelected(false);
              }}
            >
              Save Filter
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
