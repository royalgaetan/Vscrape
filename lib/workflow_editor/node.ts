import { ClassicPreset } from "rete";
import { OperationItem, WorkflowEditorNode } from "./types/w_types";
import { LucideIcon } from "lucide-react";
import { workflowEditorSections } from "./constants/w_constants";
import { deepClone } from "../utils";
import { VsInput, VsOutput, VsSocket } from "./sockets";
import { Socket } from "rete/_types/presets/classic";

export type VsNodeInputsType = (typeof VsNode.prototype)["inputs"];
export type VsNodeOutputsType = (typeof VsNode.prototype)["outputs"];

export class VsNode extends ClassicPreset.Node {
  public iconColor: string;
  public icon?: LucideIcon;
  public logoPath?: string;
  public tooltip?: string;
  public sectionName?: keyof typeof workflowEditorSections;
  public operations: OperationItem[] = [];

  override inputs: { [key in keyof VsInput]?: ClassicPreset.Input<VsSocket> } =
    {};
  override outputs: {
    [key in keyof VsOutput]?: ClassicPreset.Input<VsSocket>;
  } = {};

  constructor(node: WorkflowEditorNode) {
    super(node.label);
    this.iconColor = node.iconColor;
    this.icon = node.icon;
    this.logoPath = node.logoPath;
    this.tooltip = node.tooltip;
    this.sectionName = node.sectionName;
    this.operations = node.operations;

    const anySocket = new VsSocket("any", this.iconColor);

    this.addInput("input", new VsInput(anySocket));
    this.addOutput("output", new VsOutput(anySocket));
  }

  removeOperation(id: string): this {
    console.log("Deleting 1 operation...", this.operations.length);
    this.operations = this.operations.filter((op) => op.operationId !== id);
    console.log("🗑️ Operation deleted", this.operations.length);
    return this;
  }

  addOrUpdateOperation(operation: OperationItem): this {
    // Update if the operation already exists
    const operationIdsList = this.operations.map((op) => op.operationId);

    if (operationIdsList.includes(operation.operationId)) {
      const indexAt = operationIdsList.findIndex(
        (id) => id === operation.operationId
      );
      this.operations[indexAt] = operation;
      console.log(
        `🦜 Node ${this.id}: 1 Operation Updated`,
        this.operations.length
      );
    }
    // Add if the operation doesn't exist yet
    else {
      this.operations = [...this.operations, operation];
      console.log(
        `🐪 Node ${this.id}: 1 Operation Added`,
        this.operations.length
      );
    }

    return this;
  }

  duplicate(): VsNode {
    const cloned = new VsNode({
      label: this.label,
      iconColor: this.iconColor,
      icon: this.icon,
      logoPath: this.logoPath,
      tooltip: this.tooltip,
      sectionName: this.sectionName as any,
      operations: deepClone(this.operations),
    });

    return cloned;
  }
}
