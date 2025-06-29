import { useWorkflowEditorStore } from "@vscrape/engine/src";
import { getWorkflowExecutionPlan } from "../actions/get_workflow_execution_plan";

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
