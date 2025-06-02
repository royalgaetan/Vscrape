import { useWorkflowEditorStore } from "@/stores/workflowStore";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, PenLineIcon, Trash2 } from "lucide-react";
import {
  PossibleFieldBlockType as FieldBlockType,
  FormFieldFileUpload,
  FormFieldTextInput,
} from "@/lib/workflow_editor/constants/workflow_form_fields_definition";
import AddFieldBlockButton from "./add_field_block_button";
import FormFieldBlockPreview from "./form_field_block_preview";
import SimpleTooltip from "@/components/global/simple_tooltip";
import { MoveBlockDirection } from "@/lib/workflow_editor/classes/node";
import { cn } from "@/lib/utils";

const FormFieldsList = ({
  onAddNewField,
  onFieldEdit,
  onFieldDelete,
  onFieldMove,
}: {
  onAddNewField: () => void;
  onFieldEdit: (fieldBlock: FieldBlockType) => void;
  onFieldDelete: (fieldBlockId: string) => void;
  onFieldMove: (fieldBlockId: string, direction: MoveBlockDirection) => void;
}) => {
  // Store:
  const currentNode = useWorkflowEditorStore((s) => s.currentNode);
  // End Store
  const [nodeBlocks, setNodeBlocks] = useState(
    currentNode ? (currentNode.blocks as FieldBlockType[]) : undefined
  );

  useEffect(() => {
    if (!currentNode) return;
    const sub = currentNode.stream$().subscribe((newData) => {
      setNodeBlocks(newData.blocks as FieldBlockType[]);
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
        {Array.isArray(nodeBlocks) ? nodeBlocks.length : 0} Field
        {Array.isArray(nodeBlocks) && nodeBlocks.length > 1 && "s"}
      </p>

      <div className="flex flex-col w-full mb-20 group/formFieldsList border border-border overflow-clip rounded-md bg-neutral-100/20">
        <h5 className="text-2xl font-semibold text-neutral-300 line-clamp-1 mb-0 px-3 py-3">
          Form
        </h5>

        {Array.isArray(nodeBlocks) && nodeBlocks.length > 0 && (
          <div className="flex flex-col">
            {nodeBlocks.map((fieldBlock: FieldBlockType, idx) => {
              console.log("LIST n°", idx, fieldBlock);
              return (
                <div
                  key={fieldBlock.id}
                  className="group/fieldItem flex flex-col w-full mb-1 px-3 py-1 hover:bg-neutral-200/20 transition-all duration-200"
                >
                  <FormFieldBlockPreview
                    key={fieldBlock.id}
                    fieldName={fieldBlock.fieldName}
                    fieldLabel={fieldBlock.fieldLabel}
                    fieldValue={fieldBlock.fieldValue}
                    fieldDescription={fieldBlock.fieldDescription}
                    fieldPlaceholder={fieldBlock.fieldPlaceholder}
                    fieldDefaultPlaceholder={fieldBlock.fieldDefaultPlaceholder}
                    fieldDefaultDescription={fieldBlock.fieldDefaultDescription}
                    fieldValueToPickFrom={fieldBlock.fieldValueToPickFrom}
                    fieldIsOptional={fieldBlock.isOptional}
                    fieldType={fieldBlock.fieldType}
                    fieldIsMultiline={
                      fieldBlock instanceof FormFieldTextInput &&
                      fieldBlock.isMultiline
                    }
                    fieldAcceptedExtensions={
                      fieldBlock instanceof FormFieldFileUpload
                        ? fieldBlock.acceptedExtensions
                        : []
                    }
                  />
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
                            onFieldEdit(fieldBlock);
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
                          onClick={() => onFieldDelete(fieldBlock.id)}
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
                          onClick={() => onFieldMove(fieldBlock.id, "Up")}
                        >
                          <ChevronUp />
                        </Button>
                      </SimpleTooltip>

                      {/* Move Down */}
                      <SimpleTooltip tooltipText="Move Field Down">
                        <Button
                          disabled={
                            Array.isArray(currentNode.blocks) &&
                            idx === currentNode.blocks.length - 1
                          }
                          variant={"ghost"}
                          className={cn(
                            "!w-5 !h-5 p-0 flex items-center justify-center hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer rounded-sm transition-all duration-300"
                          )}
                          onClick={() => onFieldMove(fieldBlock.id, "Down")}
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
          <AddFieldBlockButton onClick={onAddNewField} />
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
