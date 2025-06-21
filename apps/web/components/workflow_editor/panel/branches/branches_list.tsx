import { useWorkflowEditorStore } from "@/stores/workflowStore";
import React, { useEffect, useState } from "react";
import { isTrulyEmpty, toStringSafe } from "@/lib/string_utils";
import { VsNode } from "@/lib/workflow_editor/classes/node";
import AddBranchButton from "./add_branch_button";
import SingleFilterRow from "../../inputs/filter_input_row";
import { Info } from "lucide-react";
import SharedOutputButtons from "../../buttons/shared_output_buttons";
import { insertOrRemoveIdsFromCurrentEditorErrors } from "@/lib/workflow_editor/utils/w_utils";

const BranchesList = () => {
  // Store:
  const currentNode = useWorkflowEditorStore((s) => s.currentNode);
  const setElementIdToActOn = useWorkflowEditorStore(
    (s) => s.setElementIdToActOn
  );
  // End Store
  const [nodeOutputs, setNodeOutputs] = useState(
    currentNode ? currentNode.outputs : undefined
  );

  const [branchCurrentlyEditted, setBranchCurrentlyEditted] =
    useState<string>();

  useEffect(() => {
    if (!currentNode) return;
    const sub = currentNode.stream$().subscribe((newData) => {
      const outputs = (newData as VsNode).outputs;
      setNodeOutputs({ ...outputs });
    });

    return () => sub.unsubscribe();
  }, []);

  if (!currentNode) {
    return <div></div>;
  }

  const isBranchNode = currentNode.label.includes("Branch");
  const isMergeNode = currentNode.label.includes("Merge");

  return (
    <>
      {/* Here Outputs represents: Branches */}
      {isMergeNode ? (
        <div className="flex flex-col gap-6 mt-[3rem]">
          {/* Good To Know */}
          <div className="flex flex-1 text-xs gap-2 text-neutral-500">
            <div className="w-5">
              <Info />
            </div>
            <div className="inline-block">
              This node merges all connected nodes and sends a combined version
              of their data to the next node.
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h5 className="text-base font-semibold text-[#333] line-clamp-1 mb-0">
            {isBranchNode ? "Routes" : "Conditions"}
          </h5>
          <p className="text-xs text-muted-foreground line-clamp-1 mb-3">
            {nodeOutputs ? Object.keys(nodeOutputs).length : 0} Branch
            {nodeOutputs && Object.keys(nodeOutputs).length > 1 && "es"}
          </p>

          {nodeOutputs && (
            <div className="flex flex-col w-full mb-20 group/variableAssignationsList">
              {Object.entries(nodeOutputs).map(([key, branch], idx) => {
                const arrayLength = Object.entries(nodeOutputs).length;
                const isLast = arrayLength === idx + 1 && arrayLength !== 1;
                const isFirst = idx === 0;
                return (
                  <div key={`${key}`} className="flex flex-col">
                    <SingleFilterRow
                      nodeId={currentNode.id}
                      initialFilter={
                        branch.condition ?? {
                          filterCriteria: null,
                          filterType: null,
                          filterValue: null,
                          inputID: "",
                          keyId: key,
                        }
                      }
                      isCondition={true}
                      titleContent={
                        isBranchNode
                          ? `Branch ${idx + 1}`
                          : isLast
                            ? "ELSE"
                            : isFirst
                              ? "IF"
                              : "Else IF"
                      }
                      canEdit={
                        isBranchNode
                          ? false
                          : !isLast && !branchCurrentlyEditted
                      }
                      canDelete={
                        isBranchNode
                          ? true
                          : !isFirst && !isLast && !branchCurrentlyEditted
                      }
                      initialIsEditing={false}
                      index={idx}
                      key={key}
                      onEdit={() => {
                        setBranchCurrentlyEditted(key);
                      }}
                      onDelete={() => {
                        setBranchCurrentlyEditted(undefined);
                        currentNode.deleteOutput(key);

                        insertOrRemoveIdsFromCurrentEditorErrors({
                          fromId: "",
                          initialNodeId: currentNode.id,
                          action: "remove",
                        });

                        setElementIdToActOn({
                          type: "Output",
                          elementId: key,
                          operation: "BranchDeleted",
                        });
                      }}
                      onError={(hasError) => {
                        if (hasError) {
                          insertOrRemoveIdsFromCurrentEditorErrors({
                            fromId: "",
                            initialNodeId: currentNode.id,
                            action: "add",
                          });
                        } else {
                          insertOrRemoveIdsFromCurrentEditorErrors({
                            fromId: "",
                            initialNodeId: currentNode.id,
                            action: "remove",
                          });
                        }
                      }}
                      onSave={(newCondition) => {
                        setBranchCurrentlyEditted(undefined);
                        branch.condition = newCondition;

                        insertOrRemoveIdsFromCurrentEditorErrors({
                          fromId: "",
                          initialNodeId: currentNode.id,
                          action: "remove",
                        });
                      }}
                    />

                    {!isBranchNode &&
                    arrayLength - 2 === idx &&
                    arrayLength >= 2 &&
                    arrayLength < 7 ? (
                      <div className="mb-2 mt-5">
                        <AddBranchButton
                          textContent="Add Else If Condition"
                          isDisabled={
                            !isTrulyEmpty(toStringSafe(branchCurrentlyEditted))
                          }
                          onClick={() => {
                            // Add Output (Branch)
                            currentNode.insertOutput();
                          }}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
              {/* Add another Branch Block */}
              {(isBranchNode && Object.entries(nodeOutputs).length < 7) ||
              Object.entries(nodeOutputs).length < 2 ? (
                <div className="flex mb-3 mt-3">
                  <AddBranchButton
                    textContent={
                      isBranchNode
                        ? "Add Branch"
                        : Object.entries(nodeOutputs).length === 1
                          ? "Add ELSE Condition"
                          : "Add IF and ELSE Conditions"
                    }
                    isDisabled={
                      !isTrulyEmpty(toStringSafe(branchCurrentlyEditted))
                    }
                    onClick={() => {
                      if (isBranchNode) {
                        currentNode.insertOutput();
                      } else {
                        // Add 2 Outputs (Branches): IF and/or ELSE
                        if (Object.entries(nodeOutputs).length === 1) {
                          currentNode.insertOutput();
                        } else {
                          currentNode.insertOutput();
                          currentNode.insertOutput();
                        }
                      }
                    }}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          )}

          {/* Fixed Bottom Bar */}
          {branchCurrentlyEditted && (
            <div className="flex flex-col -ml-4 w-[var(--workflowPanelWidth)] !h-10 bg-white z-10 fixed bottom-[7vh]">
              {/* Shared Outputs DnD Buttons */}

              <SharedOutputButtons
                nodeId={currentNode.id}
                blockId={currentNode.block?.id}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BranchesList;
