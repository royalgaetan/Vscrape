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
import { toast } from "sonner";
import { resolveInputTypeFromReference } from "@/components/workflow_editor/inputs/filter_input_row";
import { shouldExcludeItem } from "@/components/workflow_editor/panel/operations/single_operationItem_panel";
import {
  extractTextFromHTML,
  toStringSafe,
  isPureVariableOnly,
} from "@/lib/string_utils";
import { isRecord } from "@/lib/utils";
import { getTypeBigCategory } from "./get_criterias";
import { FormFieldItem } from "../classes/form_field_block";
import { isAFile } from "../types/mime_types";
import { WebhookBlock } from "../classes/webhook_block";
import { CronBlock } from "../classes/cron_block";
import { isValidCronSection } from "@/components/workflow_editor/panel/cron/cron_editor_card";
import { SetVariablesBlock } from "../classes/setVariables_block";

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
    const newExecutionPlan = getWorkflowExecutionPlan();
    setCurrentEditor({
      editor: currentEditor.editor,
      state: "rendered",
      executionPlan: newExecutionPlan,
    });
  } catch (err) {
    console.log("Error while rebuilding the execution plan...");
  }
};

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

export const getPreviousInputData = ({
  nodeId,
  itemId,
  currentEditor,
}: {
  nodeId: string;
  itemId: string;
  currentEditor: CurrentEditor;
}): PreviousInputDataType[] => {
  let _previousInputs = [] as PreviousInputDataType[];
  if (currentEditor.state !== "rendered") return [];

  try {
    const executionPlan = getWorkflowExecutionPlan();
    // From ExecutionPlan, get "speculated" previousInputData
    // To allow user to use them before calculation (Orchestrator
    if (!executionPlan) return [];
    const inputVars = getVariablesInputData(
      nodeId,
      currentEditor,
      executionPlan
    );
    const prevNodeOutputs = getPreviousNodeInputData(
      nodeId,
      currentEditor,
      executionPlan
    );
    const prevItemOutputs = getPreviousItemInputData(
      nodeId,
      itemId ?? "",
      currentEditor,
      executionPlan
    );

    const hasVariables = inputVars && Object.keys(inputVars).length > 0;
    const hasPreviousNode =
      prevNodeOutputs && Object.keys(prevNodeOutputs).length > 0;
    const hasPreviousItem =
      prevItemOutputs && Object.keys(prevItemOutputs).length > 0;

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
    toast.error(
      err instanceof Error ? err.message : "An error occured. Try again!",
      {
        richColors: true,
      }
    );
    return [];
  }
};

export const getVariablesInputData = (
  nodeId: string,
  currentEditor: CurrentEditor,
  executionPlan: ExecutionPlan
): OutputDataType | undefined => {
  const editor = currentEditor.editor;
  if (!editor || !executionPlan) return {};

  // From previous phases (desc.) find the all SetVariableNode and Merge them as Global Vars
  // Conflicts: Vars with same names are overwritten
  // If not found return empty array: aka no Global Vars defined
  const currNodePhaseNumber = Number(
    Object.entries(executionPlan).find(([phaseNumber, nodes]) =>
      nodes.find((n) => n.id === nodeId)
    )?.[0]
  );

  let globalVars: OutputDataType = {};

  const _previousSetVariablesNodes = Object.entries(executionPlan)
    .filter(
      ([k, v]) =>
        Number(k) < currNodePhaseNumber &&
        v.some((n) => n.label === "Set Variables")
    )
    .flatMap((vals) => vals[1]);

  _previousSetVariablesNodes.forEach((setVariablesNode, idx) => {
    if (setVariablesNode.outputData) {
      globalVars = {
        idx: setVariablesNode.outputData,
        ...globalVars,
      };
    }
  });

  return { Variables: globalVars };
};

export const getPreviousNodeInputData = (
  nodeId: string,
  currentEditor: CurrentEditor,
  executionPlan: ExecutionPlan
): OutputDataType | undefined => {
  const editor = currentEditor.editor;
  if (!editor || !executionPlan) return {};

  const relatedConnections = editor
    .getConnections()
    .filter((conn) => conn.target === nodeId);

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
        nodes.find((n) => previousNodeIds.has(n.id))
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
  currentEditor: CurrentEditor,
  executionPlan: ExecutionPlan
): OutputDataType | undefined => {
  const editor = currentEditor.editor;
  if (!editor || !executionPlan) return;

  // Check if the node is composed of OperationItems only
  const node = editor.getNode(nodeId);
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
  const previousItemOutputData = previousItem.itemOutputData;
  if (!previousItem || !previousItemOutputData) return;

  return { "Last Item": previousItemOutputData };
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
        errors: updSet,
      });

      break;

    default:
      break;
  }
};

export const getInvalidInputs = (from: any): string[] => {
  const errFields: string[] = [];
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
          ? resolveInputTypeFromReference(paramValueCleaned)
          : typeof param.value;
        const paramExpectedType = getTypeBigCategory(param.type);

        if (param.isOptional) {
        } else {
          // STRINGS CHECKER
          if (paramExpectedType === "Strings") {
            if (
              (paramValueType === "string" ||
                getTypeBigCategory(paramValueType) === "Strings") &&
              paramValueCleaned.length > 0
            ) {
              // Value is Valid here...
            } else {
              errFields.push(param.paramName);
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
              errFields.push(param.paramName);
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
              errFields.push(param.paramName);
            }
          }

          // Radio CHECKER
          if (
            param.type === "primitive/radio" &&
            (typeof param.value !== "string" || param.value.length === 0)
          ) {
            errFields.push(param.paramName);
          }

          // Array CHECKER
          if (
            param.type === "primitive/array" &&
            (!Array.isArray(param.value) ||
              param.value.some((item, idx, arr) =>
                shouldExcludeItem(item, idx, arr)
              ))
          ) {
            errFields.push(param.paramName);
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
                  shouldExcludeItem(key)
                );
                const isMissingValue = Object.values(el).some((val) =>
                  shouldExcludeItem(val)
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
            errFields.push(param.paramName);
          }

          // Raw CHECKER: Non-existant in Operations Definition List
        }
      });
  }

  // FormFieldItem (from FormBlock) Validator
  if (from instanceof FormFieldItem) {
    if (!from.fieldName || !from.fieldType) {
      errFields.push("fieldName");
    }
    if (typeof from.fieldLabel === "string" && from.fieldLabel.length === 0) {
      errFields.push("fieldLabel");
    }
    if (
      from.fieldValueToPickFrom !== undefined &&
      Array.isArray(from.fieldValueToPickFrom) &&
      from.fieldValueToPickFrom.filter((a) => extractTextFromHTML(a).length > 0)
        .length < 2
    ) {
      errFields.push("fieldValueToPickFrom");
    }

    if (
      from.isHidden !== undefined &&
      toStringSafe(from.fieldValue).length === 0
    ) {
      errFields.push("fieldValue");
    }

    if (
      from.fieldType === "primitive/text" &&
      from.fieldValueToPickFrom === undefined &&
      from.isMultiline === undefined
    ) {
      errFields.push("fieldIsMultiline");
    }

    if (
      from.fieldType &&
      isAFile(from.fieldType) &&
      from.acceptedFileExtensions === undefined
    ) {
      errFields.push("fieldAcceptedExtensions");
    }
  }

  // Webhook Block Validator
  if (from instanceof WebhookBlock) {
    if (from.endpointUrl.length < 1) {
      errFields.push("endpointURL");
    }
    if (!from.httpMethod) {
      errFields.push("httpMethod");
    }
  }

  // Cron Block Validator
  if (from instanceof CronBlock) {
    // Minute
    if (
      isValidCronSection(from.configMinute ?? "", "Minute", "main") === false
    ) {
      errFields.push("configMinuteMain");
    }
    if (
      isValidCronSection(from.configMinute ?? "", "Minute", "step") === false
    ) {
      errFields.push("configMinuteStep");
    }
    // Hour
    if (isValidCronSection(from.configHour ?? "", "Hour", "main") === false) {
      errFields.push("configHourMain");
    }
    if (isValidCronSection(from.configHour ?? "", "Hour", "step") === false) {
      errFields.push("configHourStep");
    }

    // Day Of Month
    if (
      isValidCronSection(
        from.configDayOfMonth ?? "",
        "Day of Month",
        "main"
      ) === false
    ) {
      errFields.push("configDayOfMonthMain");
    }
    if (
      isValidCronSection(
        from.configDayOfMonth ?? "",
        "Day of Month",
        "step"
      ) === false
    ) {
      errFields.push("configDayOfMonthStep");
    }

    // Month
    if (isValidCronSection(from.configMonth ?? "", "Month", "main") === false) {
      errFields.push("configMonthMain");
    }
    if (isValidCronSection(from.configMonth ?? "", "Month", "step") === false) {
      errFields.push("configMonthStep");
    }

    // Day Of Week
    if (
      isValidCronSection(from.configDayOfWeek ?? "", "Day of Week", "main") ===
      false
    ) {
      errFields.push("configDayOfWeekMain");
    }
    if (
      isValidCronSection(from.configDayOfWeek ?? "", "Day of Week", "step") ===
      false
    ) {
      errFields.push("configDayOfWeekStep");
    }
  }

  // SetVariables Validator
  if (
    typeof from === "object" &&
    Object.keys(from).includes("varName") &&
    Object.keys(from).includes("varValue")
  ) {
    if (from.varName.length === 0) {
      errFields.push("varNameField");
    }
    if (extractTextFromHTML(toStringSafe(from.varValue)).length === 0) {
      errFields.push("varValueField");
    }
  }

  return errFields;
};
