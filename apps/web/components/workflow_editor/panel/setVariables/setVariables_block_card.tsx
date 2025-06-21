import SimpleTooltip from "@/components/global/simple_tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SingleVariableAssignation } from "@/lib/workflow_editor/classes/setVariables_block";
import { Check, PenLineIcon, Trash2 } from "lucide-react";
import React, { useState } from "react";
import DnDTextInput from "../../inputs/dnd_text_input";
import { extractTextFromHTML, toStringSafe } from "@/lib/string_utils";
import {
  getInvalidInputs,
  insertOrRemoveIdsFromCurrentEditorErrors,
} from "@/lib/workflow_editor/utils/w_utils";

const SetVariablesBlockCard = ({
  initialAssignation,
  initialEditingValue,
  canEdit,
  onSave,
  onDelete,
  onEdit,
  nodeId,
  itemId,
}: {
  initialAssignation: SingleVariableAssignation;
  initialEditingValue?: boolean;
  canEdit: boolean;
  onSave(newAssign: SingleVariableAssignation): void;
  onDelete: () => void;
  onEdit: () => void;

  nodeId?: string;
  itemId?: string;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(
    initialEditingValue ?? false
  );
  const [errorFields, setErrorFields] = useState<string[]>([]);

  const [localVarName, setlocalVarName] = useState(initialAssignation.varName);
  const [localVarValue, setlocalVarValue] = useState(
    initialAssignation.varValue
  );

  const onVarNameChange = (text: any) => {
    if (!text) return;
    // Clean Error
    setErrorFields((prev) => prev.filter((f) => f !== "varNameField"));
    setlocalVarName(extractTextFromHTML(text));
  };

  const onVarValueChange = (text: any) => {
    if (!text) return;
    // Clean Error
    setErrorFields((prev) => prev.filter((f) => f !== "varValueField"));
    setlocalVarValue(text);
  };

  return (
    <div
      className={cn(
        "!h-7 flex flex-1 items-center w-full mb-2 py-1 px-2 rounded-sm hover:bg-neutral-200/20 transition-all duration-200",
        !isEditing && "cursor-pointer"
      )}
    >
      {/* Editing Mode */}
      {isEditing && (
        <div className="flex flex-1 w-full gap-2 !h-7">
          {/* Name Input */}
          <div className="flex w-[35%]">
            <DnDTextInput
              placeholder={"Name..."}
              inputType="text"
              hasError={errorFields.includes("varNameField")}
              nodeId={nodeId}
              itemId={itemId}
              disableDnD={true}
              inputValue={localVarName}
              className={cn(
                "!text-xs flex-1 w-full !h-7 rounded-sm placeholder:font-semibold placeholder:text-muted-foreground/70"
              )}
              onElementDropped={(text) => {
                onVarNameChange(text);
              }}
              onTextChange={(text) => {
                onVarNameChange(text);
              }}
            />
          </div>
          {/* Value Input */}
          <div className="flex w-[35%]">
            <DnDTextInput
              placeholder={"Value..."}
              inputType="text"
              hasError={errorFields.includes("varValueField")}
              nodeId={nodeId}
              itemId={itemId}
              inputValue={localVarValue}
              className={cn(
                "!text-xs flex-1 w-full !h-7 rounded-sm placeholder:font-semibold placeholder:text-muted-foreground/70"
              )}
              onElementDropped={(text) => {
                onVarValueChange(text);
              }}
              onTextChange={(text) => {
                onVarValueChange(text);
              }}
            />
          </div>
          {/* Buttons */}
          <div className="flex gap-0 !h-8">
            {/* Save Button */}
            <SimpleTooltip tooltipText="Save Variable">
              <Button
                variant={"ghost"}
                className={cn(
                  "!w-7 !h-7 px-0 flex items-center justify-center hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer rounded-sm transition-all duration-300"
                )}
                onClick={() => {
                  // Error Checker
                  // Get Invalid Inputs
                  const errFields = getInvalidInputs({
                    varName: localVarName,
                    varValue: localVarValue,
                  });

                  if (errFields.length > 0) {
                    // Add the current "Item Id" + "Parent Node Id" among CurrentEditor errors list
                    if (nodeId) {
                      insertOrRemoveIdsFromCurrentEditorErrors({
                        fromId: "",
                        initialNodeId: nodeId,
                        action: "add",
                      });
                    }
                    setErrorFields(errFields);
                    return;
                  } else {
                    // Remove the current "Item Id" + "Parent Node Id" among CurrentEditor errors list
                    if (nodeId) {
                      insertOrRemoveIdsFromCurrentEditorErrors({
                        fromId: "",
                        initialNodeId: nodeId,
                        action: "remove",
                      });
                    }

                    // Proceed to saving...
                    onSave({ varName: localVarName, varValue: localVarValue });
                    setIsEditing(false);
                  }
                }}
              >
                <Check className="stroke-[3px]" />
              </Button>
            </SimpleTooltip>

            {/* Delete Button */}
            <SimpleTooltip tooltipText="Delete Variable">
              <Button
                variant={"ghost"}
                className={cn(
                  "!w-7 !h-7 px-0 flex items-center justify-center hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer rounded-sm transition-all duration-300"
                )}
                onClick={() => {
                  if (nodeId) {
                    insertOrRemoveIdsFromCurrentEditorErrors({
                      fromId: "",
                      initialNodeId: nodeId,
                      action: "remove",
                    });
                  }
                  onDelete();
                }}
              >
                <Trash2 />
              </Button>
            </SimpleTooltip>
          </div>
        </div>
      )}

      {/* Default Mode */}
      {!isEditing && (
        <div className="!h-7 group/assignationItem flex flex-1 gap-2 w-full justify-start items-center pt-1">
          {/* Assignation */}
          <div className="flex w-[73%] text-xs gap-1">
            <span className="line-clamp-1 min-w-fit max-w-14">
              {extractTextFromHTML(localVarName)}
            </span>
            <span>=</span>
            <span className="whitespace-pre-wrap font-medium line-clamp-1">
              {extractTextFromHTML(localVarValue)}
            </span>
          </div>

          {canEdit && (
            <div className="flex gap-0 !h-8">
              {/* Edit Button */}
              <SimpleTooltip tooltipText="Edit Variable">
                <Button
                  variant={"ghost"}
                  className={cn(
                    "!w-7 !h-7 px-0 group-hover/assignationItem:flex hidden items-center justify-center hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer rounded-sm transition-all duration-300"
                  )}
                  onClick={() => {
                    setIsEditing(true);
                    onEdit();
                  }}
                >
                  <PenLineIcon />
                </Button>
              </SimpleTooltip>

              {/* Delete Button */}
              <SimpleTooltip tooltipText="Delete Variable">
                <Button
                  variant={"ghost"}
                  className={cn(
                    "!w-7 !h-7 px-0 group-hover/assignationItem:flex hidden items-center justify-center hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer rounded-sm transition-all duration-300"
                  )}
                  onClick={() => {
                    onDelete();
                  }}
                >
                  <Trash2 />
                </Button>
              </SimpleTooltip>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SetVariablesBlockCard;
