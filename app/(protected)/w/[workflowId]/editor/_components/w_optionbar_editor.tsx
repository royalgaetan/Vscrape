import SimpleTooltip from "@/components/global/simple_tooltip";
import { Button } from "@/components/ui/button";
import { useWorkflowEditor } from "@/hooks/useWorkflowEditor";
import { cn } from "@/lib/utils";
import {
  CircleEllipsisIcon,
  Hammer,
  LucideIcon,
  Star,
  Trash2,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MultiSelect from "@/components/global/multi_select";
import { Separator } from "@/components/ui/separator";
import { workflowOperations } from "@/lib/workflow_editor/constants/workflows_operations_definition";
import { generateHexRandomString } from "@/lib/numbers_utils";
import ParameterItemLine from "./w_optionbar_param_itemline";
import MoreOptionInput from "@/components/workflow_editor/more_option_inputs";
import { previousInputData } from "@/lib/workflow_editor/constants/w_constants";

const OptionbarEditor = () => {
  const [selectedOperation, setSelectedOperation] = useState<string>();
  const { optionbarItem, isOptionbarOpen, toggleOptionbar } =
    useWorkflowEditor();

  const Icon = optionbarItem?.icon;

  useEffect(() => {
    setSelectedOperation(undefined);
  }, [optionbarItem]);

  const selectedOperationParams = workflowOperations.find(
    (op) => op.operationName === selectedOperation
  )?.params;

  const operationInfo = workflowOperations.find(
    (op) => op.operationName === selectedOperation
  );

  return !isOptionbarOpen ? (
    <></>
  ) : (
    <div className="[--optionbarwidth:18rem] min-w-[var(--optionbarwidth)] max-w-[var(--optionbarwidth)] h-full  bg-white border-l flex flex-col items-start justify-start relative">
      <div className="flex flex-1 w-full max-h-full overflow-x-clip overflow-y-scroll scrollbar-hide">
        <div className="h-px w-full relative">
          <div className="min-w-[18rem] max-w-[18rem] bg-white border-r flex flex-col items-start justify-start relative">
            {/* Close Button */}
            <div className="flex w-[var(--optionbarwidth)] justify-end px-4 items-center bg-transparent z-10 translate-y-4 -mb-1 sticky top-0">
              <SimpleTooltip
                side="bottom"
                align="end"
                tooltipText={"Close the panel"}
              >
                <Button
                  variant={"ghost"}
                  onClick={() => toggleOptionbar(false)}
                  className={cn(
                    "bg-gray-100 hover:bg-gray-200 inset-0 p-3 duration-0 rounded-full size-4 flex justify-center items-center"
                  )}
                >
                  <X className="size-3" />
                </Button>
              </SimpleTooltip>
            </div>

            {!optionbarItem ? (
              <div className=" text-muted-foreground w-full text-xs font-semibold flex flex-1 justify-center items-center min-h-[80vh]">
                Select a tool.
              </div>
            ) : (
              <div className="flex flex-col w-full max-h-full relative">
                <div className="flex flex-col w-full max-h-full overflow-x-clip overflow-y-scroll scrollbar-hide">
                  {/* Header */}
                  <div className="flex flex-col w-full px-4">
                    <div className="flex flex-1 gap-2 items-center">
                      <div className="size-5">
                        {Icon && (
                          <Icon
                            className={"size-5"}
                            stroke={optionbarItem.iconColor}
                          />
                        )}
                        {optionbarItem.logoPath && (
                          <div className="relative h-5 w-5 mb-2">
                            <Image
                              src={optionbarItem.logoPath}
                              alt={`${optionbarItem.label} logo`}
                              className="select-none object-contain"
                              fill
                            />
                          </div>
                        )}
                      </div>

                      <h2 className="text-xl font-semibold text-[#333] line-clamp-1">
                        {optionbarItem.label}
                      </h2>
                    </div>

                    {optionbarItem.tooltip && (
                      <p className="mt-1 text-xs font-normal text-neutral-500 line-clamp-2">
                        {optionbarItem.tooltip}
                      </p>
                    )}
                  </div>

                  {/* Content */}
                  <div className="mt-4 pb-6 space-y-4">
                    {/* Operation Selector */}
                    <div className="flex flex-col justify-start items-start px-4 pr-4">
                      <FieldLabel label={"Select an operation"} Icon={Hammer} />
                      <MultiSelect
                        isTriggerDisabled={
                          optionbarItem.operations.length === 0
                        }
                        triggerClassName="h-9 w-[15.7rem] flex flex-1 mb-1"
                        popoverAlignment="center"
                        selectionMode="single"
                        popoverClassName="max-h-60 min-h-fit w-[15.7rem]"
                        label={selectedOperation ?? "Pick an operation"}
                        data={{
                          "": optionbarItem.operations.map((op) => ({
                            label: op.operationName,
                            value: op.operationName,
                            icon: optionbarItem.icon ?? Star,
                            iconClassName:
                              "stroke-neutral-400 fill-transparent",
                          })),
                        }}
                        selectedValues={
                          selectedOperation ? [selectedOperation] : []
                        }
                        handleSelect={(opSelected) => {
                          if (opSelected === selectedOperation) {
                            setSelectedOperation(undefined);
                          } else {
                            setSelectedOperation(opSelected);
                          }
                        }}
                      />
                    </div>
                    <Separator className="my-2" />

                    {/* Input Available List: previousOperationData | previousNodeData | Variables */}
                    <div></div>

                    {/* Parameters List */}
                    <div className="flex flex-col justify-start items-start">
                      {!selectedOperationParams ||
                      selectedOperationParams.length === 0 ? (
                        <div className="h-[0vh]"></div>
                      ) : (
                        <div className="flex flex-col w-full gap-4">
                          {selectedOperationParams.map((params, id) => {
                            // If Params is an Array: meaning it contains "nested" params
                            // => Display all of them in the same line
                            // Else Params is a Param: Display it in the 1 line
                            return (
                              <div
                                key={`${generateHexRandomString(
                                  20
                                )}_param_${id}`}
                              >
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
                                          operationName={selectedOperation}
                                          label={param.paramName}
                                          placeHolder={
                                            param.paramInputPlaceholder
                                          }
                                          valuesToPickFrom={
                                            param.valuesToPickFrom
                                          }
                                          inputType={param.type}
                                          labelClassName={
                                            param.type
                                              .toLocaleLowerCase()
                                              .includes("switch")
                                              ? "text-center"
                                              : undefined
                                          }
                                          className=""
                                          inputClassName="justify-center"
                                          onValueChange={(value) => {}}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="flex flex-1 w-full px-4 pr-4">
                                    <ParameterItemLine
                                      operationName={selectedOperation}
                                      label={params.paramName}
                                      inputType={params.type}
                                      valuesToPickFrom={params.valuesToPickFrom}
                                      placeHolder={params.paramInputPlaceholder}
                                      onValueChange={(value) => {}}
                                    />
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
                    {selectedOperation && (
                      <div>
                        <div className="flex flex-col justify-start items-start  px-4 pr-4">
                          <FieldLabel
                            label={"More Options"}
                            Icon={CircleEllipsisIcon}
                          />

                          {/* Loop Through */}
                          {operationInfo && (
                            <MoreOptionInput
                              operationName={selectedOperation}
                              optionType="loopThrough"
                            />
                          )}

                          {/* Skip Duplicates */}
                          {operationInfo && (
                            <MoreOptionInput
                              operationName={selectedOperation}
                              optionType="skipDuplicate"
                            />
                          )}

                          {/* Separator */}
                        </div>
                        <Separator className="my-2" />
                      </div>
                    )}

                    {/* Filters */}
                    {selectedOperation && (
                      <div className="mt-1 flex flex-col justify-start items-start">
                        <MoreOptionInput
                          optionType="filters"
                          operationName={selectedOperation}
                        />
                      </div>
                    )}

                    {/* Spacer */}
                    <div className="h-[10vh]"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Fixed Bottom Bar */}
            {selectedOperation && optionbarItem && (
              <div className="flex flex-col w-[var(--optionbarwidth)] bg-white z-10 fixed bottom-[7vh]">
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
                <div className="flex flex-1 justify-between items-center py-1 px-3 border-t">
                  <SimpleTooltip tooltipText={"Delete Operation"}>
                    <Button
                      type="button"
                      variant={"ghost"}
                      size={"sm"}
                      className="w-fit"
                      onClick={() => {}}
                    >
                      <Trash2 />
                    </Button>
                  </SimpleTooltip>

                  <Button
                    type="submit"
                    variant={"default"}
                    size={"sm"}
                    // disabled={!onboardingForm.formState.isValid}
                    className="w-fit"
                  >
                    Save changes
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionbarEditor;

export const FieldLabel = ({
  label,
  Icon,
}: {
  label: string;
  Icon?: LucideIcon;
}) => {
  return (
    <div className="flex flex-1 justify-start items-center gap-2 mb-2">
      <div className="w-fit">
        {Icon && <Icon className="stroke-neutral-700/70 !size-5" />}
      </div>
      <span className="text-base font-semibold text-neutral-700 line-clamp-1">
        {label}
      </span>
    </div>
  );
};
