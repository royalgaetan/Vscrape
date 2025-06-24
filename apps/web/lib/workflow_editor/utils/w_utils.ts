import {
  CircleCheck,
  CircleDashedIcon,
  CircleX,
  Loader2,
  LucideIcon,
} from "lucide-react";
import {
  previousInputData,
  workflowEditorNodes,
  workflowEditorSections,
} from "../constants/w_constants";
import {
  ExecutionPlan,
  NodeTest,
  OutputDataType,
  PreviousInputDataType,
  VsNodeType,
  WorkflowDefinition,
} from "../types/w_types";
import { WORKFLOW_COLORS } from "@/lib/colors_utils";
import { VsNode } from "../classes/node";
import { cloneDeep } from "lodash";
import { NodeEditor } from "rete";
import { structures } from "rete-structures";
import { CurrentEditor, useWorkflowEditorStore } from "@/stores/workflowStore";
import { Schemes } from "@/app/(protected)/w/[workflowId]/editor/_components/w_editor";
import { OperationBlock, OperationItem } from "../classes/operation_block";
import { getWorkflowExecutionPlan } from "@/actions/workflow_editor/get_workflow_execution_plan";
import {
  extractTextFromHTML,
  toStringSafe,
  isPureVariableOnly,
  stripMustacheBraces,
  toCleanHTML,
  variablesIncluded,
  isTrulyEmpty,
} from "@/lib/string_utils";
import { isRecord } from "@/lib/utils";
import { getTypeBigCategory, getTypeFromTypedText } from "./get_criterias";
import { FormFieldItem } from "../classes/form_field_block";
import { isAFile } from "../types/mime_types";
import { WebhookBlock } from "../classes/webhook_block";
import { CronBlock } from "../classes/cron_block";
import { isValidCronSection } from "@/components/workflow_editor/panel/cron/cron_editor_card";
import { SetVariablesBlock } from "../classes/setVariables_block";
import { vsAnyPrimitives, vsAnyRawTypes } from "../types/data_types";
import { isReallyNumber } from "@/lib/numbers_utils";
import { useCallback } from "react";
import { VsConnection } from "../classes/connections";
import { getWorkflowDefinition } from "@/actions/workflow_editor/get_workflow_definition";

export const isDynamicInputDataOnly = (content: string) => {
  // Check if the provided content is only a data input. E.g. {{ Variables }}
  return content.startsWith("{{") && content.endsWith("}}");
};

export const getVsNodeFromLabel = (label: string): VsNode | null => {
  const node = cloneDeep(
    workflowEditorNodes.find((node) => node.label === label)
  );
  if (!node) return null;
  const vsNode = new VsNode({
    iconColor: getWorkflowSectionColor(node.sectionName),
    ...node,
  } as VsNodeType);
  return vsNode;
};

export const getWorkflowSectionColor = (sectionName: string): string => {
  const section = Object.entries(workflowEditorSections).find(
    (s) => s[0] === sectionName
  );
  if (!section) return WORKFLOW_COLORS.slate;
  return section[1].iconColor;
};

export const getNodeTestIcon = (
  status: NodeTest
): { icon: LucideIcon; label: string; iconClassname?: string } => {
  switch (status) {
    case "failed":
      return {
        icon: CircleX,
        label: "Failed",
        iconClassname: "stroke-red-400",
      };
    case "success":
      return {
        icon: CircleCheck,
        label: "Completed",
        iconClassname: "stroke-green-600",
      };
    case "running":
      return {
        icon: Loader2,
        label: "Running",
        iconClassname: "animate-spin text-neutral-500",
      };

    default:
      return {
        icon: CircleDashedIcon,
        label: "—",
      };
  }
};

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

export const buildAdjacency = (
  editor: NodeEditor<Schemes>
): Map<string, Set<string>> => {
  const graph = structures(editor);
  const adj = new Map<string, Set<string>>();

  editor.getNodes().forEach((n) => adj.set(n.id, new Set()));

  graph.connections().forEach((conn) => {
    const { source, target } = conn;
    adj.get(source)?.add(target);
  });

  return adj;
};

export const hasCycleInAdjacency = (adj: Map<string, Set<string>>): boolean => {
  const White = 0,
    Grey = 1,
    Black = 2;
  const colors = new Map<string, number>();
  adj.forEach((_, id) => colors.set(id, White));

  const dfs = (node: string): boolean => {
    colors.set(node, Grey);
    for (const neighbor of adj.get(node)!) {
      const c = colors.get(neighbor);
      if (c === Grey) return true; // Found a back edge → cycle
      if (c === White && dfs(neighbor)) return true;
    }
    colors.set(node, Black);
    return false;
  };

  for (const id of adj.keys()) {
    if (colors.get(id) === White && dfs(id)) {
      return true;
    }
  }

  return false;
};

export const entryPointNodesLabels = () => {
  return workflowEditorNodes
    .filter((w) => w.sectionName === "Entry Point")
    .map((w) => w.label);
};

export const hasAlreadyEntryPoint = (editor: NodeEditor<Schemes>): boolean => {
  const found = editor
    .getNodes()
    .filter((n) => entryPointNodesLabels().includes(n.label));

  if (found.length >= 1) return true;
  else return false;
};

export const rebuildExecutionPlan = () => {
  const currentEditor = useWorkflowEditorStore.getState().currentEditor;
  if (currentEditor.state !== "rendered") return;
  const setCurrentEditor = useWorkflowEditorStore.getState().setCurrentEditor;
  try {
    // console.log("⛏️ 1.Rebuiling execution plan...", "\nWith:", currentEditor);
    const newExecutionPlan = getWorkflowExecutionPlan();
    const plan = newExecutionPlan.plan;
    const err = newExecutionPlan.errors;
    setCurrentEditor({
      ...currentEditor,
      executionPlan: plan,
      errors: err,
    });
    // console.log("⛏️ 2.Rebuilt::Execution plan", "\nPlan:", plan, "\nErr:", err);
  } catch (err) {
    console.log("Error while rebuilding the execution plan...", err);
  }
};

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

export const getPreviousInputData = ({
  nodeId,
  itemId,
  executionPlan,
  workflowDefinition,
}: {
  nodeId: string;
  itemId: string;
  executionPlan: ExecutionPlan;
  workflowDefinition: WorkflowDefinition;
}): PreviousInputDataType[] => {
  let _previousInputs = [] as PreviousInputDataType[];
  try {
    // const executionPlan = getWorkflowExecutionPlan();
    // From ExecutionPlan, get "speculated" previousInputData
    // To allow user to use them before calculation (Orchestrator)
    const inputVars = getVariablesInputData(nodeId, executionPlan);
    const prevNodeOutputs = getPreviousNodeInputData(
      nodeId,
      executionPlan,
      workflowDefinition
    );
    const prevItemOutputs = getPreviousItemInputData(
      nodeId,
      itemId ?? "",
      workflowDefinition
    );
    const hasVariables =
      inputVars && Object.keys(inputVars["Variables"]).length > 0;
    const hasPreviousNode =
      prevNodeOutputs && Object.keys(prevNodeOutputs["Last Node"]).length > 0;
    const hasPreviousItem =
      prevItemOutputs && Object.keys(prevItemOutputs["Last Item"]).length > 0;

    _previousInputs = previousInputData
      .map((p) => {
        if (p.label === "Variables" && hasVariables)
          return { data: inputVars, ...p };
        if (p.label === "Last Node" && hasPreviousNode)
          return { data: prevNodeOutputs, ...p };
        if (p.label === "Last Item" && hasPreviousItem)
          return { data: prevItemOutputs, ...p };
      })
      .filter((p) => p !== undefined);

    return _previousInputs;
  } catch (err) {
    console.log("Error while making Previous Input Data", err);
    return [];
  }
};

export const getVariablesInputData = (
  nodeId: string,
  executionPlan: ExecutionPlan
): OutputDataType | undefined => {
  // From previous phases (desc.) find the all "SetVariables" Nodes and Merge them as Global Vars
  // Conflicts: Vars with same "keys" are overwritten with last values
  // If not found return empty array: aka no Global Vars defined
  const currNodePhaseNumber = Number(
    Object.entries(executionPlan).find(([phaseNumber, nodes]) =>
      nodes.some((n) => n.id === nodeId)
    )?.[0]
  );

  let globalVars: OutputDataType = {};

  const _previousSetVariablesNodes = Object.entries(executionPlan)
    .filter(([k, v]) => {
      return (
        Number(k) < currNodePhaseNumber &&
        v.some((n) => n.label === "Set Variables")
      );
    })
    .flatMap((vals) => vals[1]);

  _previousSetVariablesNodes.forEach((setVariablesNode, idx) => {
    if (setVariablesNode.outputData) {
      Object.entries(setVariablesNode.outputData).forEach(([key, values]) => {
        // if key already exist, override its values with new one
        if (Object.keys(globalVars).includes(key)) {
          globalVars[key] = values;
        } else {
          globalVars = {
            [key]: values,
            ...globalVars,
          };
        }
      });
    }
  });

  return { ["Variables"]: globalVars };
};

export const getPreviousNodeInputData = (
  nodeId: string,
  executionPlan: ExecutionPlan,
  workflowDefinition: WorkflowDefinition
): OutputDataType | undefined => {
  const relatedConnections = workflowDefinition.connections.filter(
    (conn) => conn.target === nodeId
  );

  const previousNodeIds = new Set(relatedConnections.map((c) => c.source));

  const getCurrNodePhaseNumber = Number(
    Object.entries(executionPlan).find(([phaseNumber, nodes]) =>
      nodes.find((n) => n.id === nodeId)
    )?.[0]
  );

  const alreadyPlannedNodes = Object.entries(executionPlan)
    .filter(
      ([phaseNumber, nodes]) =>
        Number(phaseNumber) < getCurrNodePhaseNumber &&
        nodes.find(
          (n) => previousNodeIds.has(n.id) && n.label !== "Set Variables"
        )
    )
    .flatMap((n) => n[1]);

  const merged = alreadyPlannedNodes.reduce((acc, node) => {
    if (node.outputData) {
      acc[node.label] = node.outputData;
    }
    return acc;
  }, {} as OutputDataType);

  return { "Last Node": merged };
};

export const getPreviousItemInputData = (
  nodeId: string,
  itemId: string,
  workflowDefinition: WorkflowDefinition
): OutputDataType | undefined => {
  // Check if the node is composed of OperationItems only
  const node = workflowDefinition.nodes.find((n) => n.id === nodeId);
  const nodeBlock = node?.block;
  if (!node || !node.block) return;

  const nodeItemsArr =
    nodeBlock instanceof OperationBlock ? nodeBlock.items : [];

  // Get Item Index from ItemId
  const itemIndex = nodeItemsArr.findIndex((it) => it.id === itemId);
  const previousItemIndex = itemIndex - 1;

  if (itemIndex === 0) return;
  if (itemIndex === -1) {
    const outputData = nodeItemsArr.at(-1)?.itemOutputData;
    if (outputData) return { "Last Item": outputData };
  }

  const previousItem = nodeItemsArr[previousItemIndex];
  if (!previousItem) return;
  const previousItemOutputData = previousItem.itemOutputData;
  if (!previousItemOutputData) return;

  return { "Last Item": previousItemOutputData };
};

/**
 * Tries to resolve the data type of an input reference string (e.g., {{ Variables.json }})
 * by looking it up in the shared output data or by falling back to a typed-text extractor.
 *
 * @param inputID - The string or reference to resolve (e.g., {{ Variables.json }})
 * @returns The corresponding type string if found, or undefined.
 */
export const resolveInputTypeFromReference = ({
  valueToResolve,
  nodeId,
  itemId,
}: {
  valueToResolve: any;
  nodeId: string;
  itemId: string;
}): (vsAnyPrimitives | vsAnyRawTypes)["type"] | undefined => {
  const cleanInput = toStringSafe(valueToResolve);
  const path = stripMustacheBraces(cleanInput).split(".");
  let _prevInputs = {};

  const currentEditor = useWorkflowEditorStore.getState().currentEditor;
  const plan = currentEditor.executionPlan;
  const definition = getWorkflowDefinition(currentEditor.editor);
  if (!definition || !plan) return;

  const previousInputData = getPreviousInputData({
    executionPlan: plan,
    workflowDefinition: definition,
    nodeId,
    itemId,
  });
  previousInputData.forEach((inputData) => {
    if (inputData.data) {
      const key = Object.keys(inputData.data)[0];
      const values = Object.values(inputData.data)[0];
      _prevInputs = {
        [key]: values,
        ..._prevInputs,
      };
    }
  });
  // Attempt to resolve type from predefined shared outputs
  return resolveNestedType(_prevInputs, path);
};

/**
 * Traverses a nested object using a key path to resolve the final `.type` if it exists.
 *
 * @param object - The root object to start from.
 * @param keys - The list of keys (e.g., ["Variables", "json"]) to traverse.
 * @param level - Internal use for recursion depth (default 0).
 * @returns The `.type` string at the final node, or undefined if not found.
 */
export const resolveNestedType = (
  object: Record<string, any>,
  keys: string[],
  level: number = 0
): (vsAnyPrimitives | vsAnyRawTypes)["type"] | undefined => {
  const key = keys[level];

  if (!(key in object)) return;

  const currentValue = object[key];

  // If it's a nested object without a type, go deeper
  if (isRecord(currentValue) && !currentValue["type"]) {
    return resolveNestedType(currentValue, keys, level + 1);
  }

  // If it has a "type" field, return it
  if (isRecord(currentValue) && currentValue["type"]) {
    return currentValue.type;
  }
};

export const shouldExcludeItem = ({
  item,
  idx,
  arr,
  nodeId,
  itemId,
}: {
  item: any;
  idx?: number;
  arr?: any[];
  nodeId?: string;
  itemId?: string;
}): boolean => {
  const itemAsString = toCleanHTML(toStringSafe(item));

  // Exclude if empty and is 1st element
  if (itemAsString.length === 0 && idx === 0) {
    return true;
  }

  // Exclude if empty and not the last item
  if (
    (arr && idx && itemAsString.length === 0 && idx !== arr.length - 1) ||
    (!arr && itemAsString.length === 0)
  ) {
    return true;
  }

  const typeCategory = getItemTypeCategory({ item: item, nodeId, itemId });

  // Exclude if not one of the allowed types
  return !["string", "number", "Strings", "Numbers"].includes(typeCategory);
};

export const getItemTypeCategory = ({
  item,
  nodeId,
  itemId,
}: {
  item: any;
  nodeId?: string;
  itemId?: string;
}): string => {
  if (isPureVariableOnly(item)) {
    const resolvedType = resolveInputTypeFromReference({
      valueToResolve: extractTextFromHTML(item),
      nodeId: nodeId ?? "",
      itemId: itemId ?? "",
    });
    return getTypeBigCategory(resolvedType) ?? "";
  }
  if (typeof item === "boolean") {
    return "boolean";
  }
  if (isReallyNumber(item)) {
    return "number";
  }
  return typeof item;
};

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

export const insertOrRemoveIdsFromCurrentEditorErrors = ({
  fromId,
  initialNodeId,
  action,
}: {
  fromId: string;
  initialNodeId: string;
  action: "add" | "remove";
}) => {
  // Store
  const currentEditor = useWorkflowEditorStore.getState().currentEditor;
  const setCurrentEditor = useWorkflowEditorStore.getState().setCurrentEditor;
  // End Store

  const set = new Set<string>([fromId, initialNodeId]);
  const updSet = currentEditor.errors;

  switch (action) {
    case "add":
      setCurrentEditor({
        editor: currentEditor.editor,
        state: currentEditor.state,
        executionPlan: currentEditor.executionPlan,
        errors: currentEditor.errors
          ? new Set([...currentEditor.errors, ...set])
          : set,
      });
      break;
    case "remove":
      if (updSet) {
        updSet?.delete(fromId);
        updSet?.delete(initialNodeId);
      }
      setCurrentEditor({
        editor: currentEditor.editor,
        state: currentEditor.state,
        executionPlan: currentEditor.executionPlan,
        errors: updSet,
      });

      break;

    default:
      break;
  }
};

export const getInvalidInputs = ({
  from,
  nodeId,
  itemId,
}: {
  from: any;
  nodeId?: string;
  itemId?: string;
}): string[] => {
  const errFields = new Set<string>();
  if (from === undefined) return [];

  // OperationItem (from OperationBlock) Validator
  if (from instanceof OperationItem && from.itemParams) {
    from.itemParams
      .flatMap((p) => p)
      .forEach((param) => {
        const paramValueCleaned = extractTextFromHTML(
          toStringSafe(param.value)
        );
        const paramValueType = isPureVariableOnly(paramValueCleaned)
          ? resolveInputTypeFromReference({
              valueToResolve: paramValueCleaned,
              nodeId: nodeId ?? "",
              itemId: itemId ?? "",
            })
          : typeof param.value;
        const paramExpectedType = getTypeBigCategory(param.type);
        const _variablesIncluded = variablesIncluded(paramValueCleaned);

        // Contains more than one variables
        if (_variablesIncluded.length > 1) {
          // INPUTDATA (Variables, Last Node, Last Item) CHECKER
          if (
            _variablesIncluded.some(
              (v) =>
                resolveInputTypeFromReference({
                  valueToResolve: v,
                  nodeId: nodeId ?? "",
                  itemId: itemId ?? "",
                }) === undefined
            )
          ) {
            errFields.add(param.paramName);
          }
        }
        // If the param is optional and truly empty: Skip
        // Otherwise: evaluate()
        else if (
          param.isOptional !== true ||
          (param.isOptional === true &&
            !isTrulyEmpty(toStringSafe(param.value)))
        ) {
          // STRINGS CHECKER
          if (paramExpectedType === "Strings") {
            if (
              (paramValueType === "string" ||
                getTypeBigCategory(paramValueType) === "Strings") &&
              paramValueCleaned.length > 0
            ) {
              // Value is Valid here...
            } else {
              errFields.add(param.paramName);
            }
          }

          // NUMBER CHECKER
          if (paramExpectedType === "Numbers") {
            if (
              (!isNaN(Number(param.value)) ||
                paramValueType === "number" ||
                getTypeBigCategory(paramValueType) === "Numbers") &&
              paramValueCleaned.length > 0
            ) {
              // Value is Valid here...
            } else {
              errFields.add(param.paramName);
            }
          }

          // BOOLEANS CHECKER
          if (paramExpectedType === "Booleans") {
            if (
              paramValueType === "boolean" ||
              getTypeBigCategory(paramValueType) === "Booleans"
            ) {
              // Value is Valid here...
            } else {
              errFields.add(param.paramName);
            }
          }

          // Radio CHECKER
          if (
            param.type === "primitive/radio" &&
            (typeof param.value !== "string" || param.value.length === 0)
          ) {
            errFields.add(param.paramName);
          }

          // Array CHECKER
          if (
            param.type === "primitive/array" &&
            (!Array.isArray(param.value) ||
              param.value.some((item, idx, arr) =>
                shouldExcludeItem({
                  item,
                  idx,
                  arr,
                  nodeId,
                  itemId,
                })
              ))
          ) {
            errFields.add(param.paramName);
          }

          // Record CHECKER
          if (
            param.type === "primitive/record" &&
            (!Array.isArray(param.value) ||
              (param.value as any[]).some((el, idx, arr) => {
                const isLast = idx === arr.length - 1;
                // Is empty: { key: "", value: "" }
                const isEmpty =
                  JSON.stringify(el) === JSON.stringify({ key: "", value: "" });

                // Either Key or Value is missing
                const isMissingKey = Object.keys(el).some((key) =>
                  shouldExcludeItem({ item: key, itemId, nodeId })
                );
                const isMissingValue = Object.values(el).some((val) =>
                  shouldExcludeItem({ item: val, itemId, nodeId })
                );
                if (!isRecord(el)) return true;
                if (idx === 0) return isMissingKey || isMissingValue || isEmpty;
                if (isLast) {
                  if (isEmpty) return false;
                  else return isMissingKey || isMissingValue;
                }
                if (!isLast) return isMissingKey || isMissingValue || isEmpty;
              }))
          ) {
            errFields.add(param.paramName);
          }

          // Raw CHECKER: Non-existant in Operations Definition List
        }
      });
  }

  // FormFieldItem (from FormBlock) Validator
  if (from instanceof FormFieldItem) {
    if (!from.fieldName || !from.fieldType) {
      errFields.add("fieldName");
    }
    if (typeof from.fieldLabel === "string" && from.fieldLabel.length === 0) {
      errFields.add("fieldLabel");
    }
    if (
      from.fieldValueToPickFrom !== undefined &&
      Array.isArray(from.fieldValueToPickFrom) &&
      from.fieldValueToPickFrom.filter((a) => extractTextFromHTML(a).length > 0)
        .length < 2
    ) {
      errFields.add("fieldValueToPickFrom");
    }

    if (
      from.isHidden !== undefined &&
      toStringSafe(from.fieldValue).length === 0
    ) {
      errFields.add("fieldValue");
    }

    if (
      from.fieldType === "primitive/text" &&
      from.fieldValueToPickFrom === undefined &&
      from.isMultiline === undefined
    ) {
      errFields.add("fieldIsMultiline");
    }

    if (
      from.fieldType &&
      isAFile(from.fieldType) &&
      from.acceptedFileExtensions === undefined
    ) {
      errFields.add("fieldAcceptedExtensions");
    }
  }

  // Webhook Block Validator
  if (from instanceof WebhookBlock) {
    if (from.endpointUrl.length < 1) {
      errFields.add("endpointURL");
    }
    if (!from.httpMethod) {
      errFields.add("httpMethod");
    }
  }

  // Cron Block Validator
  if (from instanceof CronBlock) {
    // Minute
    if (
      isValidCronSection(from.configMinute ?? "", "Minute", "main") === false
    ) {
      errFields.add("configMinuteMain");
    }
    if (
      isValidCronSection(from.configMinute ?? "", "Minute", "step") === false
    ) {
      errFields.add("configMinuteStep");
    }
    // Hour
    if (isValidCronSection(from.configHour ?? "", "Hour", "main") === false) {
      errFields.add("configHourMain");
    }
    if (isValidCronSection(from.configHour ?? "", "Hour", "step") === false) {
      errFields.add("configHourStep");
    }

    // Day Of Month
    if (
      isValidCronSection(
        from.configDayOfMonth ?? "",
        "Day of Month",
        "main"
      ) === false
    ) {
      errFields.add("configDayOfMonthMain");
    }
    if (
      isValidCronSection(
        from.configDayOfMonth ?? "",
        "Day of Month",
        "step"
      ) === false
    ) {
      errFields.add("configDayOfMonthStep");
    }

    // Month
    if (isValidCronSection(from.configMonth ?? "", "Month", "main") === false) {
      errFields.add("configMonthMain");
    }
    if (isValidCronSection(from.configMonth ?? "", "Month", "step") === false) {
      errFields.add("configMonthStep");
    }

    // Day Of Week
    if (
      isValidCronSection(from.configDayOfWeek ?? "", "Day of Week", "main") ===
      false
    ) {
      errFields.add("configDayOfWeekMain");
    }
    if (
      isValidCronSection(from.configDayOfWeek ?? "", "Day of Week", "step") ===
      false
    ) {
      errFields.add("configDayOfWeekStep");
    }
  }

  // SetVariables Validator
  if (
    typeof from === "object" &&
    Object.keys(from).includes("varName") &&
    Object.keys(from).includes("varValue")
  ) {
    if (from.varName.length === 0) {
      errFields.add("varNameField");
    }
    if (extractTextFromHTML(toStringSafe(from.varValue)).length === 0) {
      errFields.add("varValueField");
    }
  }

  return [...errFields];
};
