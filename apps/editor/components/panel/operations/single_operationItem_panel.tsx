import React, { useEffect, useState } from "react";
import {
  Button,
  SimpleTooltip,
  MultiSelect,
  Separator,
  delay,
  generateHexRandomString,
} from "@vscrape/ui";
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
import {
  VsNode,
  OperationItem,
  workflowOperationItems,
  getInvalidInputs,
  insertOrRemoveIdsFromCurrentEditorErrors,
} from "@vscrape/engine/src";
import { cloneDeep } from "lodash";
import { toast } from "sonner";
import SharedOutputButtons from "../../buttons/shared_output_buttons";
import {
  rebuildExecutionPlan,
} from "../../../lib/utils";
import MoreOptionInput from "../../more_option_inputs";

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
  const [currentOperationItem, setCurrentOperationItem] = useState(
    cloneDeep(initialOperationItem)
  );
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
      errorChecker(currentOperationItem);

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

  const errorChecker = (currentOperationItem: OperationItem) => {
    // Get Invalid Inputs
    const errFields = getInvalidInputs({
      from: currentOperationItem,
      nodeId: initialNode.id,
      itemId: currentOperationItem.id,
    });

    // If found
    if (errFields.length > 0) {
      // Add the current "Operation Item Id" + "Parent Node Id" among CurrentEditor errors list
      insertOrRemoveIdsFromCurrentEditorErrors({
        fromId: currentOperationItem.id,
        initialNodeId: initialNode.id,
        action: "add",
      });

      setErrorFields(errFields);
      console.log("errFields", errFields);
      throw new Error("Invalid Operation!");
    } else {
      // Remove the current "Operation Item Id" + "Parent Node Id" among CurrentEditor errors list
      insertOrRemoveIdsFromCurrentEditorErrors({
        fromId: currentOperationItem.id,
        initialNodeId: initialNode.id,
        action: "remove",
      });
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
    const sub = currentOperationItem.stream$().subscribe((newData: any) => {
      setCurrentOperationItem(newData as OperationItem);
    });

    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    rebuildExecutionPlan();
    // Run Errors Checking if on Update Mode
    if (initialOperationItem) {
      try {
        errorChecker(initialOperationItem);
      } catch (e) {
        console.log("Err", e);
      }
    }
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
              onBack={() => {
                if (onBack) {
                  if (currentOperationItem) {
                    insertOrRemoveIdsFromCurrentEditorErrors({
                      fromId: currentOperationItem.id,
                      initialNodeId: initialNode.id,
                      action: "remove",
                    });
                  }

                  onBack();
                }
              }}
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
                                  nodeId={initialNode.id}
                                  itemId={currentOperationItem.id}
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
                              nodeId={initialNode.id}
                              itemId={currentOperationItem.id}
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
          <SharedOutputButtons
            nodeId={initialNode.id}
            blockId={initialNode.block?.id}
            itemId={currentOperationItem.id}
          />

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
                      if (currentOperationItem) {
                        insertOrRemoveIdsFromCurrentEditorErrors({
                          fromId: currentOperationItem.id,
                          initialNodeId: initialNode.id,
                          action: "remove",
                        });
                      }

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
