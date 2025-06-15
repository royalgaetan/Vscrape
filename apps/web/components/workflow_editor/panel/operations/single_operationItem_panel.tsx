import React, { useEffect, useState } from "react";
import SimpleTooltip from "@/components/global/simple_tooltip";
import { Button } from "@/components/ui/button";
import MultiSelect from "@/components/global/multi_select";
import { Separator } from "@/components/ui/separator";
import { workflowOperationItems } from "@/lib/workflow_editor/constants/workflow_operationItems_definition";
import {
  delay,
  generateHexRandomString,
  isReallyNumber,
} from "@/lib/numbers_utils";
import MoreOptionInput from "@/components/workflow_editor/more_option_inputs";
import { previousInputData } from "@/lib/workflow_editor/constants/w_constants";
import FieldLabel from "../field_label";
import OperationItemParamCard from "./operation_param_card";
import PanelHeader from "../panel_header";
import {
  Check,
  CircleEllipsisIcon,
  Hammer,
  Loader2,
  LucideIcon,
  Save,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { OperationItem } from "@/lib/workflow_editor/classes/operation_block";
import { VsNode } from "@/lib/workflow_editor/classes/node";
import { cloneDeep } from "lodash";
import { toast } from "sonner";
import { getTypeBigCategory } from "@/lib/workflow_editor/utils/get_criterias";
import {
  extractTextFromHTML,
  isPureVariableOnly,
  toCleanHTML,
  toStringSafe,
} from "@/lib/string_utils";
import { resolveInputTypeFromReference } from "../../inputs/filter_input_row";
import { isRecord } from "@/lib/utils";

export const shouldExcludeItem = (
  item: any,
  idx?: number,
  arr?: any[]
): boolean => {
  const itemAsString = toCleanHTML(toStringSafe(item));

  // Exclude if empty and is 1st element
  if (itemAsString.length === 0 && idx === 0) {
    return true;
  }

  // Exclude if empty and not the last item
  if (
    (arr && idx && itemAsString.length === 0 && idx !== arr.length - 1) ||
    (!arr && itemAsString.length === 0)
  ) {
    return true;
  }

  const typeCategory = getItemTypeCategory(item);

  // Exclude if not one of the allowed types
  return !["string", "number", "Strings", "Numbers"].includes(typeCategory);
};

export const getItemTypeCategory = (item: any): string => {
  if (isPureVariableOnly(item)) {
    const resolvedType = resolveInputTypeFromReference(
      extractTextFromHTML(item)
    );
    return getTypeBigCategory(resolvedType) ?? "";
  }
  if (typeof item === "boolean") {
    return "boolean";
  }
  if (isReallyNumber(item)) {
    return "number";
  }
  return typeof item;
};

const SingleOperationItemPanel = ({
  initialNode,
  initialOperationItem,
  onBack,
  onSave,
  onDelete,
  displayBackButton,
}: {
  initialNode: VsNode;
  initialOperationItem?: OperationItem;
  onBack?: () => void;
  onSave: (operationItem: OperationItem) => void;
  onDelete: (operationItemId: string) => void;
  displayBackButton?: boolean;
}) => {
  const [currentOperationItem, setCurrentOperationItem] =
    useState(initialOperationItem);
  const availableOperationItems = workflowOperationItems.filter(
    (operation) => operation.nodeName === initialNode.label
  );

  const [errorFields, setErrorFields] = useState<string[]>([]);
  const [isEdittingAField, setIsEdittingAField] = useState(false);

  const [isSavingOperation, setIsSavingOperation] = useState(false);
  const [SavingOperationResultIcon, setSavingOperationResultIcon] = useState<
    LucideIcon | undefined
  >(undefined);

  const saveOperation = async () => {
    setErrorFields([]);
    setSavingOperationResultIcon(undefined);
    setIsSavingOperation(true);
    await delay(400);

    try {
      if (!currentOperationItem)
        throw new Error("Can't save this Operation! Try again.");

      // Errors Checking
      errorChecker();

      setIsSavingOperation(false);
      setSavingOperationResultIcon(Check);
      await delay(150);
      setSavingOperationResultIcon(undefined);
      onSave(currentOperationItem);
    } catch (e) {
      toast.error("Invalid Operation! Try again.", {
        position: "bottom-center",
        richColors: true,
      });
      console.log("Err", e);
      setIsSavingOperation(false);
      setSavingOperationResultIcon(X);
      await delay(1000);
      setSavingOperationResultIcon(undefined);
      return;
    }
  };

  const errorChecker = () => {
    const errFields: string[] = [];

    const paramFlatted =
      currentOperationItem?.itemParams &&
      currentOperationItem?.itemParams.flatMap((p) => p);
    paramFlatted &&
      paramFlatted.forEach((param) => {
        const paramValueCleaned = extractTextFromHTML(
          toStringSafe(param.value)
        );
        const paramValueType = isPureVariableOnly(paramValueCleaned)
          ? resolveInputTypeFromReference(paramValueCleaned)
          : typeof param.value;
        const paramExpectedType = getTypeBigCategory(param.type);

        if (param.isOptional) {
        } else {
          console.log(
            param.paramName,
            "\nparamExpectedType",
            paramExpectedType,
            "\nparamValueType",
            paramValueType,
            "\n(BIG) paramValueType",
            getTypeBigCategory(paramValueType)
          );

          // STRINGS CHECKER
          if (paramExpectedType === "Strings") {
            if (
              (paramValueType === "string" ||
                getTypeBigCategory(paramValueType) === "Strings") &&
              paramValueCleaned.length > 0
            ) {
              // Value is Valid here...
            } else {
              errFields.push(param.paramName);
            }
          }

          // NUMBER CHECKER
          if (paramExpectedType === "Numbers") {
            if (
              (!isNaN(Number(param.value)) ||
                paramValueType === "number" ||
                getTypeBigCategory(paramValueType) === "Numbers") &&
              paramValueCleaned.length > 0
            ) {
              // Value is Valid here...
            } else {
              errFields.push(param.paramName);
            }
          }

          // BOOLEANS CHECKER
          if (paramExpectedType === "Booleans") {
            if (
              paramValueType === "boolean" ||
              getTypeBigCategory(paramValueType) === "Booleans"
            ) {
              // Value is Valid here...
            } else {
              errFields.push(param.paramName);
            }
          }

          // Radio CHECKER
          if (
            param.type === "primitive/radio" &&
            (typeof param.value !== "string" || param.value.length === 0)
          ) {
            errFields.push(param.paramName);
          }

          // Array CHECKER
          if (
            param.type === "primitive/array" &&
            (!Array.isArray(param.value) ||
              param.value.some((item, idx, arr) =>
                shouldExcludeItem(item, idx, arr)
              ))
          ) {
            errFields.push(param.paramName);
          }

          // Record CHECKER
          if (
            param.type === "primitive/record" &&
            (!Array.isArray(param.value) ||
              (param.value as any[]).some((el, idx, arr) => {
                const isLast = idx === arr.length - 1;
                // Is empty: { key: "", value: "" }
                const isEmpty =
                  JSON.stringify(el) === JSON.stringify({ key: "", value: "" });

                // Either Key or Value is missing
                const isMissingKey = Object.keys(el).some((key) =>
                  shouldExcludeItem(key)
                );
                const isMissingValue = Object.values(el).some((val) =>
                  shouldExcludeItem(val)
                );
                if (!isRecord(el)) return true;
                if (idx === 0) return isMissingKey || isMissingValue || isEmpty;
                if (isLast) {
                  if (isEmpty) return false;
                  else return isMissingKey || isMissingValue;
                }
                if (!isLast) return isMissingKey || isMissingValue || isEmpty;
              }))
          ) {
            errFields.push(param.paramName);
          }

          // Raw CHECKER: Non-existant in Operations Definition List
        }
      });

    if (errFields.length > 0) {
      setErrorFields(errFields);
      console.log("errFields", errFields);
      throw new Error("Invalid Operation!");
    }
  };

  useEffect(() => {
    if (availableOperationItems.length === 1) {
      const singleOperationItem = new OperationItem(
        cloneDeep(availableOperationItems[0])
      );
      setCurrentOperationItem(singleOperationItem);
    }

    if (!currentOperationItem) return;
    const sub = currentOperationItem.stream$().subscribe((newData) => {
      setCurrentOperationItem(newData as OperationItem);
    });

    return () => sub.unsubscribe();
  }, []);

  return (
    <div>
      <div className="flex flex-col w-full max-h-full relative">
        <div className="flex flex-col w-full max-h-full overflow-x-clip overflow-y-scroll scrollbar-hide">
          {/* Header */}
          <div className="px-4 w-full">
            <PanelHeader
              nodeOrigin={initialNode}
              displayBackButton={displayBackButton}
              onBack={() => onBack && onBack()}
              description={currentOperationItem?.operationItemDescription}
            />
          </div>

          {/* Content */}
          <div className="mt-4 pb-6 space-y-4">
            {/* Operation Selector */}
            {availableOperationItems.length > 1 && (
              <>
                <div className="flex flex-col justify-start items-start px-4 pr-4">
                  <FieldLabel
                    label={
                      initialOperationItem
                        ? "Change operation type"
                        : "Select an operation"
                    }
                    Icon={Hammer}
                  />

                  <MultiSelect
                    isTriggerDisabled={availableOperationItems.length === 0}
                    triggerClassName="h-9 w-[15.7rem] flex flex-1 mb-1"
                    popoverAlignment="center"
                    selectionMode="single"
                    popoverClassName="max-h-60 min-h-fit w-[15.7rem]"
                    label={
                      currentOperationItem?.operationItemName ??
                      "Pick an operation"
                    }
                    itemTooltipClassname="w-52"
                    data={{
                      "": availableOperationItems.map((op) => ({
                        label: op.operationItemName,
                        value: op.operationItemName,
                        icon: initialNode.icon ?? Star,
                        disabled: op.isDisabled,
                        iconClassName: "stroke-neutral-400 fill-transparent",
                        tooltipContent: op.operationItemDescription,
                        tooltipAlign: "end",
                        tooltipSide: "left",
                      })),
                    }}
                    selectedValues={
                      currentOperationItem?.operationItemName
                        ? [currentOperationItem.operationItemName]
                        : []
                    }
                    handleSelect={(opSelected) => {
                      setErrorFields([]);
                      if (
                        currentOperationItem &&
                        opSelected === currentOperationItem.operationItemName
                      ) {
                        setCurrentOperationItem(undefined);
                      } else {
                        const operationDefinition = workflowOperationItems.find(
                          (op) =>
                            op.operationItemName === opSelected &&
                            op.nodeName === initialNode?.label
                        );
                        if (!operationDefinition) return;
                        const operation = new OperationItem(
                          cloneDeep(operationDefinition)
                        );
                        setCurrentOperationItem(operation);
                      }
                    }}
                  />
                </div>
                <Separator className="my-2" />
              </>
            )}

            {/* Parameters List */}
            <div className="flex flex-col justify-start items-start">
              {currentOperationItem &&
              currentOperationItem.itemParams &&
              currentOperationItem.itemParams.length > 0 ? (
                <div className="flex flex-col w-full gap-4">
                  {currentOperationItem.itemParams.map((params, id) => {
                    // If Params is an Array: meaning it contains "nested" params
                    // => Display all of them in the same line
                    // Else Params is a Param: Display it in the 1 line
                    return (
                      <div key={`${generateHexRandomString(20)}_param_${id}`}>
                        {params && Array.isArray(params) ? (
                          <div className="flex flex-1 !w-full justify-start gap-0 px-4 pr-4 mt-2 mb-2">
                            {params.map((param, idx) => (
                              <div
                                key={`${generateHexRandomString(
                                  20
                                )}_param_inline_${idx}`}
                                className="flex flex-1 pl-2 pr-1 mr-2 first:pl-0"
                                style={{
                                  maxWidth: `${90 / params.length}%`,
                                }}
                              >
                                <OperationItemParamCard
                                  currentOperationItem={currentOperationItem}
                                  isWithinAGroup={true}
                                  hasError={errorFields.includes(
                                    param.paramName
                                  )}
                                  paramData={param}
                                  labelClassName={
                                    param.type
                                      .toLocaleLowerCase()
                                      .includes("switch")
                                      ? "text-center"
                                      : undefined
                                  }
                                  inputClassName="justify-center"
                                />
                                {params.length === idx + 1 ? (
                                  <></>
                                ) : (
                                  <div className="h-full w-[0.5px] ml-2 bg-border"></div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-1 w-full px-4 pr-4">
                            <OperationItemParamCard
                              currentOperationItem={currentOperationItem}
                              paramData={params}
                              isWithinAGroup={false}
                              hasError={errorFields.includes(params.paramName)}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <Separator className="my-2" />
                </div>
              ) : (
                <></>
              )}
            </div>

            {/* More Options List: Detect Duplicate, Enable Loop */}
            {currentOperationItem &&
              (currentOperationItem.loopThrough !== undefined ||
                currentOperationItem.skipDuplicate) && (
                <div>
                  <div className="flex flex-col justify-start items-start  px-4 pr-4">
                    <div className="mb-2">
                      <FieldLabel
                        label={"More Options"}
                        Icon={CircleEllipsisIcon}
                      />
                    </div>

                    {/* Loop Through */}
                    {currentOperationItem.loopThrough !== undefined && (
                      <MoreOptionInput
                        optionType="loopThrough"
                        currentOperationItem={currentOperationItem}
                      />
                    )}

                    {/* Skip Duplicates */}
                    {currentOperationItem.skipDuplicate && (
                      <MoreOptionInput
                        optionType="skipDuplicate"
                        currentOperationItem={currentOperationItem}
                      />
                    )}

                    {/* Separator */}
                  </div>
                  <Separator className="my-2" />
                </div>
              )}

            {/* Filters */}
            {currentOperationItem && (
              <div className="mt-1 flex flex-col justify-start items-start">
                <MoreOptionInput
                  isEditting={(state) => setIsEdittingAField(state)}
                  onError={(hasError) => {
                    const field = "FilterInputs";
                    if (hasError) setErrorFields((prev) => [...prev, field]);
                    else
                      setErrorFields((prev) => prev.filter((e) => e !== field));
                  }}
                  optionType="filters"
                  currentOperationItem={currentOperationItem}
                />
              </div>
            )}

            {/* Spacer */}
            <div className="h-[10vh]"></div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      {currentOperationItem && (
        <div className="flex flex-col w-[var(--workflowPanelWidth)] bg-white z-10 fixed bottom-[7vh]">
          {/* Shared Outputs DnD Buttons */}
          <div className="flex flex-1 gap-1 justify-between items-center py-1 px-1 border-t">
            {previousInputData.map((inputData) => (
              <SimpleTooltip
                key={inputData.label}
                tooltipText={inputData.tooltip}
              >
                <div
                  role="button"
                  tabIndex={2}
                  draggable
                  onDragStart={(e: React.DragEvent) => {
                    e.dataTransfer.setData(
                      "application/workflowEditor_inputdata",
                      inputData.dataTransfer
                    );
                    e.dataTransfer.effectAllowed = "move";
                  }}
                  className="w-1/3 h-5 px-1 py-0 line-clamp-1 text-center content-center border-none rounded-sm bg-primary/20 text-primary/80 cursor-grab text-xs font-medium"
                >
                  {inputData.label}
                </div>
              </SimpleTooltip>
            ))}
          </div>

          {/* Action Buttons: Delete | Save Operation */}
          <div className="flex flex-1 justify-end items-center py-1 px-3 border-t">
            {/* Delete Button: only if we're in [UPDATE Mode] */}
            {initialOperationItem && (
              <div className="flex flex-1 justify-start">
                <SimpleTooltip tooltipText={"Delete Operation"}>
                  <Button
                    type="button"
                    variant={"ghost"}
                    size={"sm"}
                    disabled={isEdittingAField}
                    className="w-fit"
                    onClick={() => {
                      // Delete Operation
                      onDelete(currentOperationItem.id);
                    }}
                  >
                    <Trash2 />
                  </Button>
                </SimpleTooltip>
              </div>
            )}

            <Button
              variant={"default"}
              disabled={isSavingOperation || isEdittingAField}
              className="rounded-2xl h-7 text-xs gap-1 px-3 duration-150"
              onClick={() => saveOperation()}
              // disabled={!onboardingForm.formState.isValid}
            >
              {isSavingOperation && SavingOperationResultIcon === undefined && (
                <Loader2 className="animate-spin stroke-white" />
              )}
              {SavingOperationResultIcon && !isSavingOperation && (
                <SavingOperationResultIcon className="stroke-white" />
              )}

              {!isSavingOperation &&
                SavingOperationResultIcon === undefined && (
                  <Save className="stroke-white" />
                )}
              <span className="">Save Changes</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleOperationItemPanel;
