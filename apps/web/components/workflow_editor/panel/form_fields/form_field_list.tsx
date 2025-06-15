import { useWorkflowEditorStore } from "@/stores/workflowStore";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Pen,
  PenLineIcon,
  Trash2,
} from "lucide-react";
import AddFieldBlockButton from "./add_field_block_button";
import FormFieldBlockPreview from "./form_field_block_preview";
import SimpleTooltip from "@/components/global/simple_tooltip";
import { cn } from "@/lib/utils";
import {
  FormBlock,
  FormFieldItem,
} from "@/lib/workflow_editor/classes/form_field_block";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MoveBlockDirection } from "@/lib/workflow_editor/types/w_types";
import { cloneDeep } from "lodash";

const FormFieldsList = ({
  onAddNewFieldItem,
  onFieldItemEdit,
  onFieldItemDelete,
  onFieldItemMove,
}: {
  onAddNewFieldItem: () => void;
  onFieldItemEdit: (fieldItem: FormFieldItem) => void;
  onFieldItemDelete: (fieldItemId: string) => void;
  onFieldItemMove: (fieldItemId: string, direction: MoveBlockDirection) => void;
}) => {
  // Store:
  const currentNode = useWorkflowEditorStore((s) => s.currentNode);
  // End Store
  const [nodeFormBlock, setNodeFormBlock] = useState(
    currentNode ? (currentNode.block as FormBlock) : new FormBlock()
  );

  const [isEdittingFormTitle, setIsEdittingFormTitle] = useState(false);
  const [isEdittingFormDescription, setIsEdittingFormDescription] =
    useState(false);

  useEffect(() => {
    const sub = nodeFormBlock.stream$().subscribe((newData) => {
      setNodeFormBlock(cloneDeep(newData));
    });

    return () => sub.unsubscribe();
  }, []);

  if (!currentNode) {
    return <div></div>;
  }

  return (
    // Here Blocks represents: Form Fields
    <div>
      <h5 className="text-base font-semibold text-[#333] line-clamp-1 mb-0">
        Form Preview
      </h5>
      <p className="text-xs text-muted-foreground line-clamp-1 mb-3">
        {Array.isArray(nodeFormBlock.fields) ? nodeFormBlock.fields.length : 0}{" "}
        Field
        {Array.isArray(nodeFormBlock.fields) &&
          nodeFormBlock.fields.length > 1 &&
          "s"}
      </p>

      <div className="flex flex-col w-full mb-20 group/formFieldsList border border-border overflow-clip rounded-md bg-neutral-100/20">
        <div className="flex flex-col px-3 pt-2 pb-4 gap-1">
          {/* Form Title */}
          <FormMetaInfo
            placeholder="Add a form title..."
            initialValuePlaceholder="Add title"
            initialValue={nodeFormBlock.formName}
            isEditting={isEdittingFormTitle}
            onEdit={() => setIsEdittingFormTitle(true)}
            onSave={(val) => {
              nodeFormBlock.formName = val.length === 0 ? "Form" : val;
              currentNode.block = nodeFormBlock;
              setIsEdittingFormTitle(false);
            }}
          />
          {/* Form Description */}
          <FormMetaInfo
            placeholder="Add Form description..."
            initialValuePlaceholder="Add description"
            initialValue={nodeFormBlock.formDescription}
            isEditting={isEdittingFormDescription}
            onEdit={() => setIsEdittingFormDescription(true)}
            isTextarea
            onSave={(val) => {
              nodeFormBlock.formDescription = val.length === 0 ? "" : val;
              currentNode.block = nodeFormBlock;
              setIsEdittingFormDescription(false);
            }}
          />
        </div>

        {/* Form Fields */}
        {Array.isArray(nodeFormBlock.fields) &&
          nodeFormBlock.fields.length > 0 && (
            <div className="flex flex-col">
              {nodeFormBlock.fields.map((field: FormFieldItem, idx, arr) => {
                return (
                  <div
                    key={field.id}
                    className="group/fieldItem flex flex-col w-full mb-1 px-3 py-1 hover:bg-neutral-200/20 transition-all duration-200"
                  >
                    <FormFieldBlockPreview key={field.id} fieldItem={field} />
                    {/* Action Buttons: Edit | Delete | Move Up | Move Down */}
                    <div className="!h-5">
                      <div className="group-hover/fieldItem:flex hidden flex-1 gap-2 justify-start items-center pt-1">
                        {/* Edit */}
                        <SimpleTooltip tooltipText="Edit Field">
                          <Button
                            variant={"ghost"}
                            className={cn(
                              "!w-5 !h-5 p-0 flex items-center justify-center hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer rounded-sm transition-all duration-300"
                            )}
                            onClick={() => {
                              onFieldItemEdit(field);
                            }}
                          >
                            <PenLineIcon className="!size-3" />
                          </Button>
                        </SimpleTooltip>

                        {/* Delete */}
                        <SimpleTooltip tooltipText="Delete Field">
                          <Button
                            variant={"ghost"}
                            className={cn(
                              "!w-5 !h-5 p-0 flex items-center justify-center hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer rounded-sm transition-all duration-300"
                            )}
                            onClick={() => onFieldItemDelete(field.id)}
                          >
                            <Trash2 className="!size-3" />
                          </Button>
                        </SimpleTooltip>

                        {/* Move Up */}
                        <SimpleTooltip tooltipText="Move Field Up">
                          <Button
                            disabled={idx === 0}
                            variant={"ghost"}
                            className={cn(
                              "!w-5 !h-5 p-0 flex items-center justify-center hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer rounded-sm transition-all duration-300"
                            )}
                            onClick={() => onFieldItemMove(field.id, "Up")}
                          >
                            <ChevronUp />
                          </Button>
                        </SimpleTooltip>

                        {/* Move Down */}
                        <SimpleTooltip tooltipText="Move Field Down">
                          <Button
                            disabled={idx === arr.length - 1}
                            variant={"ghost"}
                            className={cn(
                              "!w-5 !h-5 p-0 flex items-center justify-center hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer rounded-sm transition-all duration-300"
                            )}
                            onClick={() => onFieldItemMove(field.id, "Down")}
                          >
                            <ChevronDown />
                          </Button>
                        </SimpleTooltip>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        {/* Add another Field Block */}
        <div className="flex flex-col w-full px-3 mb-3 items-center gap-2">
          <AddFieldBlockButton onClick={onAddNewFieldItem} />
        </div>

        {/* Fake Save button */}
        <div className="flex flex-1 mb-4 px-3">
          <Button
            type="button"
            size={"sm"}
            className="bg-black/90 text-white/90 w-full hover:bg-black/60 active:scale-[0.97]"
            onClick={() => {}}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormFieldsList;

const FormMetaInfo = ({
  isEditting,
  onEdit,
  onSave,
  initialValue,
  isTextarea,
  initialValuePlaceholder,
  placeholder,
}: {
  isEditting: boolean;
  onEdit: () => void;
  onSave: (val: string) => void;
  initialValue: string;
  placeholder: string;
  initialValuePlaceholder: string;
  isTextarea?: boolean;
}) => {
  const [internalValueState, setInternalValueState] = useState(initialValue);

  return (
    <>
      {isEditting ? (
        <div className="flex flex-1 w-full gap-1 items-start">
          {!isTextarea ? (
            <Input
              max={255}
              value={internalValueState}
              className="h-[1.73rem]"
              placeholder={placeholder}
              onChange={(e) => setInternalValueState(e.target.value)}
              type="text"
            />
          ) : (
            <Textarea
              maxLength={500}
              placeholder={placeholder}
              value={internalValueState}
              onChange={(e) => setInternalValueState(e.target.value)}
              className="resize-none scrollbar-hide"
            />
          )}

          <Button
            variant={"ghost"}
            className={cn(
              "flex w-8 transition-all duration-300 h-[1.73rem] justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm"
            )}
            onClick={() => {
              onSave(internalValueState);
            }}
          >
            <Check className="stroke-[2.2px] !size-4" />
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            "flex flex-1 gap-2 items-start justify-start text-2xl font-semibold text-neutral-400 not-italic group",
            isTextarea && "text-xs gap-1 text-neutral-400 italic h-7"
          )}
        >
          <button
            onClick={() => onEdit()}
            className={cn(
              "cursor-pointer line-clamp-2 text-left",
              isTextarea && "line-clamp-3"
            )}
          >
            {initialValue.length > 0 ? initialValue : initialValuePlaceholder}
          </button>

          <button onClick={() => onEdit()} className="">
            <Pen
              className={cn(
                "hidden group-hover:inline stroke-[1.8px]",
                isTextarea ? "!size-3" : "!size-5 mb-1"
              )}
            />
          </button>
        </div>
      )}
    </>
  );
};
