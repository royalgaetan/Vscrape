import { useWorkflowEditorStore } from "@/stores/workflowStore";
import React from "react";
import { OperationItem } from "@/lib/workflow_editor/classes/operation_item";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronsDownIcon, Coins } from "lucide-react";
import { formatLargeNumber } from "@/lib/date_time_utils";
import { PossibleFieldBlockType as FieldBlockType } from "@/lib/workflow_editor/constants/workflow_form_fields_definition";
import AddFieldBlockButton from "./add_field_block_button";

const FormFieldsList = ({
  onAddField,
  onFieldSelect,
}: {
  onAddField: () => void;
  onFieldSelect: (fieldBlock: FieldBlockType) => void;
}) => {
  // Store:
  const currentNode = useWorkflowEditorStore((s) => s.currentNode);
  // End Store

  if (!currentNode) {
    return <div></div>;
  }

  return (
    // Here Blocks represents: Form Fields
    <div>
      <h5 className="text-base font-semibold text-[#333] line-clamp-1 mb-4">
        {currentNode.blocks.length} Field
        {currentNode.blocks.length > 1 && "s"}
      </h5>

      {currentNode.blocks.length === 0 ? (
        <div className="flex flex-col w-full">
          <AddFieldBlockButton onClick={onAddField} />
        </div>
      ) : (
        <div className="flex flex-col w-full group/formFieldsList">
          {currentNode.blocks.map((block, idx) => {
            const fieldBlock = block as FieldBlockType;
            const isLast = currentNode.blocks.length === idx + 1;
            return (
              <div
                key={`${currentNode.sectionName}_${fieldBlock.fieldName}_${idx}`}
                className="flex flex-col w-full items-center"
              >
                <Button
                  variant={"outline"}
                  className={cn(
                    "group/fieldBlockButton relative flex flex-1 h-8 !py-[0.3rem] !w-full px-2 border border-border/50 transition-all duration-300 justify-center items-center gap-1 hover:bg-white bg-white cursor-pointer rounded-sm"
                  )}
                  onClick={() => onFieldSelect(fieldBlock)}
                >
                  <div className="w-full line-clamp-1 group-hover/fieldBlockButton:text-neutral-500/80 text-neutral-500">
                    {fieldBlock.fieldName}
                  </div>
                </Button>

                {isLast && (
                  <div className="group-hover/workflowPanel:flex hidden flex-col w-full my-2 mt-5 items-center gap-2">
                    {/* Add another Field Block */}
                    <AddFieldBlockButton onClick={onAddField} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FormFieldsList;
