import { useWorkflowEditorStore } from "@/stores/workflowStore";
import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  generateNewVariableAssignationValues,
  SetVariablesBlock,
  SingleVariableAssignation,
} from "@/lib/workflow_editor/classes/setVariables_block";
import SetVariablesBlockCard from "./setVariables_block_card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { filter } from "lodash";
import { previousInputData } from "@/lib/workflow_editor/constants/w_constants";
import SimpleTooltip from "@/components/global/simple_tooltip";
import { extractTextFromHTML, toStringSafe } from "@/lib/string_utils";

const SetVariablesBlockList = ({
  onSave,
}: {
  onSave: (setVariablesBlock: SetVariablesBlock | undefined) => void;
}) => {
  // Store:
  const currentNode = useWorkflowEditorStore((s) => s.currentNode);
  // End Store
  const [variableAssignations, setVariableAssignations] = useState(
    currentNode
      ? (currentNode.blocks as SetVariablesBlock).variableAssignations
      : []
  );
  const [fieldCurrentlyEditted, setFieldCurrentlyEditted] = useState<number>();

  useEffect(() => {
    if (!currentNode) return;
    const sub = currentNode.stream$().subscribe((newData) => {
      setVariableAssignations(
        (newData.blocks as SetVariablesBlock).variableAssignations.filter(
          (v) =>
            v.varName !== "" ||
            extractTextFromHTML(toStringSafe(v.varValue)).length !== 0
        )
      );
    });

    return () => sub.unsubscribe();
  }, []);

  if (!currentNode) {
    return <div></div>;
  }

  return (
    // Here Blocks represents: The Whole Container (Array) of Variable Assignations
    <div className="flex flex-col max-h-full relative">
      <h5 className="text-base font-semibold text-[#333] line-clamp-1 mb-0">
        Add Variables
      </h5>
      <p className="text-xs text-muted-foreground line-clamp-1 mb-3">
        {variableAssignations.length} Assignation
        {variableAssignations.length > 1 && "s"}
      </p>

      <div className="flex flex-col w-full mb-20 group/variableAssignationsList">
        {variableAssignations.map((assignation, idx) => {
          return (
            <SetVariablesBlockCard
              key={`${assignation.varName}_${assignation.varValue}_${idx}`}
              initialAssignation={assignation}
              initialEditingValue={fieldCurrentlyEditted === idx}
              canEdit={fieldCurrentlyEditted === undefined}
              onEdit={() => {
                setFieldCurrentlyEditted(idx);
              }}
              onDelete={() => {
                if (!(currentNode.blocks instanceof SetVariablesBlock)) return;
                setFieldCurrentlyEditted(undefined);

                const updatedArr = [...variableAssignations];
                currentNode.blocks.variableAssignations = updatedArr.filter(
                  (v, i) => i !== idx
                );
                onSave(currentNode.blocks);
              }}
              onSave={(newAssign) => {
                if (!(currentNode.blocks instanceof SetVariablesBlock)) return;
                setFieldCurrentlyEditted(undefined);

                const updatedArr = [...variableAssignations];
                updatedArr[idx] = newAssign;
                currentNode.blocks.variableAssignations = updatedArr;
                onSave(currentNode.blocks);
              }}
            />
          );
        })}
        {/* Add another Field Block */}
        <div className="flex flex-col w-full mt-4 items-center gap-2">
          <Button
            disabled={typeof fieldCurrentlyEditted === "number"} // Disable if one or more fields are in Editing Mode
            variant={"ghost"}
            className={cn(
              "relative flex flex-1 h-8 border border-dashed !py-[0.3rem] !w-full px-2 transition-all duration-300 justify-center items-center gap-1 hover:bg-white bg-white cursor-pointer rounded-sm hover:text-neutral-500/60 text-neutral-500 active:scale-[0.97]"
            )}
            onClick={() => {
              // Add New Var Assignation
              if (!(currentNode.blocks instanceof SetVariablesBlock)) return;
              // Add New Assignation to currently edited fields
              setFieldCurrentlyEditted(variableAssignations.length);

              setVariableAssignations((prev) => [
                ...prev,
                generateNewVariableAssignationValues(),
              ]);
            }}
          >
            <Plus className="stroke-neutral-400 size-4 stroke-[1.8px]" /> Assign
            a new Variable
          </Button>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      {typeof fieldCurrentlyEditted === "number" && (
        <div className="flex flex-col -ml-4 w-[var(--workflowPanelWidth)] !h-10 bg-white z-10 fixed bottom-[7vh]">
          {/* Shared Outputs DnD Buttons */}
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
        </div>
      )}
    </div>
  );
};

export default SetVariablesBlockList;
