import SimpleTooltip from "@/components/global/simple_tooltip";
import { Button } from "@/components/ui/button";
import { useWorkflowEditor } from "@/hooks/useWorkflowEditor";
import { cn } from "@/lib/utils";
import { Coins, LockKeyholeOpen, Star, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MultiSelect from "@/components/global/multi_select";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import SettingItemSelect from "@/app/(protected)/_settings/_components/settings_item_select";
import { appLanguages } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { workflowOperations } from "@/lib/workflow_editor/constants/workflows_operations_definition";
import { OperationParamItem } from "@/lib/workflow_editor/types/w_types";
import {
  vsAnyPrimitives,
  vsAnyRawTypes,
} from "@/lib/workflow_editor/types/data_types";
import ParamInput from "@/components/workflow_editor/param_inputs";

const OptionbarEditor = () => {
  const [selectedOperation, setSelectedOperation] = useState<string>();
  const { optionbarItem, isOptionbarOpen, toggleOptionbar } =
    useWorkflowEditor();

  const Icon = optionbarItem?.icon;

  useEffect(() => {
    setSelectedOperation(undefined);
  }, [optionbarItem]);

  const selectedOperationParams = workflowOperations.find(
    (op) => op.operationName === selectedOperation ?? ""
  )?.params;

  return !isOptionbarOpen ? (
    <></>
  ) : (
    <div className="min-w-[18rem] max-w-[18rem] h-full  bg-white border-l flex flex-col items-start justify-start relative">
      <div className="flex flex-1 w-full max-h-full overflow-x-clip overflow-y-scroll scrollbar-hide">
        <div className="h-px w-full relative">
          <div className="min-w-[18rem] max-w-[18rem] bg-white border-r flex flex-col items-start justify-start relative">
            {/* Close Button */}
            <div className="flex w-full justify-end  px-4 items-center bg-transparent z-10 translate-y-4 -mb-1 sticky top-0">
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
                  {/* Operations list */}
                  <div className="flex flex-col justify-start items-start px-4 pr-4">
                    <FieldLabel label={"Select an operation"} />
                    <MultiSelect
                      isTriggerDisabled={optionbarItem.operations.length === 0}
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
                          iconClassName: "stroke-neutral-400 fill-transparent",
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

                  {/* Parameters */}
                  <div className="flex flex-col justify-start items-start">
                    {!selectedOperationParams ||
                    selectedOperationParams.length === 0 ? (
                      <div className="h-[40vh]"></div>
                    ) : (
                      <div className="flex flex-col w-full gap-4">
                        {selectedOperationParams.map((params) => {
                          // If Params is an Array: meaning it contains "nested" params
                          // => Display all of them in the same line
                          if (Array.isArray(params)) {
                            return (
                              <div className="flex flex-1 gap-2 px-4 pr-4 divide-x-2 mt-3">
                                {params.map((param) => (
                                  <div
                                    className="flex flex-1"
                                    style={{
                                      maxWidth: `${90 / params.length}%`,
                                    }}
                                  >
                                    <ParameterItemLine
                                      operationName={selectedOperation}
                                      label={param.paramName}
                                      placeHolder={param.paramInputPlaceholder}
                                      valuesToPickFrom={param.valuesToPickFrom}
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
                            );
                          }

                          // Else Params is a Param: Display it in the 1 line
                          return (
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
                          );
                        })}
                        <Separator className="my-2" />
                      </div>
                    )}
                  </div>

                  {/* More Option */}
                  {/* <div className="flex flex-col justify-start items-start px-4 pr-4">
                    <FieldLabel label={"More Options"} />

                    <ParameterItemLine
                      label={"Data Validation"}
                      input={
                        <SettingItemSelect
                          label="Schema"
                          triggerClassName="text-end !text-xs max-w-[6.8rem] !h-[1.6rem]"
                          data={appLanguages}
                          selectedItemValue={""}
                          onSelect={(langValue) => {}}
                        />
                      }
                    />
                    <ParameterItemLine
                      label={"Duplicate Detection"}
                      input={
                        <Badge variant="secondary" className="cursor-pointer">
                          False
                        </Badge>
                      }
                    />

                    <ParameterItemLine
                      label={"Data Filter"}
                      input={
                        <Input
                          placeholder="Add Filters"
                          type="text"
                          className="text-start !text-xs max-w-[6.8rem] !h-[1.6rem] placeholder:font-semibold placeholder:text-muted-foreground/70"
                          onChange={(e) => {}}
                        />
                      }
                    />
                    <ParameterItemLine
                      label={"Data Mapping"}
                      input={
                        <Input
                          placeholder="Connect fields"
                          type="text"
                          className="text-start !text-xs max-w-[6.8rem] !h-[1.6rem] placeholder:font-semibold placeholder:text-muted-foreground/70"
                          onChange={(e) => {}}
                        />
                      }
                    />
                    <ParameterItemLine
                      label={"Assign to a variable:"}
                      input={
                        <Input
                          placeholder="Variable name"
                          type="text"
                          className="text-end !text-xs max-w-[6.8rem] !h-[1.6rem] placeholder:font-semibold placeholder:text-muted-foreground/70"
                          onChange={(e) => {}}
                        />
                      }
                    />
                  </div> */}
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

const FieldLabel = ({ label }: { label: string }) => {
  return (
    <span className="text-sm font-semibold mb-2 text-neutral-700 line-clamp-1">
      {label}
    </span>
  );
};

const ParameterItemLine = ({
  label,
  inputType,
  onValueChange,
  placeHolder,
  valuesToPickFrom,
  className,
  inputClassName,
  labelClassName,
  operationName,
}: {
  label: string;
  placeHolder?: string;
  operationName?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  inputType: vsAnyPrimitives["type"] | vsAnyRawTypes["type"];
  onValueChange: (value: any) => void;
  valuesToPickFrom?: number[] | string[] | boolean[];
}) => {
  return (
    <div
      className={cn(
        "flex flex-col w-full gap-1 justify-between items-start",
        className
      )}
    >
      <div
        className={cn(
          "px-1 w-full text-start text-xs line-clamp-1 font-semibold text-neutral-500",
          labelClassName
        )}
      >
        {label}
      </div>

      <div
        className={cn(
          "flex flex-1 w-full justify-start items-center text-xs text-neutral-700",
          inputClassName
        )}
      >
        <ParamInput
          paramName={label}
          inputType={inputType}
          onChange={onValueChange}
          placeHolder={placeHolder}
          valuesToPickFrom={valuesToPickFrom}
          operationName={operationName}
        />
      </div>
    </div>
  );
};
