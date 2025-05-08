import React, { useRef, useState } from "react";
import SimpleTooltip from "@/components/global/simple_tooltip";
import { Button } from "@/components/ui/button";
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
import MultiSelect from "@/components/global/multi_select";
import { Separator } from "@/components/ui/separator";
import { workflowOperations } from "@/lib/workflow_editor/constants/workflows_operations_definition";
import { delay, generateHexRandomString } from "@/lib/numbers_utils";
import ParameterItemLine from "./w_optionbar_param_itemline";
import MoreOptionInput from "@/components/workflow_editor/more_option_inputs";
import { previousInputData } from "@/lib/workflow_editor/constants/w_constants";
import { FieldLabel, OptionbarHeader } from "./w_optionbar_editor";
import { useWorkflowEditorStore } from "@/stores/workflowStore";
import { VsNode } from "@/lib/workflow_editor/node";
import { OperationItem } from "@/lib/workflow_editor/types/w_types";

const OptionbarOperation = ({
  nodeOrigin,
  operationOrigin,
  onBack,
  onSave,
  onDelete,
  displayBackButton,
}: {
  nodeOrigin: VsNode;
  operationOrigin?: OperationItem;
  onBack?: () => void;
  onSave: (operation: OperationItem) => void;
  onDelete: (operationId: string) => void;
  displayBackButton?: boolean;
}) => {
  const operationId = useRef<string>(
    operationOrigin?.operationId ?? crypto.randomUUID()
  );
  // Store
  const currentNode = useWorkflowEditorStore((s) => s.currentNode);

  const currentOperation = useWorkflowEditorStore((s) => s.currentOperation);
  const setCurrentOperation = useWorkflowEditorStore(
    (s) => s.setCurrentOperation
  );
  // End Store

  const availableOperations = workflowOperations.filter(
    (operation) => operation.nodeName === nodeOrigin.label
  );

  const [isSavingOperation, setIsSavingOperation] = useState(false);
  const [SavingOperationResultIcon, setSavingOperationResultIcon] = useState<
    LucideIcon | undefined
  >(undefined);
  const saveOperation = async () => {
    setSavingOperationResultIcon(undefined);
    setIsSavingOperation(true);
    await delay(400);

    if (!currentNode || !currentOperation) {
      setIsSavingOperation(false);
      setSavingOperationResultIcon(X);
      await delay(1000);
      setSavingOperationResultIcon(undefined);
      return;
    }
    try {
      setIsSavingOperation(false);
      setSavingOperationResultIcon(Check);
      await delay(150);
      setSavingOperationResultIcon(undefined);
      onSave(currentOperation);
    } catch (e) {
      console.log("Err", e);
      setIsSavingOperation(false);
      setSavingOperationResultIcon(X);
      await delay(1000);
      setSavingOperationResultIcon(undefined);
      return;
    }
  };

  return (
    <div>
      <div className="flex flex-col w-full max-h-full relative">
        <div className="flex flex-col w-full max-h-full overflow-x-clip overflow-y-scroll scrollbar-hide">
          {/* Header */}
          <div className="px-4 w-full">
            <OptionbarHeader
              nodeOrigin={nodeOrigin}
              displayBackButton={displayBackButton}
              onBack={() => onBack && onBack()}
            />
          </div>

          {/* Content */}
          <div className="mt-4 pb-6 space-y-4">
            {/* Operation Selector */}
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
                label={currentOperation?.operationName ?? "Pick an operation"}
                data={{
                  "": availableOperations.map((op) => ({
                    label: op.operationName,
                    value: op.operationName,
                    icon: nodeOrigin.icon ?? Star,
                    iconClassName: "stroke-neutral-400 fill-transparent",
                  })),
                }}
                selectedValues={
                  currentOperation?.operationName
                    ? [currentOperation.operationName]
                    : []
                }
                handleSelect={(opSelected) => {
                  if (opSelected === currentOperation?.operationName) {
                    setCurrentOperation(undefined);
                  } else {
                    const operation = workflowOperations.find(
                      (op) => op.operationName === opSelected
                    );
                    if (!operation) return;
                    setCurrentOperation(
                      structuredClone({
                        operationId: operationId.current,
                        ...operation,
                      })
                    );
                  }
                }}
              />
            </div>
            <Separator className="my-2" />

            {/* Parameters List */}
            <div className="flex flex-col justify-start items-start">
              {!currentOperation ||
              !currentOperation.params ||
              currentOperation.params.length === 0 ? (
                <div className="h-[0vh]"></div>
              ) : (
                <div className="flex flex-col w-full gap-4">
                  {currentOperation?.params?.map((params, id) => {
                    // If Params is an Array: meaning it contains "nested" params
                    // => Display all of them in the same line
                    // Else Params is a Param: Display it in the 1 line
                    return (
                      <div key={`${generateHexRandomString(20)}_param_${id}`}>
                        {Array.isArray(params) ? (
                          <div className="flex flex-1 gap-2 px-4 pr-4 divide-x-2 mt-3">
                            {params.map((param, idx) => (
                              <div
                                key={`${generateHexRandomString(
                                  20
                                )}_param_inline_${idx}`}
                                className="flex flex-1"
                                style={{
                                  maxWidth: `${90 / params.length}%`,
                                }}
                              >
                                <ParameterItemLine
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
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-1 w-full px-4 pr-4">
                            <ParameterItemLine paramData={params} />
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <Separator className="my-2" />
                </div>
              )}
            </div>

            {/* More Options List: Detect Duplicate, Enable Loop */}
            {currentOperation && (
              <div>
                <div className="flex flex-col justify-start items-start  px-4 pr-4">
                  <FieldLabel
                    label={"More Options"}
                    Icon={CircleEllipsisIcon}
                  />

                  {/* Loop Through */}
                  {currentOperation.loopThrough !== undefined && (
                    <MoreOptionInput optionType="loopThrough" />
                  )}

                  {/* Skip Duplicates */}
                  {currentOperation.skipDuplicate && (
                    <MoreOptionInput optionType="skipDuplicate" />
                  )}

                  {/* Separator */}
                </div>
                <Separator className="my-2" />
              </div>
            )}

            {/* Filters */}
            {currentOperation && (
              <div className="mt-1 flex flex-col justify-start items-start">
                <MoreOptionInput optionType="filters" />
              </div>
            )}

            {/* Spacer */}
            <div className="h-[10vh]"></div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      {currentOperation && (
        <div className="flex flex-col w-[var(--optionbarwidth)] bg-white z-10 fixed bottom-[7vh]">
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
                    className="w-fit"
                    onClick={() => {
                      // Delete Operation
                      onDelete(operationOrigin.operationId);
                    }}
                  >
                    <Trash2 />
                  </Button>
                </SimpleTooltip>
              </div>
            )}

            <Button
              variant={"default"}
              disabled={isSavingOperation}
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

export default OptionbarOperation;
