import React, { useRef, useState } from "react";
import MultiSelect from "@/components/global/multi_select";
import { Separator } from "@/components/ui/separator";
import { delay } from "@/lib/numbers_utils";
import { NodeBlockType, useWorkflowEditorStore } from "@/stores/workflowStore";
import FieldLabel from "../field_label";
import PanelHeader from "../panel_header";
import { Check, Hammer, Hash, LucideIcon, PenLine, X } from "lucide-react";
import { VsNode } from "@/lib/workflow_editor/classes/node";
import {
  PossibleFieldBlockType as FieldBlockType,
  getFormFieldBlockByName,
  workflowFormFieldBlocks,
} from "@/lib/workflow_editor/constants/workflow_form_fields_definition";
import FormFieldBlockCard from "./form_field_block_card";

const SingleFormFieldPanel = ({
  nodeOrigin,
  fieldBlockOrigin,
  onBack,
  onSave,
  onDelete,
  displayBackButton,
}: {
  nodeOrigin: VsNode;
  fieldBlockOrigin?: FieldBlockType;
  onBack?: () => void;
  onSave: (block?: NodeBlockType) => void;
  onDelete: (FormFieldBlockId: string) => void;
  displayBackButton?: boolean;
}) => {
  const fieldId = useRef<string>(fieldBlockOrigin?.id ?? crypto.randomUUID());

  // Store
  const currentNode = useWorkflowEditorStore((s) => s.currentNode);
  const currentBlock = useWorkflowEditorStore(
    (s) => s.currentBlock
  ) as FieldBlockType;
  const setCurrentBlock = useWorkflowEditorStore((s) => s.setCurrentBlock);
  // End Store

  const [isSavingFormFieldBlock, setIsSavingFormFieldBlock] = useState(false);
  const [SavingFormFieldBlockResultIcon, setSavingFormFieldBlockResultIcon] =
    useState<LucideIcon | undefined>(undefined);

  const saveFormFieldBlock = async () => {
    setSavingFormFieldBlockResultIcon(undefined);
    setIsSavingFormFieldBlock(true);
    await delay(400);

    if (!currentNode || !currentBlock) {
      setIsSavingFormFieldBlock(false);
      setSavingFormFieldBlockResultIcon(X);
      await delay(1000);
      setSavingFormFieldBlockResultIcon(undefined);
      return;
    }
    try {
      setIsSavingFormFieldBlock(false);
      setSavingFormFieldBlockResultIcon(Check);
      await delay(150);
      setSavingFormFieldBlockResultIcon(undefined);
      onSave(currentBlock);
    } catch (e) {
      console.log("Err", e);
      setIsSavingFormFieldBlock(false);
      setSavingFormFieldBlockResultIcon(X);
      await delay(1000);
      setSavingFormFieldBlockResultIcon(undefined);
      return;
    }
  };

  // if (!(currentBlock instanceof FieldBlockType)) return;

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
            />
          </div>

          {/* Content */}
          <div className="mt-4 pb-6 space-y-4">
            {/* FormFieldBlock Selector */}
            <div className="flex flex-col justify-start items-start px-4 pr-4">
              <FieldLabel
                label={
                  fieldBlockOrigin
                    ? "Change Form Field Type"
                    : "Select a Form Field"
                }
                Icon={PenLine}
              />

              <MultiSelect
                isTriggerDisabled={workflowFormFieldBlocks.length < 1}
                triggerClassName="h-9 w-[15.7rem] flex flex-1 mb-1"
                popoverAlignment="center"
                selectionMode="single"
                popoverClassName="max-h-60 min-h-fit w-[15.7rem]"
                label={currentBlock?.fieldName ?? "Pick a Form Field"}
                itemTooltipClassname="w-52"
                data={{
                  "": workflowFormFieldBlocks.map((fieldBlock) => ({
                    label: fieldBlock.fieldName,
                    value: fieldBlock.fieldName,
                    icon: Hash,
                    iconClassName: "stroke-neutral-400 fill-transparent",
                    tooltipContent: fieldBlock.fieldTooltipContent,
                    tooltipAlign: "end",
                    tooltipSide: "left",
                  })),
                }}
                selectedValues={
                  currentBlock?.fieldName ? [currentBlock.fieldName] : []
                }
                handleSelect={(fieldNameSelected) => {
                  if (
                    currentBlock &&
                    fieldNameSelected === currentBlock.fieldName
                  ) {
                    setCurrentBlock(undefined);
                  } else {
                    const newFormFieldBlock =
                      getFormFieldBlockByName(fieldNameSelected);
                    if (!newFormFieldBlock) return;
                    setCurrentBlock(newFormFieldBlock);
                  }
                }}
              />
            </div>
            <Separator className="my-2" />

            {/* Edit Field Block: Parameters List */}
            <div className="flex flex-col justify-start items-start">
              <div className="flex flex-1 w-full px-4 pr-4">
                {JSON.stringify(currentBlock?.fieldName)}
                <FormFieldBlockCard />
              </div>
              <Separator className="my-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFormFieldPanel;
