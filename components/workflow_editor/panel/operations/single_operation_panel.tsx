import React, { useEffect, useState } from "react";
import SimpleTooltip from "@/components/global/simple_tooltip";
import { Button } from "@/components/ui/button";
import MultiSelect from "@/components/global/multi_select";
import { Separator } from "@/components/ui/separator";
import { workflowOperations } from "@/lib/workflow_editor/constants/workflows_operations_definition";
import { delay, generateHexRandomString } from "@/lib/numbers_utils";
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

  const [isSavingOperation, setIsSavingOperation] = useState(false);
  const [SavingOperationResultIcon, setSavingOperationResultIcon] = useState<
    LucideIcon | undefined
  >(undefined);

  const saveOperation = async () => {
    setSavingOperationResultIcon(undefined);
    setIsSavingOperation(true);
    await delay(400);

    if (!currentBlock) {
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
      onSave(currentBlock);
    } catch (e) {
      console.log("Err", e);
      setIsSavingOperation(false);
      setSavingOperationResultIcon(X);
      await delay(1000);
      setSavingOperationResultIcon(undefined);
      return;
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

export default SingleOperationPanel;
