import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { delay } from "@/lib/numbers_utils";
import { VsNode } from "@/lib/workflow_editor/classes/node";
import SimpleTooltip from "@/components/global/simple_tooltip";
import { Button } from "@/components/ui/button";
import { Check, Loader2, LucideIcon, Save, Trash2, X } from "lucide-react";
import PanelHeader from "../panel_header";
import CronEditorCard from "./cron_editor_card";
import {
  CronBlock,
  getNewCronBlock,
} from "@/lib/workflow_editor/classes/cron_block";
import FieldLabel from "../field_label";
import DateInput from "../../inputs/date_input";
import { appTimezones } from "@/lib/constants";
import MultiSelect from "@/components/global/multi_select";
import { Label } from "@/components/ui/label";
import { cronPresets } from "@/lib/date_time_utils";
import { isValidCron } from "cron-validator";
import { toast } from "sonner";

const SingleCronEditorPanel = ({
  nodeOrigin,
  cronBlockOrigin,
  onBack,
  onSave,
  onDelete,
  displayBackButton,
}: {
  nodeOrigin: VsNode;
  cronBlockOrigin?: CronBlock;
  onBack?: () => void;
  onSave: (block?: CronBlock) => void;
  onDelete: (fieldBlockId: string) => void;
  displayBackButton?: boolean;
}) => {
  const [currentBlock, setCurrentBlock] = useState<CronBlock | undefined>(
    cronBlockOrigin ?? getNewCronBlock()
  );
  const [isLoadingBlock, setIsLoadingBlock] = useState(false);

  // State Values:
  const [currentBlockCronExp, setCurrentBlockCronExp] = useState("");
  const selectedPreset = cronPresets.find(
    (p) => p.value === currentBlockCronExp
  );

  const [configStartDate, setConfigStartDate] = useState<Date | undefined>();
  const [configEndDate, setConfigEndDate] = useState<Date | undefined>();
  const [configTimezone, setConfigTimezone] = useState<string>();

  const [isSavingFormFieldBlock, setIsSavingFormFieldBlock] = useState(false);
  const [SavingFormFieldBlockResultIcon, setSavingFormFieldBlockResultIcon] =
    useState<LucideIcon | undefined>(undefined);

  const saveCronBlock = async () => {
    setSavingFormFieldBlockResultIcon(undefined);
    setIsSavingFormFieldBlock(true);
    await delay(400);

    try {
      // Cron Validation
      if (!currentBlock) throw new Error("No Cron found");
      if (!isValidCron(currentBlock.cronExp, { allowSevenAsSunday: true }))
        throw new Error("Invalid Cron");

      setIsSavingFormFieldBlock(false);
      setSavingFormFieldBlockResultIcon(Check);
      await delay(150);
      setSavingFormFieldBlockResultIcon(undefined);

      onSave(currentBlock);
    } catch (e) {
      toast.error("Invalid Cron! Try again.", {
        position: "bottom-center",
        richColors: true,
      });
      console.log("Err", e);
      setIsSavingFormFieldBlock(false);
      setSavingFormFieldBlockResultIcon(X);
      await delay(1000);
      setSavingFormFieldBlockResultIcon(undefined);
      return;
    }
  };

  useEffect(() => {
    if (!currentBlock) return;
    const sub = currentBlock.stream$().subscribe((newData) => {
      setCurrentBlockCronExp((newData as CronBlock).cronExp);
      setConfigStartDate((newData as CronBlock).configStartDate);
      setConfigEndDate((newData as CronBlock).configEndDate);
      setConfigTimezone((newData as CronBlock).configTimezone);
    });
    return () => sub.unsubscribe();
  }, [currentBlock]);

  return (
    <div className="flex flex-col w-full max-h-full relative">
      <div className="flex flex-col w-full max-h-full overflow-x-clip overflow-y-scroll scrollbar-hide">
        {/* Header */}
        <div className="px-4 w-full">
          <PanelHeader
            nodeOrigin={nodeOrigin}
            displayBackButton={displayBackButton}
            onBack={() => onBack && onBack()}
          />
        </div>

        <Separator className="my-2" />
        {/* CronBlock Params */}

        {/* Edit Cron Block: Presets */}
        <div className="ml-2">
          <FieldLabel label="Presets" />
        </div>

        <div className="flex flex-1 w-full px-4 pr-4">
          {/* Preset Picker: e.g., Daily @9AM, Every 5 min */}

          <MultiSelect
            triggerClassName="h-[1.9rem] mb-1"
            popoverAlignment="center"
            selectionMode={"single"}
            popoverClassName="max-h-60 min-h-fit mr-5"
            label={selectedPreset ? selectedPreset.label : "Select a preset..."}
            itemTooltipClassname="w-52"
            data={{
              "": cronPresets.map((preset) => ({
                label: preset.label,
                value: preset.value,
              })),
            }}
            selectedValues={[""]}
            handleSelect={(presetSelected) => {
              setIsLoadingBlock(true);
              setCurrentBlock(undefined);
              setTimeout(() => {
                setCurrentBlock(getNewCronBlock(presetSelected));
                setIsLoadingBlock(false);
              }, 300);
            }}
          />
        </div>

        <Separator className="mt-2" />

        {isLoadingBlock && (
          <div className="flex justify-center items-center h-44">
            <Loader2 className="animate-spin text-neutral-500" />
          </div>
        )}
        {currentBlock && !isLoadingBlock && (
          <div className="flex flex-col justify-start items-start">
            {/* Edit Cron Block: Config List */}

            {/* Config: Minute */}
            <CronEditorCard
              cronSection="Minute"
              initialValue={currentBlock.configMinute}
              onChange={(value) => {
                currentBlock.configMinute = value;
              }}
            />

            {/* Config: Hour */}
            <CronEditorCard
              cronSection="Hour"
              initialValue={currentBlock.configHour}
              onChange={(value) => {
                currentBlock.configHour = value;
              }}
            />

            <Separator className="" />

            {/* Config: Day Of Week */}
            <CronEditorCard
              cronSection="Day of Week"
              initialValue={currentBlock.configDayOfWeek}
              onChange={(value) => {
                currentBlock.configDayOfWeek = value;
              }}
            />

            {/* Config: Day Of Month */}
            <CronEditorCard
              cronSection="Day of Month"
              initialValue={currentBlock.configDayOfMonth}
              onChange={(value) => {
                currentBlock.configDayOfMonth = value;
              }}
            />

            {/* Config: Month */}
            <CronEditorCard
              cronSection="Month"
              initialValue={currentBlock.configMonth}
              onChange={(value) => {
                currentBlock.configMonth = value;
              }}
            />

            <Separator className="my-2" />

            {/* Edit Cron Block: Extra Configs */}
            <div className="ml-2 mb-2 mt-2">
              <FieldLabel label="Extra" />
            </div>
            <div className="flex flex-col gap-3 w-full px-4 pr-4">
              {/* Row */}
              <div className="flex flex-1 gap-3 mb-3">
                {/* Config: Start Date */}
                <DateInput
                  hasError={false}
                  initialValue={configStartDate}
                  disabledDnd
                  placeholder={"Start At"}
                  isDisabled={false}
                  onSave={(value) => {
                    currentBlock.configStartDate = value;
                  }}
                />

                {/* Config: End Date */}
                <DateInput
                  hasError={false}
                  initialValue={configEndDate}
                  disabledDnd
                  placeholder={"End At"}
                  isDisabled={false}
                  onSave={(value) => {
                    currentBlock.configEndDate = value;
                  }}
                />
              </div>

              {/* Config: Timezone */}
              <div className="flex flex-col w-full">
                {/* Label */}
                <Label className="mb-2 text-xs text-neutral-500">
                  Timezone
                </Label>
                <div className="!flex !flex-1 !w-full">
                  <MultiSelect
                    triggerClassName="h-[1.9rem] mb-1"
                    popoverAlignment="center"
                    selectionMode={"single"}
                    popoverClassName="max-h-60 min-h-fit mr-5"
                    label={
                      configTimezone
                        ? configTimezone.replaceAll(/_/g, " ")
                        : "Select..."
                    }
                    itemTooltipClassname="w-52"
                    data={appTimezones}
                    selectedValues={
                      configTimezone ? [configTimezone] : undefined
                    }
                    handleSelect={(value) => {
                      if (currentBlock.configTimezone === value) {
                        currentBlock.configTimezone = undefined;
                      } else {
                        currentBlock.configTimezone = value;
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Spacer */}
            <div className="h-20"></div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Bar */}

      <div className="flex flex-col w-[var(--workflowPanelWidth)] !h-10 bg-white z-10 fixed bottom-[7vh]">
        {/* Action Buttons: Delete | Save Cron */}
        <div className="flex flex-1 justify-end items-center py-1 px-3 border-t">
          {/* Delete Button: only if we're in [UPDATE Mode] */}
          {currentBlock && (
            <div className="flex flex-1 justify-start">
              <SimpleTooltip tooltipText={"Delete Field"}>
                <Button
                  type="button"
                  variant={"ghost"}
                  size={"sm"}
                  className="w-fit"
                  onClick={() => {
                    // Delete Field
                    onDelete(currentBlock.id);
                  }}
                >
                  <Trash2 />
                </Button>
              </SimpleTooltip>
            </div>
          )}

          <Button
            variant={"default"}
            disabled={isSavingFormFieldBlock}
            className="rounded-2xl h-7 text-xs gap-1 px-3 duration-150"
            onClick={() => saveCronBlock()}
            // disabled={!onboardingForm.formState.isValid}
          >
            {isSavingFormFieldBlock &&
              SavingFormFieldBlockResultIcon === undefined && (
                <Loader2 className="animate-spin stroke-white" />
              )}
            {SavingFormFieldBlockResultIcon && !isSavingFormFieldBlock && (
              <SavingFormFieldBlockResultIcon className="stroke-white" />
            )}

            {!isSavingFormFieldBlock &&
              SavingFormFieldBlockResultIcon === undefined && (
                <Save className="stroke-white" />
              )}
            <span className="">Save Cron</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleCronEditorPanel;
