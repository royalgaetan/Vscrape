import SimpleTooltip from "@/components/global/simple_tooltip";
import { Button } from "@/components/ui/button";
import { useWorkflowEditor } from "@/hooks/useWorkflowEditor";
import { cn } from "@/lib/utils";
import { LockKeyholeOpen, X } from "lucide-react";
import React from "react";
import Image from "next/image";
import MultiSelect from "@/components/global/multi_select";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import SettingItemSelect from "@/app/(protected)/_settings/_components/settings_item_select";
import { appLanguages } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

const OptionbarEditor = () => {
  const { optionbarItem, isOptionbarOpen, toggleOptionbar } =
    useWorkflowEditor();

  const Icon = optionbarItem?.icon;

  return !isOptionbarOpen ? (
    <></>
  ) : (
    <div className="min-w-[18rem] max-w-[18rem] h-full  bg-white border-l flex flex-col items-start justify-start relative">
      <div className="flex flex-1 w-full max-h-full overflow-x-clip overflow-y-scroll scrollbar-hide">
        <div className="h-px w-full relative">
          <div className="min-w-[18rem] max-w-[18rem] px-4 bg-white border-r flex flex-col items-start justify-start relative">
            {/* Close Button */}
            <div className="flex w-full justify-end items-center bg-transparent z-10 translate-y-4 -mb-1 sticky top-0">
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
              <div className="flex flex-col w-full max-h-full overflow-y-scroll scrollbar-hide">
                {/* Header */}
                <div className="flex flex-col w-full">
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
                <div className="mt-6 pb-6 pr-1 space-y-4">
                  {/* Operations list */}
                  <div className="flex flex-col justify-start items-start">
                    <FieldLabel label={"Select an operation"} />
                    <MultiSelect
                      triggerClassName="h-9 w-[15.7rem] flex flex-1 mb-1"
                      popoverAlignment="center"
                      selectionMode="single"
                      popoverClassName="h-60 w-[17rem]"
                      label={"Pick an operation"}
                      data={{
                        "Data Manipulation": [],
                      }}
                      selectedValues={[]}
                      handleSelect={(operationSelected) => {}}
                    />
                  </div>
                  <Separator className="my-2" />

                  {/* Parameters */}
                  <div className="flex flex-col justify-start items-start">
                    <FieldLabel label={"Parameters"} />
                    <ParameterItemLine
                      label={"Cropping Width"}
                      input={
                        <Input
                          placeholder="0"
                          type="number"
                          className="text-end !text-xs max-w-[4rem] !h-[1.6rem] placeholder:font-semibold placeholder:text-muted-foreground/70"
                          onChange={(e) => {}}
                        />
                      }
                    />
                    <ParameterItemLine
                      label={"Cropping Height"}
                      input={
                        <Input
                          placeholder="0"
                          type="number"
                          className="text-end !text-xs max-w-[4rem] !h-[1.6rem] placeholder:font-semibold placeholder:text-muted-foreground/70"
                          onChange={(e) => {}}
                        />
                      }
                    />
                    <ParameterItemLine
                      label={"Lock W-H"}
                      input={
                        <Toggle
                          aria-label="Lock Width and Height"
                          className="size-7"
                        >
                          <LockKeyholeOpen className="" />
                        </Toggle>
                      }
                    />
                  </div>
                  <Separator className="my-2" />

                  {/* More Option */}
                  <div className="flex flex-col justify-start items-start">
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
                  </div>
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
  input,
}: {
  label: string;
  input: React.ReactNode;
}) => {
  return (
    <div className="flex flex-1 w-full gap-2 justify-between items-start">
      <div className="w-[7rem] h-7 pt-2 min-h-fit align-middle truncate mb-2">
        <div className="text-xs font-semibold text-neutral-500">{label}</div>
      </div>
      <div className="flex flex-1 justify-end items-center text-xs text-neutral-700">
        {input}
      </div>
    </div>
  );
};
