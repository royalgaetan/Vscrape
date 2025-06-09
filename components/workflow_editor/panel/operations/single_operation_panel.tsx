import React, { useEffect, useState } from "react";
import SimpleTooltip from "@/components/global/simple_tooltip";
import { Button } from "@/components/ui/button";
import MultiSelect from "@/components/global/multi_select";
import { Separator } from "@/components/ui/separator";
import { workflowOperations } from "@/lib/workflow_editor/constants/workflows_operations_definition";
import {
  delay,
  generateHexRandomString,
  isReallyNumber,
} from "@/lib/numbers_utils";
import MoreOptionInput from "@/components/workflow_editor/more_option_inputs";
import { previousInputData } from "@/lib/workflow_editor/constants/w_constants";
import { NodeBlockType } from "@/stores/workflowStore";
import FieldLabel from "../field_label";
import OperationParamCard from "./operation_param_card";
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
import { OperationBlock } from "@/lib/workflow_editor/classes/operation_block";
import { VsNode } from "@/lib/workflow_editor/classes/node";
import { cloneDeep } from "lodash";
import { toast } from "sonner";
import { getTypeBigCategory } from "@/lib/workflow_editor/utils/get_criterias";
import {
  extractTextFromHTML,
  isPureVariableOnly,
  stripMustacheBraces,
  toCleanHTML,
  toStringSafe,
} from "@/lib/string_utils";
import { resolveInputTypeFromReference } from "../../inputs/filter_input_row";
import { isRecord } from "@/lib/utils";
import { isAFile } from "../form_fields/form_field_block_preview";

const SingleOperationPanel = ({
  nodeOrigin,
  operationOrigin,
  onBack,
  onSave,
  onDelete,
  displayBackButton,
}: {
  nodeOrigin: VsNode;
  operationOrigin?: OperationBlock;
  onBack?: () => void;
  onSave: (block?: NodeBlockType) => void;
  onDelete: (operationId: string) => void;
  displayBackButton?: boolean;
}) => {
  const [currentBlock, setCurrentBlock] = useState(operationOrigin);
  const availableOperations = workflowOperations.filter(
    (operation) => operation.nodeName === nodeOrigin.label
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
      if (!currentBlock)
        throw new Error("Can't save this Operation! Try again.");

      // Errors Checking
      errorChecker();

      setIsSavingOperation(false);
      setSavingOperationResultIcon(Check);
      await delay(150);
      setSavingOperationResultIcon(undefined);
      onSave(currentBlock);
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
      currentBlock?.params && currentBlock?.params.flatMap((p) => p);
    paramFlatted &&
      paramFlatted.forEach((param) => {
        const paramValueCleaned = extractTextFromHTML(
          toStringSafe(param.value)
        );
        const paramType = isPureVariableOnly(paramValueCleaned)
          ? resolveInputTypeFromReference(param.value)
          : param.type;

        if (param.isOptional) {
        } else {
          // STRINGS CHECKER
          if (
            (getTypeBigCategory(paramType) === "Strings" ||
              paramType === "primitive/customSwitch") &&
            (typeof param.value !== "string" || paramValueCleaned.length === 0)
          ) {
            errFields.push(param.paramName);
          }

          // NUMBER CHECKER
          if (
            getTypeBigCategory(paramType) === "Numbers" &&
            (paramValueCleaned.length === 0 ||
              isNaN(Number(paramValueCleaned.trim())))
          ) {
            errFields.push(param.paramName);
          }

          // BOOLEANS CHECKER
          if (
            getTypeBigCategory(paramType) === "Booleans" &&
            typeof param.value !== "boolean"
          ) {
            errFields.push(param.paramName);
          }

          // Radio CHECKER
          if (
            paramType === "primitive/radio" &&
            (typeof param.value !== "string" || param.value.length === 0)
          ) {
            errFields.push(param.paramName);
          }

          // Array CHECKER
          if (
            paramType === "primitive/array" &&
            (!Array.isArray(param.value) ||
              param.value.some((item, idx, arr) =>
                shouldExcludeItem(item, idx, arr)
              ))
          ) {
            errFields.push(param.paramName);
          }

          // Record CHECKER
          if (
            paramType === "primitive/record" &&
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
                if (!isRecord) return true;
                if (isLast) {
                  if (isEmpty) return false;
                  else return isMissingKey || isMissingValue;
                }
                if (!isLast) return isMissingKey || isMissingValue || isEmpty;
              }))
          ) {
            errFields.push(param.paramName);
          }

          // Raw CHECKER: Non-existant in Operation Definition List
        }
      });

    if (errFields.length > 0) {
      setErrorFields(errFields);
      console.log("errFields", errFields);
      throw new Error("Invalid Operation!");
    }
  };

  useEffect(() => {
    if (availableOperations.length === 1) {
      setCurrentBlock(new OperationBlock(cloneDeep(availableOperations[0])));
    }

    if (!currentBlock) return;
    const sub = currentBlock.stream$().subscribe((newData) => {
      setCurrentBlock(newData as OperationBlock);
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
              nodeOrigin={nodeOrigin}
              displayBackButton={displayBackButton}
              onBack={() => onBack && onBack()}
              description={currentBlock?.operationDescription}
            />
          </div>

          {/* Content */}
          <div className="mt-4 pb-6 space-y-4">
            {/* Operation Selector */}
            {availableOperations.length > 1 && (
              <>
                <div className="flex flex-col justify-start items-start px-4 pr-4">
                  <FieldLabel
                    label={
                      operationOrigin
                        ? "Change operation type"
                        : "Select an operation"
                    }
                    Icon={Hammer}
                  />

                  <MultiSelect
                    isTriggerDisabled={availableOperations.length === 0}
                    triggerClassName="h-9 w-[15.7rem] flex flex-1 mb-1"
                    popoverAlignment="center"
                    selectionMode="single"
                    popoverClassName="max-h-60 min-h-fit w-[15.7rem]"
                    label={currentBlock?.operationName ?? "Pick an operation"}
                    itemTooltipClassname="w-52"
                    data={{
                      "": availableOperations.map((op) => ({
                        label: op.operationName,
                        value: op.operationName,
                        icon: nodeOrigin.icon ?? Star,
                        disabled: op.isDisabled,
                        iconClassName: "stroke-neutral-400 fill-transparent",
                        tooltipContent: op.operationDescription,
                        tooltipAlign: "end",
                        tooltipSide: "left",
                      })),
                    }}
                    selectedValues={
                      currentBlock?.operationName
                        ? [currentBlock.operationName]
                        : []
                    }
                    handleSelect={(opSelected) => {
                      setErrorFields([]);
                      if (
                        currentBlock &&
                        opSelected === currentBlock.operationName
                      ) {
                        setCurrentBlock(undefined);
                      } else {
                        const operationDefinition = workflowOperations.find(
                          (op) =>
                            op.operationName === opSelected &&
                            op.nodeName === nodeOrigin?.label
                        );
                        if (!operationDefinition) return;
                        const operation = new OperationBlock(
                          cloneDeep(operationDefinition)
                        );
                        setCurrentBlock(operation);
                      }
                    }}
                  />
                </div>
                <Separator className="my-2" />
              </>
            )}

            {/* Parameters List */}
            <div className="flex flex-col justify-start items-start">
              {currentBlock &&
              currentBlock.params &&
              currentBlock.params.length > 0 ? (
                <div className="flex flex-col w-full gap-4">
                  {currentBlock.params.map((params, id) => {
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
                                <OperationParamCard
                                  currentOperationBlock={currentBlock}
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
                            <OperationParamCard
                              hasError={errorFields.includes(params.paramName)}
                              currentOperationBlock={currentBlock}
                              paramData={params}
                              isWithinAGroup={false}
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
            {currentBlock &&
              (currentBlock.loopThrough !== undefined ||
                currentBlock.skipDuplicate) && (
                <div>
                  <div className="flex flex-col justify-start items-start  px-4 pr-4">
                    <div className="mb-2">
                      <FieldLabel
                        label={"More Options"}
                        Icon={CircleEllipsisIcon}
                      />
                    </div>

                    {/* Loop Through */}
                    {currentBlock.loopThrough !== undefined && (
                      <MoreOptionInput
                        optionType="loopThrough"
                        currentBlock={currentBlock}
                      />
                    )}

                    {/* Skip Duplicates */}
                    {currentBlock.skipDuplicate && (
                      <MoreOptionInput
                        optionType="skipDuplicate"
                        currentBlock={currentBlock}
                      />
                    )}

                    {/* Separator */}
                  </div>
                  <Separator className="my-2" />
                </div>
              )}

            {/* Filters */}
            {currentBlock && (
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
                  currentBlock={currentBlock}
                />
              </div>
            )}

            {/* Spacer */}
            <div className="h-[10vh]"></div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      {currentBlock && (
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
            {operationOrigin && (
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
                      onDelete(operationOrigin.id);
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

export default SingleOperationPanel;

export const shouldExcludeItem = (
  item: any,
  idx?: number,
  arr?: any[]
): boolean => {
  const itemAsString = toCleanHTML(toStringSafe(item));

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
