import React, { useEffect, useState } from "react";
import {
  Separator,
  MultiSelect,
  delay,
  SimpleTooltip,
  Button,
  cronPresets,
  appTimezones,
  Label,
} from "@vscrape/ui";
import { VsNode, CronBlock, getNewCronBlock } from "@vscrape/engine/src";
import { Check, Loader2, LucideIcon, Save, Trash2, X } from "lucide-react";
import PanelHeader from "../panel_header";
import CronEditorCard, { isValidCronSection } from "./cron_editor_card";
import FieldLabel from "../field_label";
import DateInput from "../../inputs/date_input";
import { isValidCron } from "cron-validator";
import { toast } from "sonner";
import { cloneDeep } from "lodash";
import {
  getInvalidInputs,
  insertOrRemoveIdsFromCurrentEditorErrors,
} from "../../../lib/utils";

const SingleCronEditorPanel = ({
  initialNode,
  initialCronBlock,
  onBack,
  onSave,
  onDelete,
  displayBackButton,
}: {
  initialNode: VsNode;
  initialCronBlock?: CronBlock;
  onBack?: () => void;
  onSave: (block?: CronBlock) => void;
  onDelete: () => void;
  displayBackButton?: boolean;
}) => {
  const [currentBlock, setCurrentBlock] = useState<CronBlock | undefined>(
    cloneDeep(initialCronBlock) ?? getNewCronBlock()
  );
  const [isLoadingBlock, setIsLoadingBlock] = useState(false);
  const [errorFields, setErrorFields] = useState<string[]>([]);

  // State Values:
  const [configMinute, setConfigMinute] = useState(currentBlock?.configMinute);
  const [configHour, setConfigHour] = useState(currentBlock?.configHour);
  const [configDayOfMonth, setConfigDayOfMonth] = useState(
    currentBlock?.configDayOfMonth
  );
  const [configMonth, setConfigMonth] = useState(currentBlock?.configMonth);
  const [configDayOfWeek, setConfigDayOfWeek] = useState(
    currentBlock?.configDayOfWeek
  );

  const [configStartDate, setConfigStartDate] = useState(
    currentBlock?.configStartDate
  );
  const [configEndDate, setConfigEndDate] = useState(
    currentBlock?.configEndDate
  );
  const [configTimezone, setConfigTimezone] = useState(
    currentBlock?.configTimezone
  );

  // Cron Expression + Presets
  const localCronExpression = `${configMinute} ${configHour} ${configDayOfMonth} ${configMonth} ${configDayOfWeek}`;

  const selectedPreset = cronPresets.find(
    (p) => p.value === localCronExpression
  );

  const [isSavingBlock, setIsSavingBlock] = useState(false);
  const [SavingBlockResultIcon, setSavingBlockResultIcon] = useState<
    LucideIcon | undefined
  >(undefined);

  const saveCronBlock = async () => {
    setSavingBlockResultIcon(undefined);
    setIsSavingBlock(true);
    await delay(400);

    try {
      if (!currentBlock) throw new Error("Can't save this Cron! Try again.");

      // Save Entered Values to Original Block
      if (configMinute) currentBlock.configMinute = configMinute;
      if (configHour) currentBlock.configHour = configHour;
      if (configDayOfWeek) currentBlock.configDayOfWeek = configDayOfWeek;
      if (configDayOfMonth) currentBlock.configDayOfMonth = configDayOfMonth;
      if (configMonth) currentBlock.configMonth = configMonth;

      if (configStartDate) currentBlock.configStartDate = configStartDate;
      if (configEndDate) currentBlock.configEndDate = configEndDate;
      if (configTimezone) currentBlock.configTimezone = configTimezone;

      // Error Checking
      errorChecker(currentBlock);

      // Cron Validation
      if (!isValidCron(currentBlock.cronExp, { allowSevenAsSunday: true }))
        throw new Error("Invalid Cron!");

      setIsSavingBlock(false);
      setSavingBlockResultIcon(Check);
      await delay(150);
      setSavingBlockResultIcon(undefined);

      onSave(currentBlock);
    } catch (e) {
      toast.error("Invalid Cron! Try again.", {
        position: "bottom-center",
        richColors: true,
      });
      console.log("Err", e);
      setIsSavingBlock(false);
      setSavingBlockResultIcon(X);
      await delay(1000);
      setSavingBlockResultIcon(undefined);
      return;
    }
  };

  const errorChecker = (currentBlock: CronBlock) => {
    // Get Invalid Inputs
    const errFields = getInvalidInputs({
      from: currentBlock,
      nodeId: currentBlock.id,
    });

    if (errFields.length > 0) {
      // Add the current "Cron Id" + "Parent Node Id" among CurrentEditor errors list
      insertOrRemoveIdsFromCurrentEditorErrors({
        fromId: currentBlock.id,
        initialNodeId: initialNode.id,
        action: "add",
      });

      setErrorFields(errFields);
      console.log("errFields", errFields);
      throw new Error("Invalid Cron!");
    } else {
      // Remove the current "Cron Id" + "Parent Node Id" among CurrentEditor errors list
      insertOrRemoveIdsFromCurrentEditorErrors({
        fromId: currentBlock.id,
        initialNodeId: initialNode.id,
        action: "remove",
      });
    }
  };

  useEffect(() => {
    // Run Errors Checking if on Update Mode
    if (initialCronBlock) {
      try {
        errorChecker(initialCronBlock);
      } catch (e) {
        console.log("Err", e);
      }
    }
  }, []);

  return (
    <div className="flex flex-col w-full max-h-full relative">
      <div className="flex flex-col w-full max-h-full overflow-x-clip overflow-y-scroll scrollbar-hide">
        {/* Header */}
        <div className="px-4 w-full">
          <PanelHeader
            nodeOrigin={initialNode}
            displayBackButton={displayBackButton}
            onBack={() => {
              if (onBack) {
                if (currentBlock) {
                  insertOrRemoveIdsFromCurrentEditorErrors({
                    fromId: currentBlock.id,
                    initialNodeId: initialNode.id,
                    action: "remove",
                  });
                }
                onBack();
              }
            }}
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

              // Flush Values 1st
              setConfigMinute(undefined);
              setConfigHour(undefined);
              setConfigDayOfMonth(undefined);
              setConfigMonth(undefined);
              setConfigDayOfWeek(undefined);
              setErrorFields([]);

              setTimeout(() => {
                const newBlock = getNewCronBlock(presetSelected);
                // Updating Values
                setConfigMinute(newBlock.configMinute);
                setConfigHour(newBlock.configHour);
                setConfigDayOfMonth(newBlock.configDayOfMonth);
                setConfigMonth(newBlock.configMonth);
                setConfigDayOfWeek(newBlock.configDayOfWeek);

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
              mainValuesHaveError={errorFields.includes("configMinuteMain")}
              stepValueHasError={errorFields.includes("configMinuteStep")}
              cleanMainValuesErrors={() =>
                setErrorFields((prev) =>
                  prev.filter((f) => f !== "configMinuteMain")
                )
              }
              cleanStepValueError={() =>
                setErrorFields((prev) =>
                  prev.filter((f) => f !== "configMinuteStep")
                )
              }
              initialValue={configMinute}
              onChange={(value) => {
                setConfigMinute(value);
              }}
            />

            {/* Config: Hour */}
            <CronEditorCard
              cronSection="Hour"
              mainValuesHaveError={errorFields.includes("configHourMain")}
              stepValueHasError={errorFields.includes("configHourStep")}
              cleanMainValuesErrors={() =>
                setErrorFields((prev) =>
                  prev.filter((f) => f !== "configHourMain")
                )
              }
              cleanStepValueError={() =>
                setErrorFields((prev) =>
                  prev.filter((f) => f !== "configHourStep")
                )
              }
              initialValue={configHour}
              onChange={(value) => {
                setConfigHour(value);
              }}
            />

            <Separator className="" />

            {/* Config: Day Of Week */}
            <CronEditorCard
              cronSection="Day of Week"
              initialValue={configDayOfWeek}
              mainValuesHaveError={errorFields.includes("configDayOfWeekMain")}
              stepValueHasError={errorFields.includes("configDayOfWeekStep")}
              cleanMainValuesErrors={() =>
                setErrorFields((prev) =>
                  prev.filter((f) => f !== "configDayOfWeekMain")
                )
              }
              cleanStepValueError={() =>
                setErrorFields((prev) =>
                  prev.filter((f) => f !== "configDayOfWeekStep")
                )
              }
              onChange={(value) => {
                setConfigDayOfWeek(value);
              }}
            />

            {/* Config: Day Of Month */}
            <CronEditorCard
              cronSection="Day of Month"
              initialValue={configDayOfMonth}
              mainValuesHaveError={errorFields.includes("configDayOfMonthMain")}
              stepValueHasError={errorFields.includes("configDayOfMonthStep")}
              cleanMainValuesErrors={() =>
                setErrorFields((prev) =>
                  prev.filter((f) => f !== "configDayOfMonthMain")
                )
              }
              cleanStepValueError={() =>
                setErrorFields((prev) =>
                  prev.filter((f) => f !== "configDayOfMonthStep")
                )
              }
              onChange={(value) => {
                setConfigDayOfMonth(value);
              }}
            />

            {/* Config: Month */}
            <CronEditorCard
              cronSection="Month"
              initialValue={configMonth}
              mainValuesHaveError={errorFields.includes("configMonthMain")}
              stepValueHasError={errorFields.includes("configMonthStep")}
              cleanMainValuesErrors={() =>
                setErrorFields((prev) =>
                  prev.filter((f) => f !== "configMonthMain")
                )
              }
              cleanStepValueError={() =>
                setErrorFields((prev) =>
                  prev.filter((f) => f !== "configMonthStep")
                )
              }
              onChange={(value) => {
                setConfigMonth(value);
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
                    setConfigStartDate(value);
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
                    setConfigEndDate(value);
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
                        setConfigTimezone(undefined);
                      } else {
                        setConfigTimezone(value);
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
                    if (currentBlock) {
                      insertOrRemoveIdsFromCurrentEditorErrors({
                        fromId: currentBlock.id,
                        initialNodeId: initialNode.id,
                        action: "remove",
                      });
                    }

                    // Delete Field
                    onDelete();
                  }}
                >
                  <Trash2 />
                </Button>
              </SimpleTooltip>
            </div>
          )}

          <Button
            variant={"default"}
            disabled={isSavingBlock}
            className="rounded-2xl h-7 text-xs gap-1 px-3 duration-150"
            onClick={() => saveCronBlock()}
            // disabled={!onboardingForm.formState.isValid}
          >
            {isSavingBlock && SavingBlockResultIcon === undefined && (
              <Loader2 className="animate-spin stroke-white" />
            )}
            {SavingBlockResultIcon && !isSavingBlock && (
              <SavingBlockResultIcon className="stroke-white" />
            )}

            {!isSavingBlock && SavingBlockResultIcon === undefined && (
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
